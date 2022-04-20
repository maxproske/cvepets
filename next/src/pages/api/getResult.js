const OMP = require('../lib/omp')

export default async (req, res) => {
  const { taskId } = req.query

  const omp = new OMP({
    host: 'openvas',
    username: 'admin',
    password: 'password',
  })
  await omp.connect()
  await omp.login()

  const resultRes = await omp.getResult(taskId)
  const result = resultRes.result

  return res.json({ result })
}
