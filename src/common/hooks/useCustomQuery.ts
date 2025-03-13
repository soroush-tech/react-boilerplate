import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'
import defaultClient, { Client, type RequestConfig } from '../../utils/api/client'

interface UseCustomQueryParams<TData> extends UseQueryOptions<TData> {
  queryKey: Array<string | number>
  config: RequestConfig
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
  client?: Client
}

export function useCustomQuery<TData>({
  queryKey,
  config = {},
  client = defaultClient,
}: UseCustomQueryParams<TData>): UseQueryResult<TData> {
  return useQuery<TData>({
    queryKey: [
      ...queryKey,
      config,
      // client.host (if needed)
    ],
    queryFn: async () => client.call({ ...config }) as TData,
  })
}
