import React from 'react'
import { useParams } from 'react-router-dom'

function ProductItem() {
  const params = useParams()
  return (
    <div>
      Product item <strong>{params.id}</strong>
    </div>
  )
}

export default ProductItem
