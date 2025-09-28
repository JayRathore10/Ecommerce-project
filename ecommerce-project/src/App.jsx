import axios from 'axios';
import { Route, Routes } from 'react-router';
import { useEffect , useState } from 'react';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import './App.css'
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { ErrorPage } from './pages/ErrorPage';


function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAppData = async()=>{
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    }
    fetchAppData();
  } , []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path='orders' element={<OrdersPage cart={cart} />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
