import React from 'react'

//copie y pegue todo este codigo en index
const Products = ({ products }) => {
  return (
    <div>
      <center><h1>Our Products</h1></center>
      {products.map((product) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{product.sku}</h6>
            {/* <p class="card-text">{product.name}</p> */}
            <button onClick={()=>{this.handleClick(product.sku)}}> Add Cart</button>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Products