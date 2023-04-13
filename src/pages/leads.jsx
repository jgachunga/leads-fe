import { Accordion } from 'react-bootstrap'
import { useLeadsHook } from '../hooks/leadQueries'
import LeadItem from '../components/LeadItem'
import './leads.scss'

function Leads() {
  const { data, isSuccess, refetch } = useLeadsHook()

  return (
    <>
      <h1>Welcome ! We have found you new Leads</h1>
      <Accordion defaultActiveKey="0">
        {data?.data.map((lead) => (
          <LeadItem key={lead.id} lead={lead} refetch={refetch}></LeadItem>
        ))}
      </Accordion>
    </>
  )
}

export default Leads
