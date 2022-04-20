import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useGlobal } from '../context/Global'
import { Pet } from '../components/Pet'

export const Wizard = () => {
  const [task, setTask] = useState(null)
  const [report, setReport] = useState(null)

  const createTask = async () => {
    const res = await axios.post('/api/createTask')
    const taskUpdate = res.data.task

    setTask(taskUpdate)
  }

  const getReport = async () => {
    const taskId = task?.taskId || 'edb4e366-76d4-4994-8ba2-4e8b3f2b6afa'

    const res = await axios.get(`/api/getReport?taskId=${taskId}`)
    console.log(res.data)
    const reportUpdate = res.data.report

    setReport(reportUpdate)
  }

  return (
    <StyledWrapper>
      <Pet />
      <button onClick={createTask}>Create Task</button>
      <br />
      <button onClick={getReport}>Get Report</button>
      <br />
      {report && <h2>Status: {report.scan_run_status}</h2>}
      <StyledGrid>
        {report?.results?.result?.map((result) => {
          return (
            <StyledCVE>
              <details>
                <summary>
                  <h3>{result.nvt.family}</h3>
                  <h4>{result.name}</h4>
                </summary>
                <p>{result.description}</p>
              </details>
              {result.severity && <div>Severity: {result.severity}</div>}
            </StyledCVE>
          )
        })}
      </StyledGrid>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  max-width: 37rem;
  margin: auto;
`

const StyledGrid = styled.div`
  display: flex;
  flex-flow: column;
  grid-gap: 0.5rem;
`

const StyledCVE = styled.article`
  border: 2px solid white;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;

  h3 {
    display: inline-block;
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
`
