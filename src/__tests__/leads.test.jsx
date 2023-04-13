import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Accordion } from 'react-bootstrap'
import { useLeadsHook } from '../hooks/leadQueries'
import LeadItem from '../components/LeadItem'
import Leads from '../pages/leads'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Wrapper } from '../../tests/testQueryClient'

vi.mock('../hooks/leadQueries')

describe('Leads', () => {
  // afterEach(() => {
  //   vi.restoreAllMocks()
  // })
  beforeEach(() => {
    useLeadsHook.mockReturnValue({
      data: {
        data: [
          {
            id: 1,
            leadUsername: 'John Doe',
            leadUserTitle: 'Engineering Manager',
            approved: 'approved',
            suggestedResponse:
              'Thanks for your interest! Our team will get back to you shortly.',
            matchReasons: [],
          },
          {
            id: 2,
            leadUsername: 'Jane Smith',
            leadUserTitle: 'Product owner',
            approved: 'approved',
            status: 'new',
            suggestedResponse:
              'Thanks for your interest! Our team will get back to you shortly.',
            matchReasons: [],
          },
        ],
      },
      isSuccess: true,
      refetch: vi.fn(),
    })
  })

  test('renders welcome message', () => {
    render(
      <Wrapper>
        <Leads />
      </Wrapper>
    )
    expect(
      screen.getByText('Welcome ! We have found you new Leads')
    ).toBeInTheDocument()
  })

  test('renders LeadItem for each lead', async () => {
    render(
      <Wrapper>
        <Leads />
      </Wrapper>
    )
    await waitFor(() => expect(useLeadsHook).toHaveBeenCalled())
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })
})
