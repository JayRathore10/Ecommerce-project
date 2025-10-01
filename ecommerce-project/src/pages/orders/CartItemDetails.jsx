import { useState } from 'react';
import axios from "axios";
import { formatMoney } from "../../utils/money";
import './OrdersPage.css';

export function CartItemDetails({cartItem , loadCart}) {

  const [editing , setEditing] = useState(false);
  const[quantity , setQuantity] = useState(cartItem.quantity);

  const deleteCartItem =  async ()=>{
    await axios.delete(`/api/cart-items/${cartItem.product.id}`);
    await loadCart();
  }

  const updateCart = async ()=>{
    await axios.put(`/api/cart-items/${cartItem.product.id}`, {
      quantity : Number(quantity)
    });
    await loadCart();
    setEditing(false);
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: 
            {editing ? 
            <input type="text" className="text-box"
              value={quantity}
              onChange={
                (event)=>{
                  setQuantity(event.target.value);
                }
              }
              onKeyDown={(event)=>{
                if(event.key === 'Enter'){
                  updateCart();
                }else if (event.key === 'Escape'){
                  setQuantity(cartItem.quantity);
                  setEditing(false);
                }
              }
            }
            ></input> :
            <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary"
            onClick={async ()=>{
              setEditing(true);
            }}
          >
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}