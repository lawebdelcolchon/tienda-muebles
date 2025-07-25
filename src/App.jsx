import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Componentes de páginas
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Componentes de layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar productos al carrito
  const addToCart = (product, quantity, selectedOptions) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && 
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity,
          selectedOptions,
        },
      ]);
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar cartItems={cartItems} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/cart" element={
              <Cart 
                cartItems={cartItems} 
                removeFromCart={removeFromCart} 
                updateQuantity={updateQuantity} 
              />
            } />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
