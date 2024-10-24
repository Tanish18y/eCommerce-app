import React from 'react';

function Order({ orderId, products }) {
    if (!products || products.length === 0) {
      return <div>No products found</div>;
    }
  
    return (
      <div>
        <h3>Order ID: {orderId}</h3>
        {products.map((product) => (
          <div key={product.productId}>
            Order Product ID: {product.productId}, Quantity: {product.quantity}
          </div>
        ))}
      </div>
    );
  }
  

export default Order;
