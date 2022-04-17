const OMP = require('../lib/omp')

export default async (req, res) => {
  const omp = new OMP({
    host: 'openvas',
    username: 'admin',
    password: 'password',
  })
  await omp.connect()
  await omp.login()

  const wizard = await omp.runWizard({
    name: 'quick_first_scan',
    hosts: 'flashflashrevolution.com',
  })
  const { status, status_text: message, response } = wizard
  const taskId = response.get_tasks_response.task.id
  const targetId = response.get_tasks_response.target.id

  return res.status(status).json({ status, message, taskId, targetId })
}
