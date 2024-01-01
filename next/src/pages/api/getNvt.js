import OMP from '../../lib/omp'

export default async (req, res) => {
  try {
    const { nvtId } = req.query

    const omp = new OMP({
      host: 'openvas-service', // K8s service name
      username: 'admin',
      password: process.env.OV_PASSWORD,
    })

    await omp.connect()
    await omp.login()

    const nvtsInfo = await omp.get_nvts(nvtId)
    const nvt = nvtsInfo.nvt

    omp.disconnect()

    return res.json(nvt)
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    // omp.disconnect()
  }
}
