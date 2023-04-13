import { useQuery } from '@tanstack/react-query'
import { fetchLeads } from '../services/leadApis'

export const useLeadsHook = () => {
  return useQuery({
    queryKey: ['fetchLeads'],
    queryFn: () => fetchLeads(),
  })
}
