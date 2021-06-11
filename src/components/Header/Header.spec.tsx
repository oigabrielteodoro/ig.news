import { screen, render } from '@testing-library/react'

import { Header } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/' 
      }
    }
  }
})

jest.mock('next-auth/client', () => ({
  useSession() {
    return [null, false]
  }
}))

describe('Header component', () => {
  it('should be able renders correctly', () => {
    render(
      <Header />
    )
  
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  })
})