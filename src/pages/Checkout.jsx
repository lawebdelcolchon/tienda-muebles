import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Check } from 'lucide-react';

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar campos obligatorios
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });

    // Validar email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }

    // Validar teléfono
    if (formData.phone && !/^[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono no válido (9 dígitos)';
    }

    // Validar código postal
    if (formData.postalCode && !/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Código postal no válido (5 dígitos)';
    }

    // Validar campos de tarjeta si el método de pago es tarjeta
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Número de tarjeta obligatorio';
      } else if (!/^[0-9]{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Número de tarjeta no válido';
      }

      if (!formData.cardName) {
        newErrors.cardName = 'Nombre en la tarjeta obligatorio';
      }

      if (!formData.cardExpiry) {
        newErrors.cardExpiry = 'Fecha de caducidad obligatoria';
      } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Formato MM/YY';
      }

      if (!formData.cardCvc) {
        newErrors.cardCvc = 'CVC obligatorio';
      } else if (!/^[0-9]{3,4}$/.test(formData.cardCvc)) {
        newErrors.cardCvc = 'CVC no válido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulación de procesamiento de pago
      setTimeout(() => {
        setOrderPlaced(true);
        setCartItems([]);
        setIsProcessing(false);
      }, 2000);
    }
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Pedido realizado con éxito!</h1>
          <p className="text-gray-600 mb-6">
            Gracias por tu compra. Hemos enviado un correo electrónico de confirmación a {formData.email} con los detalles de tu pedido.
          </p>
          <p className="text-gray-600 mb-8">
            Número de pedido: <span className="font-semibold">#{Math.floor(100000 + Math.random() * 900000)}</span>
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/cart" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft size={18} className="mr-1" /> Volver al carrito
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">No puedes realizar el checkout sin productos</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de checkout */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Información de contacto */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Información de contacto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Dirección de envío */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Dirección de envío</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      País *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="España">España</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Francia">Francia</option>
                      <option value="Italia">Italia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Método de pago</h2>
                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="card" className="ml-2 flex items-center">
                      <CreditCard size={20} className="mr-2 text-gray-600" />
                      Tarjeta de crédito/débito
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="paypal" className="ml-2">
                      PayPal
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Número de tarjeta *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre en la tarjeta *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md ${errors.cardName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha de caducidad *
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                          CVC *
                        </label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          placeholder="123"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md ${errors.cardCvc ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.cardCvc && <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'paypal' && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-600 text-sm">
                      Serás redirigido a PayPal para completar tu compra de forma segura.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gray-50">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>Realizar pedido ({totalWithShipping.toFixed(2)}€)</>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
                <div className="max-h-60 overflow-y-auto mb-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-start py-3 border-b border-gray-200 last:border-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-800 mt-1">
                          {(item.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="bg-blue-50 p-4 rounded-md flex items-start">
                  <Truck size={20} className="text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Información de envío</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {shippingCost === 0 
                        ? 'Envío gratuito en pedidos superiores a 100€' 
                        : 'Envío estándar: 3-5 días laborables'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;