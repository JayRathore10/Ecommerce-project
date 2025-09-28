import { DeliveryOptions } from "./DeliveryOptions";
import { DeliveryDate } from "./DeliveryDate";
import { CartItemDetails } from "../orders/CartItemDetails";

export function OrderSummary({deliveryOptions , cart}) {
  return (
    <div className="order-summary">

      {deliveryOptions.length > 0 && cart.map((cartItem) => {

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate 
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
            />

            <div className="cart-item-details-grid">
             <CartItemDetails cartItem= {cartItem} />

              <DeliveryOptions 
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />

            </div>
          </div>
        );
      })}
    </div>
  );
}