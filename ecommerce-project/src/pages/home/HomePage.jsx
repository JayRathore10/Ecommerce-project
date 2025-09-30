import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import homeFavicon from '../../assets/images/home-favicon.png';
import './HomePage.css'


export function HomePage({ cart  , loadCart}) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getHomeData = async()=>{
      const response = await axios.get('/api/products')
      setProducts(response.data);
    }
    getHomeData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={homeFavicon} />
      <title>Ecommerce Project</title>
      <Header
        cart={cart}
      />
      <div className="home-page">
        <ProductsGrid products={products}  loadCart={loadCart} />
      </div>
    </>
  );
}
