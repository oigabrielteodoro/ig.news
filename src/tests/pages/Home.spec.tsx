import { render, screen } from '@testing-library/react'
import { stripe } from '../../services/stripe'
import { mocked } from 'ts-jest/utils';

import Home, { getStaticProps } from '../../pages'

jest.mock('next/router');
jest.mock('next-auth/client', () => ({
  useSession() {
    return [null, false];
  }
}));

jest.mock('../../services/stripe')

describe('Home page', () => {
  it('should be able renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: '$9.99' }} />)

    expect(screen.getByText('for $9.99 month')).toBeInTheDocument();
  })

  it('should be able load initial data', async () => {
    const retriveStripePricesMocked = mocked(stripe.prices.retrieve)

    retriveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})