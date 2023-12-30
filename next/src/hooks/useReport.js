import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export const useReport = ({ task }) => {
  // Revalidate report on 10s interval using SWR
  const { data, error } = useSWR(task && `/api/getReport?taskId=${task.taskId}`, fetcher, {
    refreshInterval: 10000,
  })

  return {
    report: data?.report,
    scanRunStatus: data?.scanRunStatus,
    scanRunProgress: data?.scanRunProgress,
    isLoading: !error && !data,
    isError: error,
  }
}
