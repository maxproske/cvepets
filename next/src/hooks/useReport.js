import axios from 'axios'
import useSWR from 'swr'
import { useEffect } from 'react'

// Modified fetcher to accept a cancel token
const fetcher = (url, cancelToken) => axios.get(url, { cancelToken, timeout: 5000 }).then((res) => res.data)

export const useReport = ({ task }) => {
  // Create a cancel token source
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  // SWR configuration to pass the cancel token
  const { data, error } = useSWR(task && `/api/getReport?taskId=${task.taskId}`, (url) => fetcher(url, source.token), {
    refreshInterval: 10000,
  })

  useEffect(() => {
    // Cleanup function to cancel the request when the component unmounts
    return () => {
      source.cancel('Component unmounted or request remade: Canceling pending requests')
    }
  }, [])

  return {
    report: data?.report,
    scanRunStatus: data?.scanRunStatus,
    scanRunProgress: data?.scanRunProgress,
    isLoading: !error && !data,
    isError: error,
  }
}
