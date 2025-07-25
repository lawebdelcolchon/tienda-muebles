import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  // Calcular el subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calcular el IVA (21%)
  const iva = subtotal * 0.21;

  // Calcular el total
  const total = subtotal + iva;

  // Calcular los gastos de envío (gratis si el subtotal es mayor a 100€)
  const shippingCost = subtotal > 100 ? 0 : 4.99;

  // Calcular el total con envío
  const totalWithShipping = total + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Carrito de Compra</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Parece que aún no has añadido ningún producto a tu carrito</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Productos ({cartItems.length})</h2>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <div key={index} className="py-6 flex flex-col sm:flex-row">
                      <div className="sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="text-base font-medium text-gray-800">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.selectedOptions && (
                            <>
                              {item.selectedOptions.size && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  Tamaño: {item.selectedOptions.size}
                                </span>
                              )}
                              {item.selectedOptions.color && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  Color: {item.selectedOptions.color}
                                </span>
                              )}
                              {item.selectedOptions.material && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  Material: {item.selectedOptions.material}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                            <button
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-800">
                              {(item.price * item.quantity).toFixed(2)}€
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.price.toFixed(2)}€ / unidad
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IVA (21%)</span>
                    <span className="text-gray-800">{iva.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gastos de envío</span>
                    <span className="text-gray-800">
                      {shippingCost === 0 ? 'Gratis' : `${shippingCost.toFixed(2)}€`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{totalWithShipping.toFixed(2)}€</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  Proceder al pago <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link
                  to="/"
                  className="w-full text-blue-600 font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300 flex items-center justify-center mt-3"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;