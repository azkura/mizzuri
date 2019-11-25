import React from 'react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'

import ProductList from '../components/Index/ProductList'

function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async ctx => {
  // Pagination
  const page = ctx.query.page ? ctx.query.page : "1"
  const size = 9
  // fetch data on a server
  const url = `${baseUrl}/api/products`
  const payload = { params: { page, size } }

  const response = await axios.get(url, payload)
  // return response data as a object
  return { products: response.data }

  // this object will be merge with existing props
}

export default Home;
