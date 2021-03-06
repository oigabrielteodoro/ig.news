import { screen, render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'

import { SignInButton } from '.'

jest.mock('next-auth/client')

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com'
}

describe('SignInButton component', () => {
  it('should be able renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />)
  
    expect(screen.getByText('Sign In with Github')).toBeInTheDocument(); 
  })

  it('should be able renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([{ user, expires: 'fake-expires' }, false]);

    render(<SignInButton />)
  
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  }) 
})