const OMP = require('../lib/omp')

export default async (req, res) => {
  const omp = new OMP({
    host: 'openvas',
    username: 'admin',
    password: process.env.OV_PASSWORD,
  })
  await omp.connect()
  await omp.login()

  // Cloudflare sends the end user's IP address in the `cf-connecting-ip` header
  // https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-Cloudflare-handle-HTTP-Request-headers
  const ip =
    req.ip ||
    req.headers['cf-connecting-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress

  const wizard = await omp.runWizard({
    name: 'quick_first_scan',
    hosts: ip,
  })
  const { status, status_text: message, response } = wizard
  const task = {
    taskId: response.get_tasks_response.task.id,
  }

  return res.status(status).json({ task })
}
