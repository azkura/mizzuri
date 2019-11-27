import { Card } from 'semantic-ui-react'

function ProductList({ products }) {
  const mapProductsToItems = (products) => {
    return products.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `$${product.price}`,
      color: 'black',
      fluid: true,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }))
  }

  return (
    <Card.Group 
      stackable itemsPerRow="5" 
      centered 
      items={mapProductsToItems(products)}
    />
  )
}

export default ProductList;
