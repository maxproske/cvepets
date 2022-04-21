import styled from 'styled-components'
import { useReport } from '../hooks/useReport'
import { useGlobal } from '../context/Global'

export const Report = () => {
  const { task } = useGlobal()
  const { report, isLoading, isError } = useReport({ task })

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error!</div>

  return (
    <>
      <h2>Status: {report.scan_run_status}</h2>
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
    </>
  )
}

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
