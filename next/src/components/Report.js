import styled from 'styled-components'
import { useReport } from '../hooks/useReport'
import { useGlobal } from '../context/Global'
import ItemsAcquired from './ItemsAcquired'

export const Report = ({ createTask }) => {
  const { task } = useGlobal()
  const { report, isLoading, isError, scanRunStatus, scanRunProgress } = useReport({ task })

  if (isLoading)
    return (
      <div>
        <em></em>
      </div>
    )
  if (isError) return <div></div>

  return (
    <>
      <ItemsAcquired items={report} status={scanRunStatus} progress={scanRunProgress} createTask={createTask} />
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Severity</th>
            <th>QoD</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {report?.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.severity}</td>
              <td>{result.qod} %</td>
              <td>{result.results.count}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  )
}
