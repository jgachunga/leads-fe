import React from 'react'
import { Accordion, Col, Row, Stack, Button, Badge } from 'react-bootstrap'
import PropTypes from 'prop-types'
import avatar1 from '../assets/imgs/avatar-1.png'
import avatar2 from '../assets/imgs/avatar-2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateLead } from '../services/leadApis'

function LeadItem({ lead, refetch }) {
  const approveMutation = useMutation({
    mutationFn: ({ lead, payload }) => {
      return updateLead(lead, payload)
    },
    onError: (error) => {
      toast.error('An error occurred')
    },
    onSuccess: (data) => {
      console.log('data', data)
      refetch()
      toast.success('Updated successfully')
    },
  })

  const updateStatus = (status) => {
    approveMutation.mutate({ lead, payload: { status } })
  }

  const updateApproval = (approved) => {
    approveMutation.mutate({ lead, payload: { approved } })
  }
  return (
    <>
      <Accordion.Item eventKey={lead?.id}>
        <Accordion.Header>
          <Row className="w-100">
            <Col md={6}>
              <div className="d-flex align-items-center my-auto">
                <img
                  src={lead.id % 2 == 0 ? avatar1 : avatar2}
                  width={50}
                  height={50}
                ></img>
                <Stack className="ms-2">
                  <h3 className="text-uppercase">{lead.leadUsername}</h3>
                  <h5>{lead.leadUserTitle}</h5>
                </Stack>
              </div>
            </Col>
            <Col md={6}>
              <h5>Why we matched you?</h5>
              {lead.matchReasons.map((reason) => (
                <p key={reason.id}>{reason.matchReason}</p>
              ))}
              <div>
                <Badge bg="dark"> {lead.approved}</Badge>
              </div>
            </Col>
          </Row>
        </Accordion.Header>
        <Accordion.Body>
          <h6>Suggested Email Personalization Line</h6>
          <p>{lead.suggestedResponse}</p>
          <hr></hr>
          <h6>Reason for choosing this personalization</h6>
          <p>{lead.reason}</p>
          <div>
            <h6>How does this personalization sound</h6>
            {lead.status === 'new' ? (
              <div>
                <Button
                  variant="warning"
                  className="opinion-btn"
                  onClick={() => updateStatus('good')}
                >
                  <FontAwesomeIcon icon="thumbs-up" className="mx-2" /> Looks
                  Good
                </Button>
                <Button
                  variant="dark"
                  className="ms-3 opinion-btn"
                  onClick={() => updateStatus('toImprove')}
                >
                  {' '}
                  <FontAwesomeIcon icon="thumbs-down" className="mx-2" />
                  Needs Improving
                </Button>
              </div>
            ) : (
              <div>
                <Badge bg="success">{lead.status}</Badge>
              </div>
            )}
          </div>
          <Row className="mt-3">
            <Col md={1}>
              <Button variant="light">
                <FontAwesomeIcon icon="rotate-left" className="mx-2" />
              </Button>
            </Col>
            <Col md={5}>
              <Button
                variant="light"
                className="approve-button not-a-fit-btn"
                onClick={() => updateApproval('declined')}
              >
                Not a fit
              </Button>
            </Col>
            <Col md={5}>
              <Button
                variant="dark"
                className="ms-3 approve-button"
                onClick={() => updateApproval('approved')}
              >
                {' '}
                All Good
              </Button>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
}

LeadItem.propTypes = {
  lead: PropTypes.object,
  refetch: PropTypes.func,
}

export default LeadItem
