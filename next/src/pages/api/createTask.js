import OMP from '../../lib/omp'
import hosts from './hosts.json'

export default async (req, res) => {
  const omp = new OMP({
    host: 'openvas-service', // K8s svc name
    username: 'admin',
    password: process.env.OV_PASSWORD,
  })
  const connect = await omp.connect()
  const login = await omp.login()

  let ip
  if (req.body.random) {
    // Pick a random host from hosts.json
    const randomIndex = Math.floor(Math.random() * hosts.length)
    ip = hosts[randomIndex]
  } else {
    // Cloudflare sends the end user's IP address in the `cf-connecting-ip` header
    // https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-Cloudflare-handle-HTTP-Request-headers
    ip =
      req.ip ||
      req.headers['cf-connecting-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddresss

    // Debug
    if (ip.includes('127.0.0.1')) {
      // ping google.com
      // ip = '142.250.217.110'
    }
  }

  const wizard = await omp.runWizard({
    name: 'quick_first_scan',
    hosts: ip,
  })
  const { status, status_text: message, response } = wizard
  const task = {
    taskId: response?.get_tasks_response.task.id,
  }

  // Cleanup
  const disconnect = await omp.disconnect()

  return res.status(status || 200).json({ task })
}
