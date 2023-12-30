import OMP from '../../lib/omp'
import example from './example.json'

export default async (req, res) => {
  const { taskId } = req.query

  const omp = new OMP({
    host: 'openvas-service', // K8s svc name
    username: 'admin',
    password: process.env.OV_PASSWORD,
  })
  const connect = await omp.connect()
  const login = await omp.login()

  const taskRes = await omp.getTask(taskId)
  const scanRunProgress = taskRes.tasks.progress
  const reportId = taskRes.tasks.current_report?.report.id || taskRes.tasks?.last_report?.report.id

  const reportRes = await omp.getReport(reportId)
  const scanRunStatus = reportRes.reports.report.scan_run_status

  const vulnRes = await omp.getVulnerabilities(taskId)
  let vuln = vulnRes.vulnerabilities

  // Debug
  // vuln = example

  // Cleanup
  const disconnect = await omp.disconnect()

  return res.json({ report: vuln, scanRunStatus, scanRunProgress })
}
