import OMP from '../../lib/omp'

export default async (req, res) => {
  const { taskId } = req.query

  const omp = new OMP({
    host: 'openvas',
    username: 'admin',
    password: process.env.OV_PASSWORD,
  })
  await omp.connect()
  await omp.login()

  const taskRes = await omp.getTask(taskId)
  const reportId = taskRes.tasks.current_report?.report.id || taskRes.tasks?.last_report?.report.id

  const reportRes = await omp.getReport(reportId)
  const report = reportRes.reports.report

  return res.json({ report })
}
