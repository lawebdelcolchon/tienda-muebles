import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Categorías de muebles
  const categories = [
    { name: 'Sofás y Sillones', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', link: '/category/sofas' },
    { name: 'Mesas y Sillas', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80', link: '/category/mesas' },
    { name: 'Dormitorio', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', link: '/category/dormitorio' },
    { name: 'Armarios', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', link: '/category/armarios' },
    { name: 'Decoración', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80', link: '/category/decoracion' },
    { name: 'Jardín', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', link: '/category/jardin' },
  ];

  // Productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: 'Sofá Moderno 3 Plazas',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      colors: ['#A9A9A9', '#D3D3D3', '#8B4513'],
    },
    {
      id: 2,
      name: 'Mesa de Comedor Extensible',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
      colors: ['#8B4513', '#D2B48C'],
    },
    {
      id: 3,
      name: 'Cama con Canapé 150cm',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      colors: ['#A9A9A9', '#FFFFFF', '#000000'],
    },
    {
      id: 4,
      name: 'Armario 4 Puertas',
      price: 429.99,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      colors: ['#FFFFFF', '#8B4513', '#D3D3D3'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner principal */}
      <section className="relative mb-12">
        <div className="bg-blue-800 rounded-lg overflow-hidden">
          <div className="md:flex items-center">
            <div className="md:w-1/2 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Muebles de calidad para tu hogar
              </h1>
              <p className="text-blue-100 mb-6">
                Descubre nuestra colección de muebles diseñados para brindarte confort y estilo. 
                Hasta 40% de descuento en productos seleccionados.
              </p>
              <Link
                to="/category/ofertas"
                className="inline-block bg-white text-blue-800 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
              >
                Ver Ofertas
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Sala de estar moderna"
                className="w-full h-64 md:h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Explora nuestras categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
              <Link to={category.link}>
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white font-semibold p-3 w-full text-center">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Productos destacados</h2>
          <Link to="/category/todos" className="text-blue-600 hover:text-blue-800 font-medium">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-blue-700 font-bold text-xl mb-2">{product.price.toFixed(2)}€</p>
                  <div className="flex space-x-2">
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Ventajas */}
      <section className="mb-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">¿Por qué elegirnos?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Calidad garantizada</h3>
            <p className="text-gray-600">Todos nuestros productos están fabricados con materiales de primera calidad.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 4-8-4V5l8 4 8-4v2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Envío rápido</h3>
            <p className="text-gray-600">Entrega en 24/48h en península. Consulta condiciones para otros destinos.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Pago seguro</h3>
            <p className="text-gray-600">Múltiples métodos de pago con la máxima seguridad garantizada.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;