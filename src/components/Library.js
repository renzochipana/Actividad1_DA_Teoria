// Library.js

import React, {useContext,useState, useEffect } from 'react';
import { LinkedList } from './LinkedList';
import { saveListToStorage, loadListFromStorage } from './LocalStorageUtils';
import { CartContext } from '../context/CartContext';

const Library = () => {
    const [cartItems, setCartItems] = useContext(CartContext);
  const [bookList, setBookList] = useState(new LinkedList());
  const [book, setBook] = useState({ title: '', author: '', year: '',price: 0 });
  
  useEffect(() => {
    const loadedList = loadListFromStorage();
    setBookList(loadedList);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.year) return;
    
    bookList.add(book);
    setBookList(bookList);
    saveListToStorage(bookList); 
    setBook({ title: '', author: '', year: '',price: 0 }); 
  };
  
  const handleSubmit2 = (e) => { 
    
    
    cartItems.add(e);
    setCartItems(cartItems);
    saveListToStorage(cartItems);
   
  }; 
  const handleRemove = (title) => {
    bookList.remove(title);
    setBookList(bookList); 
    saveListToStorage(bookList); 
  };

  return (
    <div>
      <h1>Libreria</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={book.year}
          onChange={handleChange}
        />
        <input
            type="number"
            name="price"
            placeholder="precio"
            value={book.price}
            onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                handleChange(e);
                }
            }}
            step="1"
        /> 
        <button type="submit">Add Book</button>
      </form>
      

      
        <div className="container">
        <div className="row">
          {bookList.findAll().map((book, index) => (
            <div className="col-md-4" key={index}>
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Autor:</strong> {book.author}<br />
                    <strong>Año:</strong> {book.year}<br />
                    <strong>Precio:</strong> {book.price}
                  </p>
                  <button  onClick={() => handleSubmit2(book)}  > Añadir al carrito </button>
                  <button onClick={() =>handleRemove(book.title)}> Borrar </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default Library;
