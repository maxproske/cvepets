import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useGlobal } from '../context/Global'
import { Pet } from '../components/Pet'

export const Wizard = () => {
  const { starter } = useGlobal()
  const [reportIds, setReportIds] = useState([])

  const runWizard = async () => {
    const res = await axios.post('/api/runWizard')
    const data = res.data
    const { reportId } = data

    setReportIds((previousReportIds) => [...previousReportIds, reportId])
  }

  const getResults = async () => {
    const res = await axios.get('/api/getResults')
    const data = res.data

    console.log({ data })
  }

  return (
    <StyledWrapper>
      <Pet />
      {reportIds.length === 0 && <button onClick={runWizard}>Run Wizard</button>}
      {reportIds.length > 0 && <button onClick={getResults}>Get Results</button>}
      {reportIds.toString()}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div``
