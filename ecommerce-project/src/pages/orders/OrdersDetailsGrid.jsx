import axios from 'axios';
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import buyAgain from '../../assets/images/icons/buy-again.png';

export function OrdersDetailsGrid({ order, loadCart }) {

  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {

        const addToCart = async () => {
          await axios.post('/api/cart-items', {
            productId: orderProduct.product.id,
            quantity: 1
          });
          await loadCart();
        }


        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container"
              data-testid = "product-image-container"
            >
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div 
              className="product-name"
              data-testid = "product-name"
              >
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date"
              data-testid = "product-delivery-date"
              >
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div 
              data-testid = "product-quantity"
              className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary"
              data-testid = "add-to-cart-button"
                onClick={addToCart}
              >
                <img className="buy-again-icon" src={buyAgain} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button 
                data-testid= "product-tracking"
                className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}