const OMP = require('../lib/omp')

export default async (req, res) => {
  const omp = new OMP({
    host: 'openvas',
    username: 'admin',
    password: 'password',
  })
  await omp.connect()
  await omp.login()

  const wizard = await omp.getAllTargets()
  const { status, status_text: message, response, targets } = wizard
  console.log({ targets })

  return res.json({ targets })
}
