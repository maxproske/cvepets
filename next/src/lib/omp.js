'use strict'

// https://docs.greenbone.net/API/GMP/gmp-21.4.html

const tls = require('tls')
const jsonxml = require('jsontoxml')
const xmlParser = require('xml2json')

function createResponsePromise(handler, resolve, reject) {
  return {
    handler: handler,
    resolve: resolve,
    reject: reject,
  }
}

class OMP {
  constructor(opt) {
    this.socket = null
    this.username = opt.username || null
    this.password = opt.password || null
    this.host = opt.host || '127.0.0.1'
    this.port = opt.port || 9390
    this.errorStr = null
    this.commandQueue = []
    this.responseHandlerQueue = []
    this.sending = false
    this.user = {
      role: '',
      timezone: '',
      severity: '',
      loggedIn: false,
    }
  }

  connect(host, port) {
    host = host || this.host
    port = port || this.port

    if (host == null || port == null) {
      this.errorStr = 'Provided invalid host or port for connection'
      return false
    }

    return new Promise((resolve, reject) => {
      this.socket = tls.connect(
        {
          host: host,
          port: port,
          rejectUnauthorized: false,
        },
        () => {
          if (!this.socket.authorized) {
            reject(this.socket.authorizationError)
          }

          this.socket.setEncoding('utf8')
          this.socket.on('data', this._onResponse.bind(this))
          this.socket.on('close', this._onclose.bind(this))
          resolve(this.socket.authorized)
        }
      )
    })
  }

  login(username, password) {
    username = username || this.username
    password = password || this.password

    var xml = jsonxml({
      authenticate: {
        credentials: [
          { name: 'username', text: username },
          { name: 'password', text: password },
        ],
      },
    })

    return new Promise((resolve, reject) => {
      this.sendCommand(xml, createResponsePromise(this._handleLogin, resolve, reject))
    })
  }

  getAllTargets() {
    return new Promise((resolve, reject) => {
      this.sendCommand('<get_targets/>', createResponsePromise(this._handleGetTargets, resolve, reject))
    })
  }

  getTarget(targetId) {
    var xml = '<get_targets target_id="' + targetId + '"/>'

    return new Promise((resolve, reject) => {
      this.sendCommand(xml, createResponsePromise(this._handleGetTargets, resolve, reject))
    })
  }

  getTask(taskId) {
    // details="1" to including all reports
    var xml = '<get_tasks task_id="' + taskId + '" details="1" />'

    return new Promise((resolve, reject) => {
      this.sendCommand(xml, createResponsePromise(this._handleGetTasks, resolve, reject))
    })
  }

  getReport(reportId) {
    // details="1" = Include results
    // ignore_pagination="1" = Unlimited results
    var xml = `<get_reports report_id="${reportId}"
                           details="1" 
                           ignore_pagination="0"
                           group_column="severity"
                           filter="apply_overrides=0 min_qod=70 sort-reverse=severity"
    />`

    return new Promise((resolve, reject) => {
      this.sendCommand(xml, createResponsePromise(this._handleGetReports, resolve, reject))
    })
  }

  getVulnerabilities(taskId) {
    const xml = `<get_vulns filter="task_id=${taskId} sort-reverse=severity first=1 rows=1000" />`

    return new Promise((resolve, reject) => {
      this.sendCommand(xml, createResponsePromise(this._handleGetVulnerabilities, resolve, reject))
    })
  }

  getResult(taskId) {
    // `details="1"` to include detailed results
    var xml = `<get_results filter="task_id=${taskId} apply_overrides=0 levels=hml rows=100 min_qod=70 first=1 sort-reverse=severity" />`

    return new Promise((resolve, reject) => {
      this.sendCommand(xml, createResponsePromise(this._handleGetResults, resolve, reject))
    })
  }

  /*
   * createTarget(opts)
   * Creates a scan target
   *
   * opts:
   * 	!name: String
   *	comment: String
   *	hosts: String
   *	excludeHosts: String
   *	sshCredentials: {
   *		!id: Id
   *		ports: String
   *	}
   *	smbCredentials: id
   *	esxiCredentials: id
   *	aliveTests: String
   *	reverseLookupOnly: Boolean
   *	reverseLookupUnify: Boolean
   *	ports: String
   *	portList: id
   */
  createTarget(opts) {
    if (!opts.name) throw new Error('`name` is a required option')

    if (!opts.hosts) opts.hosts = ''

    // GVM (formerly OpenVAS) 20 adds a breaking change where it requires users to supply a PORT_LIST or PORT_RANGE UUID
    // https://docs.greenbone.net/API/GMP/gmp-20.08.html#changes
    if ((opts.portList && opts.portRange) || (!opts.portList && !opts.portRange))
      throw new Error('One of `portList` or portRange` is required')

    return new Promise((resolve, reject) => {
      var json = {
        create_target: [
          { name: 'name', text: opts.name },
          { name: 'hosts', text: opts.hosts },
        ],
      }

      if (opts.comment) {
        json.create_target.push({
          name: 'comment',
          text: opts.comment,
        })
      }

      if (opts.excludeHosts) {
        json.create_target.push({
          name: 'exclude_hosts',
          text: opts.excludeHosts,
        })
      }

      if (opts.sshCredentials) {
        var creds = {
          name: 'ssh_lsc_credential',
          children: [{ name: 'id', text: opts.sshCredentials.id }],
        }

        if (opts.sshCredentials.ports) {
          creds.children.push({
            name: 'ports',
            text: opts.sshCredentials.ports,
          })
        }

        json.create_target.push(creds)
      }

      if (opts.smbCredentials) {
        json.create_target.push({
          name: 'smb_lsc_credential',
          text: opts.smbCredentials,
        })
      }

      if (opts.esxiCredentials) {
        json.create_target.push({
          name: 'esxi_lsc_credential',
          text: opts.esxiCredentials,
        })
      }

      if (opts.aliveTests) {
        json.create_target.push({
          name: 'alive_tests',
          text: opts.aliveTests,
        })
      }

      if (opts.reverseLookupOnly) {
        json.create_target.push({
          name: 'reverse_lookup_only',
          text: opts.reverseLookupOnly,
        })
      }

      if (opts.reverseLookupUnify) {
        json.create_target.push({
          name: 'reverse_lookup_unify',
          text: opts.reverseLookupUnify,
        })
      }

      if (opts.ports) {
        json.create_target.push({
          name: 'port_range',
          text: opts.ports,
        })
      }

      if (opts.portList) {
        json.create_target.push({
          name: 'port_list',
          attrs: {
            id: opts.portList,
          },
          children: {},
        })
      }

      var xml = jsonxml(json)
      this.sendCommand(xml, createResponsePromise(this._handleCreateAction, resolve, reject))
    })
  }

  /*
   * createAgent(opts)
   * Creates an scanning agent
   *
   * opts:
   *	installer: { (required)
   *		(required) executable: (String) base64 encoded executable
   *		signature: (String) A detached OpenPGP signature of the installer.
   *	}
   *	(required) name: String
   * 	comment: String
   *	copy: Id
   *	howToInstall: (String) base64 encoded installation instructions
   *	howToUse: (String) base64 encoded user instructions
   */
  createAgent(opts) {
    if (!opts.installer.executable) throw new Error('createAgent: missing required option `installer.executable`')

    if (!opts.name) throw new Error('createAgent: missing required option `name`')

    return new Promise((resolve, reject) => {
      var json = {
        create_agent: [
          { name: 'name', text: opts.name },
          { name: 'installer', text: opts.installer.executable },
        ],
      }

      if (opts.installer.signature) {
        json.create_agent[1].children = [{ name: 'signature', text: opts.installer.signature }]
      }

      if (opts.comment) {
        json.create_agent.push({
          name: 'comment',
          text: opts.comment,
        })
      }

      if (opts.copy) {
        json.create_agent.push({
          name: 'copy',
          text: opts.copy,
        })
      }

      if (opts.howToInstall) {
        json.create_agent.push({
          name: 'how_to_install',
          text: opts.howToInstall,
        })
      }

      if (opts.howToUse) {
        json.create_agent.push({
          name: 'how_to_use',
          text: opts.howToUse,
        })
      }

      var xml = jsonxml(json)
      this.sendCommand(xml, createResponsePromise(this._handleCreateAction, resolve, reject))
    })
  }

  /*
   * createGroup(opts)
   * Creates a user group and optionally adds users into it.
   *
   * opts:
   *	name: (required) String
   *	comment: String
   *	copy: Id
   *	users: String, csv list of users to add to group
   */
  createGroup(opts) {
    if (!opts.name) throw new Error('createGroup missing required `name` option')

    return new Promise((resolve, reject) => {
      var json = {
        create_group: [{ name: 'name', text: opts.name }],
      }

      if (opts.comment) {
        json.create_group.push({
          name: 'comment',
          text: opts.comment,
        })
      }

      if (opts.copy) {
        json.create_group.push({
          name: 'copy',
          text: opts.copy,
        })
      }

      if (opts.users) {
        json.create_group.push({
          name: 'users',
          text: opts.users,
        })
      }

      var xml = jsonxml(json)
      this.sendCommand(xml, createResponsePromise(this._handleCreateAction, resolve, reject))
    })
  }

  /*
   * createPermission(opts)
   * Give permissions to user, group, or role
   * opts:
   *	name: Permission Name (currently name of a command)
   *	subject:
   *		id: ID
   *		type: String (user, group, or role)
   *	resource:
   *		id: ID
   *		type: user, group, role
   *	copy: String (id of existion permission)
   *	comment: String
   */
  createPermission(opts) {
    if (!opts.name && !opts.subject) {
      throw new Error('createPermission missing required `name` and `subject` options')
    }

    return new Promise((resolve, reject) => {
      var json = {
        create_permission: [
          { name: 'name', text: opts.name },
          {
            name: 'subject',
            attrs: {
              id: opts.subject.id,
            },
            children: { type: opts.subject.type },
          },
        ],
      }

      if (opts.resource) {
        json.create_permission.push_back({
          name: 'resource',
          attrs: {
            id: opts.resource.id,
          },
          children: {},
        })
      }

      if (opts.resource && opts.resource.type) {
        json.create_permission[json.create_permission.length - 1].children = {
          type: opts.resource.type,
        }
      }

      if (opts.copy) {
        json.create_permission.push_back({
          name: 'copy',
          text: opts.copy,
        })
      }

      if (opts.comment) {
        json.create_permission.push_back({
          name: 'comment',
          text: opts.comment,
        })
      }

      var xml = jsonxml(json)
      this.sendCommand(xml, createResponsePromise(this._handleCreateAction, resolve, reject))
    })
  }

  /*
   * createPortList(opts)
   * Creates a port list
   * opts:
   *	name: String (name of port list)
   *  /////// Use either portRange or getPortListsResponse but not both
   *	portRange: String (comma seperated string of port ranges ex: T:1-1024,U:1-1024)
   *  getPortListsResponse: json (response from OMP.getPortLists)
   *	copy: String (id of existion permission)
   *	comment: String
   */
  createPortList(opts) {
    if (!opts || !opts.name) return new Error('createPortList missing required `name` option')

    if (!opts.portRange && !opts.getPortListsResponse)
      return new Error('createPortList missing either `portRange` or `getPortListsResponse` option')

    return new Promise((resolve, reject) => {
      var json = {
        create_port_list: [{ name: 'name', text: opts.name }],
      }

      if (opts.portRange) {
        json.create_port_list.push({
          name: 'port_range',
          text: opts.portRange,
        })
      }

      if (opts.getPortListsResponse) {
        json.create_port_list.push({
          name: 'get_port_lists_response',
          text: opts.getPortListsResponse,
        })
      }

      if (opts.comment) {
        json.create_port_list.push({
          name: 'comment',
          text: opts.comment,
        })
      }

      if (opts.copy) {
        json.create_port_list.push({
          name: 'copy',
          text: opts.copy,
        })
      }

      this.sendJSONCommand(json, this._handleCreateAction, resolve, reject)
    })
  }

  /*
   * createPortList(opts)
   * Adds a port range to a port list
   * opts:
   *	comment: String
   *	portList: String (id of the portList to add range to)
   *  start: Number (first port in the range)
   *	end: Number (last port in the range)
   *	type: String (type of the ports e.g. TCP, UDP)
   */
  addPortRange(opts) {
    if (!opts.portList) return new Error('addPortRange missing required `portList` option')

    if (!opts.start) return new Error('addPortRnage missing required `start` option')

    if (!opts.end) return new Error('addPortRange missing required `end` option')

    if (!opts.type) return new Error('addPortRange missing required `type` option')

    return new Promise((resolve, reject) => {
      var json = {
        create_port_range: [
          {
            name: 'port_list',
            attrs: {
              id: opts.portList,
            },
          },
          { name: 'start', text: opts.start },
          { name: 'end', text: opts.end },
          { name: 'type', text: opts.type },
        ],
      }

      if (opts.comment) {
        json.create_port_range.push({
          name: 'comment',
          text: opts.comment,
        })
      }

      this.sendJSONCommand(json, this._handleCreateAction, resolve, reject)
    })
  }

  // https://docs.greenbone.net/API/GMP/gmp-21.04.html#command_run_wizard
  runWizard(opts) {
    if (!opts.name) return new Error('runWizard missing required `name` option')

    if (!opts.hosts) return new Error('runWizard missing required `hosts` option')

    return new Promise((resolve, reject) => {
      const json = {
        run_wizard: [
          {
            name: 'name',
            text: opts.name,
          },
          {
            name: 'params',
            children: [
              {
                name: 'param',
                children: [
                  { name: 'name', text: 'hosts' },
                  { name: 'value', text: opts.hosts },
                ],
              },
            ],
          },
        ],
      }

      this.sendJSONCommand(json, this._handleCreateAction, resolve, reject)
    })
  }

  sendCommand(cmd, res) {
    this.commandQueue.push(cmd)
    this.responseHandlerQueue.push(res)
    this._sendCommand()
  }

  sendJSONCommand(json, responseFn, resolve, reject) {
    var xml = jsonxml(json)
    this.sendCommand(xml, createResponsePromise(responseFn, resolve, reject))
  }

  _handleLogin(res, resolve, reject) {
    if (res.authenticate_response.status == '200') {
      this.user.loggedIn = true
      this.user.severity = res.authenticate_response.severity
      this.user.timezone = res.authenticate_response.timezone
      this.user.role = res.authenticate_response.role
      return resolve(this.user)
    }

    return reject(res.authenticate_response.status_text)
  }

  _handleGetTargets(res, resolve, reject) {
    var targets_res = res.get_targets_response
    if (targets_res.status === '200') {
      return resolve({
        targets: targets_res.target,
        filters: targets_res.filters,
        targetCount: targets_res.target_count,
      })
    }

    return reject(targets_res.status_text)
  }

  _handleGetTasks(res, resolve, reject) {
    var tasks_res = res.get_tasks_response
    if (tasks_res.status === '200') {
      return resolve({
        tasks: tasks_res.task,
        filters: tasks_res.filters,
        taskCount: tasks_res.task_count,
        reports: tasks_res.reports,
      })
    }

    return reject(tasks_res.status_text)
  }

  _handleGetReports(res, resolve, reject) {
    var reports_res = res.get_reports_response
    if (reports_res.status === '200') {
      return resolve({
        reports: reports_res.report,
        filters: reports_res.filters,
        reportCount: reports_res.report_count,
      })
    }

    return reject(reports_res.status_text)
  }

  _handleGetVulnerabilities(res, resolve, reject) {
    var vulnerabilities_res = res.get_vulns_response
    if (vulnerabilities_res.status === '200') {
      return resolve({
        vulnerabilities: vulnerabilities_res.vuln,
        filters: vulnerabilities_res.filters,
        targetCount: vulnerabilities_res.target_count,
      })
    }

    return reject(vulnerabilities_res.status_text)
  }

  _handleGetResults(res, resolve, reject) {
    var results_res = res.get_results_response
    console.log(results_res.result.length)
    if (results_res.status === '200') {
      return resolve({
        result: results_res.result,
        filters: results_res.filters,
        resultCount: results_res.result_count,
      })
    }

    return reject(results_res.status_text)
  }

  _handleCreateAction(res, resolve, reject) {
    var res = res[Object.keys(res)[0]]
    if (res.status === '201' || res.status === '202') {
      return resolve(res)
    }

    return reject(res.status_text)
  }

  _sendCommand() {
    if (this.sending) return

    if (this.commandQueue.length == 0) return

    var cmd = this.commandQueue.shift()
    this.sending = true
    this.socket.write(cmd)
  }

  _onResponse(data) {
    try {
      var resHandler = this.responseHandlerQueue.shift()
      var json = JSON.parse(xmlParser.toJson(data))
      // console.dir(json, { colors: true })
      resHandler.handler.apply(this, [json, resHandler.resolve, resHandler.reject])
    } catch (err) {
      // console.info(data.toString())
      console.error(err)
    }

    this.sending = false
    this._sendCommand()
  }

  disconnect() {
    if (this.socket) {
      this.socket.end()
      this.connection = null
    }
  }

  _onclose() {
    console.info('Connection closed by remote host')

    disconnect()
  }
}

module.exports = OMP
