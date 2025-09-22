import {Route , Routes} from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import './App.css'
import { OrdersPage } from './pages/OrdersPage';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path='orders' element={<OrdersPage />} />
      </Routes>
    </>
  )
}

export default App
