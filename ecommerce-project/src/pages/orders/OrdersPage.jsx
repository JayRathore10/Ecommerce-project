import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { Header } from '../../components/Header';
import ordersFavicon from '../../assets/images/orders-favicon.png';
import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cart }) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProductData = async ()=>{
      const response = await axios.get('/api/orders?expand=products')
      setOrders(response.data);
    }
    fetchProductData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={ordersFavicon} />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
      
        <OrdersGrid orders={orders} />

      </div>
    </>
  );
}