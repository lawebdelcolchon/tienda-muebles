import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, Eye, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simular carga de pedidos desde una API
  useEffect(() => {
    // En un caso real, aquí se haría una llamada a la API
    const mockOrders = [
      {
        id: '1001',
        date: '2023-05-15T10:30:00',
        customer: {
          name: 'Juan Pérez',
          email: 'juan.perez@example.com',
          phone: '+34 612 345 678',
          address: 'Calle Principal 123, Madrid',
          postalCode: '28001',
          city: 'Madrid',
          country: 'España'
        },
        items: [
          { id: 1, name: 'Sofá Moderno', price: 599.99, quantity: 1, image: '/images/products/sofa-1.jpg' },
          { id: 2, name: 'Mesa de Centro', price: 149.99, quantity: 1, image: '/images/products/table-1.jpg' }
        ],
        subtotal: 749.98,
        tax: 157.50,
        shipping: 0,
        total: 907.48,
        status: 'completed',
        paymentMethod: 'card'
      },
      {
        id: '1002',
        date: '2023-05-16T14:45:00',
        customer: {
          name: 'María García',
          email: 'maria.garcia@example.com',
          phone: '+34 623 456 789',
          address: 'Avenida Secundaria 456, Barcelona',
          postalCode: '08001',
          city: 'Barcelona',
          country: 'España'
        },
        items: [
          { id: 3, name: 'Silla de Comedor', price: 89.99, quantity: 4, image: '/images/products/chair-1.jpg' },
          { id: 4, name: 'Mesa de Comedor', price: 299.99, quantity: 1, image: '/images/products/dining-table-1.jpg' }
        ],
        subtotal: 659.95,
        tax: 138.59,
        shipping: 0,
        total: 798.54,
        status: 'processing',
        paymentMethod: 'paypal'
      },
      {
        id: '1003',
        date: '2023-05-17T09:15:00',
        customer: {
          name: 'Carlos Rodríguez',
          email: 'carlos.rodriguez@example.com',
          phone: '+34 634 567 890',
          address: 'Plaza Mayor 789, Valencia',
          postalCode: '46001',
          city: 'Valencia',
          country: 'España'
        },
        items: [
          { id: 5, name: 'Cama King Size', price: 799.99, quantity: 1, image: '/images/products/bed-1.jpg' },
          { id: 6, name: 'Mesita de Noche', price: 79.99, quantity: 2, image: '/images/products/nightstand-1.jpg' }
        ],
        subtotal: 959.97,
        tax: 201.59,
        shipping: 0,
        total: 1161.56,
        status: 'pending',
        paymentMethod: 'card'
      }
    ];

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Filtrar pedidos según búsqueda y estado
  useEffect(() => {
    let result = orders;
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(order => 
        order.id.includes(searchTerm) || 
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por estado
    if (filterStatus !== 'all') {
      result = result.filter(order => order.status === filterStatus);
    }
    
    setFilteredOrders(result);
  }, [searchTerm, filterStatus, orders]);

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Obtener icono según estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Obtener texto según estado
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'processing':
        return 'En proceso';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };

  // Ver detalles de un pedido
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Cambiar estado de un pedido
  const updateOrderStatus = (orderId, newStatus) => {
    // En un caso real, aquí se haría una llamada a la API
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Eliminar un pedido
  const deleteOrder = (orderId) => {
    // En un caso real, aquí se haría una llamada a la API
    if (window.confirm('¿Está seguro de que desea eliminar este pedido?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      
      if (isModalOpen && selectedOrder && selectedOrder.id === orderId) {
        closeModal();
      }
    }
  };

  // Exportar pedidos a CSV
  const exportToCSV = () => {
    // Implementación básica de exportación a CSV
    const headers = ['ID', 'Fecha', 'Cliente', 'Email', 'Total', 'Estado'];
    
    const csvData = filteredOrders.map(order => [
      order.id,
      new Date(order.date).toISOString().split('T')[0],
      order.customer.name,
      order.customer.email,
      order.total.toFixed(2),
      getStatusText(order.status)
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pedidos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Sistema Administrativo de Pedidos</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Buscar por ID, cliente o email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative w-full sm:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">En proceso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportar
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método de Pago
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.total.toFixed(2)}€
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-2 text-sm text-gray-900">{getStatusText(order.status)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.paymentMethod === 'card' ? 'Tarjeta' : 'PayPal'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              // Aquí iría la lógica para editar
                              alert(`Editar pedido ${order.id}`);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No se encontraron pedidos con los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Detalles del Pedido #{selectedOrder.id}
                      </h3>
                      <div className="flex items-center">
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-2 text-sm font-medium">{getStatusText(selectedOrder.status)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Customer Information */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Información del Cliente</h4>
                        <p className="text-sm font-medium text-gray-900">{selectedOrder.customer.name}</p>
                        <p className="text-sm text-gray-500">{selectedOrder.customer.email}</p>
                        <p className="text-sm text-gray-500">{selectedOrder.customer.phone}</p>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Dirección de Envío</h4>
                          <p className="text-sm text-gray-900">{selectedOrder.customer.address}</p>
                          <p className="text-sm text-gray-900">
                            {selectedOrder.customer.postalCode}, {selectedOrder.customer.city}
                          </p>
                          <p className="text-sm text-gray-900">{selectedOrder.customer.country}</p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Resumen del Pedido</h4>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">Fecha:</span>
                          <span className="text-sm text-gray-900">{formatDate(selectedOrder.date)}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">Método de Pago:</span>
                          <span className="text-sm text-gray-900">
                            {selectedOrder.paymentMethod === 'card' ? 'Tarjeta' : 'PayPal'}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">Subtotal:</span>
                          <span className="text-sm text-gray-900">{selectedOrder.subtotal.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">IVA (21%):</span>
                          <span className="text-sm text-gray-900">{selectedOrder.tax.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">Envío:</span>
                          <span className="text-sm text-gray-900">
                            {selectedOrder.shipping === 0 ? 'Gratis' : `${selectedOrder.shipping.toFixed(2)}€`}
                          </span>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                          <span className="text-sm font-medium text-gray-900">Total:</span>
                          <span className="text-sm font-medium text-gray-900">{selectedOrder.total.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Productos</h4>
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Producto
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cantidad
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedOrder.items.map((item) => (
                              <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                                      <img 
                                        src={item.image || '/placeholder.jpg'} 
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = '/placeholder.jpg';
                                        }}
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                  {item.price.toFixed(2)}€
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                  {item.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                  {(item.price * item.quantity).toFixed(2)}€
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Status Management */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Gestión de Estado</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'pending')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                          Pendiente
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                          En Proceso
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                          Completado
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full ${selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                          Cancelado
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Aquí iría la lógica para imprimir
                    alert(`Imprimir pedido ${selectedOrder.id}`);
                  }}
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;