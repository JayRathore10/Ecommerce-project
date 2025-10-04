import { it, describe, vi, beforeEach, expect } from 'vitest';
import axios from 'axios';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { OrdersDetailsGrid } from './OrdersDetailsGrid';

vi.mock('axios');

describe('OrderDetailsGrid Component', async () => {
  let loadCart;
  let order;
  let user;
  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();
    order = [
      {
        "id": "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
        "orderTimeMs": 1723456800000,
        "totalCostCents": 3506,
        "products": [
          {
            "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            "quantity": 1,
            "estimatedDeliveryTimeMs": 1723716000000,
            "product": {
              "keywords": [
                "socks",
                "sports",
                "apparel"
              ],
              "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
              "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
              "rating": {
                "stars": 4.5,
                "count": 87
              },
              "priceCents": 1090,
              "createdAt": "2025-09-30T14:59:13.840Z",
              "updatedAt": "2025-09-30T14:59:13.840Z"
            }
          },
          {
            "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            "quantity": 2,
            "estimatedDeliveryTimeMs": 1723456800000,
            "product": {
              "keywords": [
                "tshirts",
                "apparel",
                "mens"
              ],
              "id": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              "image": "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
              "name": "Adults Plain Cotton T-Shirt - 2 Pack",
              "rating": {
                "stars": 4.5,
                "count": 56
              },
              "priceCents": 799,
              "createdAt": "2025-09-30T14:59:13.842Z",
              "updatedAt": "2025-09-30T14:59:13.842Z"
            }
          }
        ],
        "createdAt": "2025-09-30T14:59:13.840Z",
        "updatedAt": "2025-09-30T14:59:13.840Z"
      },
      {
        "id": "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
        "orderTimeMs": 1718013600000,
        "totalCostCents": 4190,
        "products": [
          {
            "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            "quantity": 2,
            "estimatedDeliveryTimeMs": 1718618400000,
            "product": {
              "keywords": [
                "sports",
                "basketballs"
              ],
              "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              "image": "images/products/intermediate-composite-basketball.jpg",
              "name": "Intermediate Size Basketball",
              "rating": {
                "stars": 4,
                "count": 127
              },
              "priceCents": 2095,
              "createdAt": "2025-09-30T14:59:13.841Z",
              "updatedAt": "2025-09-30T14:59:13.841Z"
            }
          }
        ],
        "createdAt": "2025-09-30T14:59:13.841Z",
        "updatedAt": "2025-09-30T14:59:13.841Z"
      }
    ]
  })

  it('check the product details ', async () => {
    render(
      <MemoryRouter>
        <OrdersDetailsGrid loadCart={loadCart} order={order[0]} />
      </MemoryRouter>
    );

    const productImage = screen.getAllByTestId("product-image-container");
    const productName = screen.getAllByTestId("product-name")
    const productDeilveryDate = screen.getAllByTestId("product-delivery-date")
    const productQuantity = screen.getAllByTestId("product-quantity")

    expect(productImage[0].querySelector("img"))
      .toHaveAttribute('src', "images/products/athletic-cotton-socks-6-pairs.jpg")

    expect(productName[0])
      .toHaveTextContent("Black and Gray Athletic Cotton Socks - 6 Pairs");

    expect(productDeilveryDate[0])
      .toHaveTextContent(`Arriving on: ${dayjs(1723716000000).format('MMMM D')}`)

    expect(productQuantity[0])
      .toHaveTextContent(`Quantity: 1`)

    // Add to cart working or not 
    const addToCart = screen.getAllByTestId('add-to-cart-button');
    await user.click(addToCart[0]);

    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items', {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1
    }
    )

    expect(loadCart).toHaveBeenCalled();
  })

  it('checks the tracking button' , async ()=>{
    render(
      <MemoryRouter>
        <OrdersDetailsGrid loadCart={loadCart} order={order[0]} />
      </MemoryRouter>
    );

    const trackingButton = screen.getAllByTestId("product-tracking");
    expect(trackingButton[0]).toBeInTheDocument();

    const link = trackingButton[0].closest("a");

    expect(link).toHaveAttribute(
      "href" , 
      `/tracking/${order[0].id}/${order[0].products[0].product.id}`
    );

  })

})