// Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const [cartItems, setCartItems] = useContext(CartContext);
  const cartTotal = cartItems.findAll().reduce((total, book) => {
    return total + (Number(book.price || 0)); 
  }, 0);
  const handleRemove = (title) => {
    cartItems.remove(title);
    setCartItems(cartItems); 
  };

  return (

    <div className="header-menu-add-to-card">
        <h2>CARRITO</h2>
        <p>Subtotal: ${Number(cartTotal)}</p>
                <div className="container">
                <div className="row">
      
          {cartItems.findAll().map((book, index) => (
            <div className="col-md-4" key={index}>
              <div className="card" style={{ width: '18rem' }}>

                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Autor:</strong> {book.author}<br />
                    <strong>Año:</strong> {book.year}<br />
                    <strong>Precio:</strong> {book.price}
                  </p>   
                  <button onClick={() => handleRemove(book.title)}> Borrar</button>               
                </div>
              </div>
            </div>
          ))}
          
          </div>
          </div>

    </div>
  );
};

export default Cart;