const OMP = require('../lib/omp')

export default async (req, res) => {
  const omp = new OMP({
    host: 'openvas',
    username: 'admin',
    password: 'password',
  })
  await omp.connect()
  await omp.login()

  const wizard = await omp.getVulnerabilities()
  const { vulnerabilities } = wizard

  console.log({ vulnerabilities })

  return res.json({ vulnerabilities })
}
