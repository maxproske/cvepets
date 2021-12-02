import axios from 'axios'

export default function Home() {
  const onClick = async () => {
    const res = await axios.post('/api/runWizard')
    const data = res.data
    console.log({ data })
  }

  return (
    <section>
      <h1>CVE Pets</h1>
      <button onClick={onClick}>Run Scan</button>
    </section>
  )
}
