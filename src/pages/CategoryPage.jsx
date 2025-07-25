import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Datos de ejemplo para las categorías de muebles
  const categoryProducts = {
    sofas: [
      { id: 1, name: 'Sofá Moderno 3 Plazas', price: 599.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 2, name: 'Sofá Chaise Longue', price: 749.99, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 3, name: 'Sillón Relax', price: 349.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80' },
      { id: 4, name: 'Sofá Cama', price: 499.99, image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    ],
    mesas: [
      { id: 5, name: 'Mesa de Comedor Extensible', price: 349.99, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80' },
      { id: 6, name: 'Mesa de Centro', price: 149.99, image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 7, name: 'Juego de 4 Sillas', price: 199.99, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 8, name: 'Mesa Auxiliar', price: 79.99, image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    ],
    dormitorio: [
      { id: 9, name: 'Cama con Canapé 150cm', price: 499.99, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 10, name: 'Mesita de Noche', price: 89.99, image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 11, name: 'Cómoda 6 Cajones', price: 249.99, image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 12, name: 'Cabecero Tapizado', price: 129.99, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    ],
    armarios: [
      { id: 13, name: 'Armario 4 Puertas', price: 429.99, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 14, name: 'Armario Vestidor', price: 599.99, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 15, name: 'Zapatero', price: 119.99, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 16, name: 'Cómoda Zapatero', price: 159.99, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    ],
    decoracion: [
      { id: 17, name: 'Lámpara de Pie', price: 79.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80' },
      { id: 18, name: 'Espejo Decorativo', price: 59.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80' },
      { id: 19, name: 'Alfombra 160x230cm', price: 129.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80' },
      { id: 20, name: 'Cuadro Decorativo', price: 49.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80' },
    ],
    jardin: [
      { id: 21, name: 'Conjunto Mesa y Sillas Jardín', price: 349.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 22, name: 'Tumbona Plegable', price: 89.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 23, name: 'Parasol 3m', price: 59.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 24, name: 'Barbacoa de Gas', price: 249.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    ],
    ofertas: [
      { id: 1, name: 'Sofá Moderno 3 Plazas', price: 599.99, discountPrice: 499.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 7, name: 'Juego de 4 Sillas', price: 199.99, discountPrice: 159.99, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 13, name: 'Armario 4 Puertas', price: 429.99, discountPrice: 349.99, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 21, name: 'Conjunto Mesa y Sillas Jardín', price: 349.99, discountPrice: 299.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    ],
    todos: [
      // Combinación de productos de todas las categorías
      { id: 1, name: 'Sofá Moderno 3 Plazas', price: 599.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 5, name: 'Mesa de Comedor Extensible', price: 349.99, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80' },
      { id: 9, name: 'Cama con Canapé 150cm', price: 499.99, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 13, name: 'Armario 4 Puertas', price: 429.99, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
      { id: 17, name: 'Lámpara de Pie', price: 79.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80' },
      { id: 21, name: 'Conjunto Mesa y Sillas Jardín', price: 349.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    ],
  };

  const products = categoryProducts[categoryName] || [];
  const isOfferCategory = categoryName === 'ofertas';

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 capitalize">
        {categoryName === 'todos' ? 'Todos los productos' : categoryName}
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No hay productos disponibles en esta categoría.</p>
          <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Volver al inicio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {isOfferCategory && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                  <div className="flex items-center">
                    {isOfferCategory ? (
                      <>
                        <p className="text-gray-500 line-through mr-2">{product.price.toFixed(2)}€</p>
                        <p className="text-red-600 font-bold text-xl">{product.discountPrice.toFixed(2)}€</p>
                      </>
                    ) : (
                      <p className="text-blue-700 font-bold text-xl">{product.price.toFixed(2)}€</p>
                    )}
                  </div>
                  <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300">
                    Ver detalles
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;