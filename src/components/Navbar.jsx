import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';

const Navbar = ({ cartItems }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  useEffect(() => {
    // Verificar si el administrador está autenticado
    const checkAdminAuth = () => {
      const adminAuth = localStorage.getItem('adminAuthenticated') === 'true';
      setIsAdminAuthenticated(adminAuth);
    };
    
    checkAdminAuth();
    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkAdminAuth);
    
    return () => {
      window.removeEventListener('storage', checkAdminAuth);
    };
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    { name: 'Sofás y Sillones', path: '/category/sofas' },
    { name: 'Mesas y Sillas', path: '/category/mesas' },
    { name: 'Dormitorio', path: '/category/dormitorio' },
    { name: 'Armarios', path: '/category/armarios' },
    { name: 'Decoración', path: '/category/decoracion' },
    { name: 'Jardín', path: '/category/jardin' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar búsqueda
    console.log('Buscando:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-800">
            MuebleHogar
          </Link>

          {/* Búsqueda en pantallas medianas y grandes */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar muebles..."
                  className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-500 hover:text-blue-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Navegación en pantallas medianas y grandes */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Inicio
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 flex items-center">
                Categorías
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              to={isAdminAuthenticated ? "/admin/dashboard" : "/admin/login"} 
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              <User size={18} className="mr-1" />
              Administración
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative mr-4">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar muebles..."
                  className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-500 hover:text-blue-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to={isAdminAuthenticated ? "/admin/dashboard" : "/admin/login"}
                className="text-gray-700 hover:text-blue-600 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-1" />
                Administración
              </Link>
              <div className="py-2">
                <p className="text-gray-700 font-medium mb-2">Categorías</p>
                <div className="pl-4 flex flex-col space-y-2">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={category.path}
                      className="text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;