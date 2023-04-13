import { LEADS } from '../common/endpoints'
import * as Api from './httpClient'

export const fetchLeads = () => {
  return Api.get(LEADS.fetchLeads)
}

export const updateLead = (lead, payload) => {
  return Api.patch(LEADS.updateLead(lead.id), payload)
}
