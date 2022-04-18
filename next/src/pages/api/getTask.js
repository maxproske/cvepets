const OMP = require('../lib/omp')

export default async (req, res) => {
  const { taskId } = req.query
  console.log({ taskId })

  const omp = new OMP({
    host: 'openvas',
    username: 'admin',
    password: 'password',
  })
  await omp.connect()
  await omp.login()

  const taskRes = await omp.getTask(taskId)
  const reportId = taskRes.tasks.current_report.report.id
  // const reports = taskRes.tasks.reports
  console.log({ reportId })
  const reportRes = await omp.getReport(reportId)

  console.log({ reportRes })

  return res.json({ reportRes })
}
