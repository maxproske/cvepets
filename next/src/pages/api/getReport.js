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

  // const taskRes = await omp.getTask(taskId)
  // let reportId = taskRes.tasks.current_report?.report.id || taskRes.tasks?.last_report?.report.id

  // const objRes = await omp.getVulnerabilities(taskId)
  // let obj = objRes.vulnerabilities

  const obj = example

  return res.json({ report: obj })
}
