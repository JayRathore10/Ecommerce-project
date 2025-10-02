import { it, describe, vi, beforeEach, expect } from 'vitest';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLoaderData, useLocation } from 'react-router-dom';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe("PaymentSummary Component", () => {
  let loadCart;
  let paymentSummary;
  let user;
  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();

    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    };
  });

  it("displays the correct details", async () => {

    render(
      <MemoryRouter>
        <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
      </MemoryRouter>
    );

    expect(screen.getByText('Items (3):')).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary-product-cost"))
        .getByText('$42.75')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary-shipping-cost"))
        .getByText("$4.99")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("payment-summary-total-before-tax")
    ).toHaveTextContent('$47.74');

    expect(
      screen.getByTestId("payment-summary-tax")
    ).toHaveTextContent("$4.77");

    expect(
      screen.getByTestId("payment-summary-total")
    ).toHaveTextContent("$52.51");
  });

  it('place an order ', async () => {

    function Location() {
      const location = useLocation();
      return (
        <div
          data-testid="url-path"
        >
          {location.pathname}
        </div>
      );
    }

    render(
      <MemoryRouter>
        <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
        <Location />
      </MemoryRouter>
    );
    const placeOrderButton = screen.getByTestId('place-order-btn');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalled('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(
      screen.getByTestId("url-path")
    ).toHaveTextContent('/orders')

  })

});
