import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Truck, ArrowLeft, Check, Info } from 'lucide-react';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('descripcion');
  const [selectedImage, setSelectedImage] = useState('');
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Datos de ejemplo para un producto
  // En una aplicación real, estos datos vendrían de una API
  const productData = {
    id: parseInt(id),
    name: 'Sofá Moderno 3 Plazas',
    description: 'Sofá de 3 plazas con diseño moderno y elegante. Fabricado con materiales de alta calidad para garantizar comodidad y durabilidad.',
    price: 599.99,
    discount: 0.1, // 10% de descuento
    rating: 4.5,
    reviewCount: 127,
    stock: 15,
    sku: 'SOF-MOD-3P',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    ],
    sizes: [
      { value: '2plazas', label: '2 Plazas' },
      { value: '3plazas', label: '3 Plazas' },
      { value: '4plazas', label: '4 Plazas' },
      { value: 'chaiselongue', label: 'Chaise Longue' },
    ],
    materials: [
      { value: 'tela', label: 'Tela' },
      { value: 'piel', label: 'Piel' },
      { value: 'polipiel', label: 'Polipiel' },
    ],
    colors: [
      { value: 'gris', label: 'Gris', hex: '#808080' },
      { value: 'beige', label: 'Beige', hex: '#F5F5DC' },
      { value: 'azul', label: 'Azul', hex: '#1E90FF' },
      { value: 'verde', label: 'Verde', hex: '#228B22' },
    ],
    specifications: {
      dimensiones: '220 x 85 x 95 cm (ancho x alto x profundidad)',
      peso: '45 kg',
      material: 'Estructura de madera de pino, patas de metal, relleno de espuma de alta densidad',
      garantia: '2 años',
      instrucciones: 'Incluye instrucciones de montaje. Montaje sencillo.',
    },
    shipping: [
      { type: 'standard', price: 0, time: '3-5 días laborables', label: 'Envío estándar gratuito' },
      { type: 'express', price: 29.99, time: '24-48 horas', label: 'Envío express' },
    ],
    relatedProducts: [2, 3, 5, 7],
  };

  useEffect(() => {
    // Establecer valores predeterminados
    if (productData.sizes.length > 0) {
      setSelectedSize(productData.sizes[0].value);
    }
    if (productData.colors.length > 0) {
      setSelectedColor(productData.colors[0].value);
    }
    if (productData.materials.length > 0) {
      setSelectedMaterial(productData.materials[0].value);
    }
    if (productData.images.length > 0) {
      setSelectedImage(productData.images[0]);
    }
  }, []);

  const discountedPrice = productData.price * (1 - productData.discount);

  const handleAddToCart = () => {
    const selectedOptions = {
      size: selectedSize,
      color: selectedColor,
      material: selectedMaterial,
    };

    const productToAdd = {
      id: productData.id,
      name: productData.name,
      price: productData.discount > 0 ? discountedPrice : productData.price,
      image: productData.images[0],
    };

    addToCart(productToAdd, quantity, selectedOptions);
    setIsAddedToCart(true);

    // Resetear el mensaje después de 3 segundos
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegación de migas de pan */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/category/sofas" className="hover:text-blue-600">Sofás y Sillones</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{productData.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Galería de imágenes */}
        <div>
          <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={selectedImage} 
              alt={productData.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {productData.images.map((image, index) => (
              <div 
                key={index} 
                className={`aspect-square overflow-hidden rounded-md cursor-pointer ${selectedImage === image ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${productData.name} - Vista ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{productData.name}</h1>
          
          {/* Valoraciones */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 ml-2">{productData.rating} ({productData.reviewCount} valoraciones)</span>
          </div>

          {/* Precio */}
          <div className="mb-6">
            {productData.discount > 0 ? (
              <div className="flex items-center">
                <span className="text-gray-500 line-through text-lg mr-2">{productData.price.toFixed(2)}€</span>
                <span className="text-2xl font-bold text-red-600">{discountedPrice.toFixed(2)}€</span>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                  {Math.round(productData.discount * 100)}% DESCUENTO
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-blue-700">{productData.price.toFixed(2)}€</span>
            )}
            <p className="text-sm text-gray-500 mt-1">IVA incluido</p>
          </div>

          {/* Descripción corta */}
          <p className="text-gray-600 mb-6">{productData.description}</p>

          {/* Opciones de personalización */}
          {productData.sizes.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Tamaño:</h3>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size) => (
                  <button
                    key={size.value}
                    className={`px-4 py-2 border rounded-md ${selectedSize === size.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'}`}
                    onClick={() => setSelectedSize(size.value)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {productData.materials.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Material:</h3>
              <div className="flex flex-wrap gap-2">
                {productData.materials.map((material) => (
                  <button
                    key={material.value}
                    className={`px-4 py-2 border rounded-md ${selectedMaterial === material.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'}`}
                    onClick={() => setSelectedMaterial(material.value)}
                  >
                    {material.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {productData.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Color:</h3>
              <div className="flex flex-wrap gap-3">
                {productData.colors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.value)}
                    title={color.label}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Cantidad:</h3>
            <div className="flex items-center">
              <button 
                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                max={productData.stock} 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, Math.min(productData.stock, parseInt(e.target.value) || 1)))} 
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
              />
              <button 
                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                onClick={() => quantity < productData.stock && setQuantity(quantity + 1)}
              >
                +
              </button>
              <span className="ml-3 text-sm text-gray-500">{productData.stock} disponibles</span>
            </div>
          </div>

          {/* Opciones de envío */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
              <Truck size={18} className="mr-2" /> Opciones de envío:
            </h3>
            <div className="space-y-2">
              {productData.shipping.map((option) => (
                <div key={option.type} className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-gray-600">
                      {option.price > 0 ? `${option.price.toFixed(2)}€` : 'Gratis'} - Entrega en {option.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold flex items-center justify-center transition duration-300"
            >
              <ShoppingCart size={20} className="mr-2" />
              Añadir al carrito
            </button>
            <Link 
              to="/cart" 
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md font-semibold flex items-center justify-center transition duration-300"
            >
              Comprar ahora
            </Link>
          </div>

          {/* Mensaje de confirmación */}
          {isAddedToCart && (
            <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-md flex items-center">
              <Check size={20} className="mr-2" />
              Producto añadido al carrito correctamente
            </div>
          )}
        </div>
      </div>

      {/* Pestañas de información adicional */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['descripcion', 'especificaciones', 'envio'].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'descripcion' ? 'Descripción' : tab === 'especificaciones' ? 'Especificaciones' : 'Envío y devoluciones'}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'descripcion' && (
            <div className="prose max-w-none">
              <p>El sofá moderno de 3 plazas es una pieza elegante y funcional que se adaptará perfectamente a cualquier sala de estar. Su diseño contemporáneo combina líneas limpias con materiales de alta calidad para ofrecer tanto estilo como comodidad.</p>
              <p className="mt-4">Características principales:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Estructura robusta de madera de pino que garantiza durabilidad.</li>
                <li>Cojines de asiento con espuma de alta densidad para mayor comodidad.</li>
                <li>Tapizado de alta calidad disponible en diferentes materiales y colores.</li>
                <li>Patas de metal con acabado negro mate que aportan un toque moderno.</li>
                <li>Diseño ergonómico que proporciona un soporte adecuado para la espalda.</li>
              </ul>
              <p className="mt-4">Este sofá es perfecto para familias que buscan un mueble duradero sin renunciar al estilo. Su versatilidad lo hace adecuado tanto para espacios contemporáneos como para ambientes más clásicos.</p>
            </div>
          )}

          {activeTab === 'especificaciones' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(productData.specifications).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 pb-3">
                  <h3 className="font-semibold text-gray-700 capitalize">{key}:</h3>
                  <p className="text-gray-600 mt-1">{value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'envio' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Envío</h3>
                <p className="text-gray-600">Ofrecemos diferentes opciones de envío para adaptarnos a tus necesidades:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
                  <li><span className="font-medium">Envío estándar gratuito:</span> Entrega en 3-5 días laborables.</li>
                  <li><span className="font-medium">Envío express:</span> Entrega en 24-48 horas por un coste adicional de 29,99€.</li>
                </ul>
                <p className="mt-3 text-gray-600">Todos los envíos incluyen seguimiento y serás notificado por email cuando tu pedido sea enviado.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Devoluciones</h3>
                <p className="text-gray-600">Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto. Para ser elegible para una devolución, el artículo debe estar sin usar y en las mismas condiciones en que lo recibiste.</p>
                <p className="mt-3 text-gray-600">Para iniciar una devolución, ponte en contacto con nuestro servicio de atención al cliente. Ten en cuenta que los gastos de envío de devolución corren por cuenta del cliente, a menos que el artículo sea defectuoso o dañado.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Garantía</h3>
                <p className="text-gray-600">Todos nuestros productos tienen una garantía de 2 años que cubre defectos de fabricación. Esta garantía no cubre el desgaste normal ni los daños causados por un uso inadecuado.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;