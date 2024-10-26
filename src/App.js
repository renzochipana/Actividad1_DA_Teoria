
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Inicio';
import About from './pages/Libreria';
import Card from './pages/Carrito';

import { CartContext, CartProvider } from './context/CartContext';
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/about">Libreria</Link></li>
            <li><Link to="/contact">Carrito</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Card />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}


export default App;