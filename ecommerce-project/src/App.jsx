import {Route , Routes} from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import './App.css'
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { ErrorPage } from './pages/ErrorPage';


function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path='orders' element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path= "*" element = {<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
