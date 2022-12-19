import React from 'react'
import { Link } from 'react-router-dom';
import Product from './Product';

function Home() {
  return (
    <div>
      <h1>Product</h1>
      <Link to="/product">Product</Link>
    </div>
  )
}

export default Home
