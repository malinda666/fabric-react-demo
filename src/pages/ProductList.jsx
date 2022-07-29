import React from 'react'
import { Link } from 'react-router-dom'

function ProductList() {
  return (
    <div>
      <p>This is product page</p>
      <ul>
        {[1, 2, 3].map((id, index) => (
          <li key={index}>
            <Link to={'/product/' + id}>Product {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
