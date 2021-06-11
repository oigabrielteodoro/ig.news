import { screen, render, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { SubscribeButton } from '.'

jest.mock('next-auth/client')

jest.mock('next/router')

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com'
}

describe('SubscribeButton component', () => {
  it('should be able renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton priceId="price_1IrS0wA7qFI78KRVzdiBKRBR" />)
  
    expect(screen.getByText('Subscribe now')).toBeInTheDocument(); 
  })

  it('should be able redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton priceId="price_1IrS0wA7qFI78KRVzdiBKRBR" />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  });

  it('should be able redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([{ 
      user, 
      activeSubscription: 'fake-active-subscription',
      expires: 'fake-expires' 
    }, false]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton priceId="price_1IrS0wA7qFI78KRVzdiBKRBR" />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)
 
    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})