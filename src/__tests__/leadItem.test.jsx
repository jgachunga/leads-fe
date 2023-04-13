import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import LeadItem from '../components/LeadItem'
import { Wrapper } from '../../tests/testQueryClient'

describe('LeadItem Component', () => {
  const mockLead = {
    id: 1,
    leadUsername: 'John Doe',
    leadUserTitle: 'Software Developer',
    matchReasons: [
      { id: 1, matchReason: 'Experience in React' },
      { id: 2, matchReason: 'Familiarity with Redux' },
    ],
    suggestedResponse:
      'Hello, I came across your profile and noticed that you have experience in React.',
    reason: 'We have a project that requires a React developer.',
    status: 'new',
    approved: false,
  }

  const mockRefetch = vi.fn()

  it('should render the LeadItem component', () => {
    render(
      <Wrapper>
        <LeadItem lead={mockLead} refetch={mockRefetch} />
      </Wrapper>
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Software Developer')).toBeInTheDocument()
    expect(screen.getByText('Experience in React')).toBeInTheDocument()
    expect(screen.getByText('Familiarity with Redux')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Hello, I came across your profile and noticed that you have experience in React.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText('We have a project that requires a React developer.')
    ).toBeInTheDocument()
    expect(screen.getByText('Looks Good')).toBeInTheDocument()
    expect(screen.getByText('Not a fit')).toBeInTheDocument()
    expect(screen.getByText('All Good')).toBeInTheDocument()
  })
})
