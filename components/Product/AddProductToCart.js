import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from 'semantic-ui-react'

import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import { catchErrors } from '../../utils/catchErrors'
import cookie from 'js-cookie'

function AddProductToCart({ user, productId }) {
  const [ quantity, setQuantity ] = useState(1)
  const [ loading, setLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const router = useRouter()

  const handleAddProductToCart = async () => {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/cart`
      const payload = { quantity, productId }
      const token = cookie.get('token')
      const headers = { headers: { Authorization: token } }
      await axios.put(url, payload, headers)
      setSuccess(true)

    } catch (error) {
      catchErrors(error, window.alert)
    } finally {
      setLoading(false)
    }
  }

  return <Input
    type="number"
    min="1"
    placeholder="Quantity"
    value={quantity}
    onChange={event => setQuantity(Number(event.target.value))}
    action={
      user && success 
        ? {
            color: "blue",
            content: "Item Added!",
            icon: "plus cart",
            disabled: true
          } 
      : user 
        ? {
            color: "orange",
            content: "Add to Cart",
            icon: "plus cart",
            loading,
            disabled: loading,
            onClick: handleAddProductToCart
          } 
      : {
          color: "blue",
          content: "Signup to Purchase",
          icon: "signup",
          onClick: () => router.push('/signup')
        }
    }
  />
}

export default AddProductToCart;
