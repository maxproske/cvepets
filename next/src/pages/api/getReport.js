import OMP from '../../lib/omp'

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
  const reportId = taskRes.tasks.current_report?.report.id || taskRes.tasks?.last_report?.report.id

  const reportRes = await omp.getReport(reportId)
  const report = reportRes.reports.report

  return res.json({ report })
}
