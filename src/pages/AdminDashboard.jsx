import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  ArrowUp, 
  ArrowDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package, 
  RefreshCw,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Mail
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [period, setPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [marketingCampaigns, setMarketingCampaigns] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categoryVisits, setCategoryVisits] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
      setIsAuthenticated(isAuth);
      
      if (!isAuth) {
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Cargar datos simulados
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadDashboardData = () => {
      setIsLoading(true);
      
      // Simulación de carga de datos
      setTimeout(() => {
        // Datos de campañas de marketing
        const mockCampaigns = [
          {
            id: 1,
            name: 'Descuento Verano',
            status: 'active',
            startDate: '2023-06-01',
            endDate: '2023-08-31',
            budget: 1500,
            spent: 750,
            clicks: 3200,
            conversions: 128,
            revenue: 6400
          },
          {
            id: 2,
            name: 'Promoción Dormitorios',
            status: 'active',
            startDate: '2023-07-15',
            endDate: '2023-09-15',
            budget: 1200,
            spent: 600,
            clicks: 2800,
            conversions: 95,
            revenue: 4750
          },
          {
            id: 3,
            name: 'Black Friday',
            status: 'scheduled',
            startDate: '2023-11-20',
            endDate: '2023-11-30',
            budget: 3000,
            spent: 0,
            clicks: 0,
            conversions: 0,
            revenue: 0
          },
          {
            id: 4,
            name: 'Navidad 2023',
            status: 'scheduled',
            startDate: '2023-12-01',
            endDate: '2023-12-24',
            budget: 2500,
            spent: 0,
            clicks: 0,
            conversions: 0,
            revenue: 0
          },
          {
            id: 5,
            name: 'Primavera 2023',
            status: 'completed',
            startDate: '2023-03-01',
            endDate: '2023-05-31',
            budget: 1800,
            spent: 1800,
            clicks: 4500,
            conversions: 180,
            revenue: 9000
          }
        ];

        // Datos de pedidos recientes
        const mockRecentOrders = [
          {
            id: '1005',
            date: '2023-07-28T09:45:00',
            customer: 'Ana Martínez',
            total: 1245.50,
            status: 'completed',
            items: 3
          },
          {
            id: '1004',
            date: '2023-07-27T16:30:00',
            customer: 'Pedro Sánchez',
            total: 879.99,
            status: 'processing',
            items: 2
          },
          {
            id: '1003',
            date: '2023-07-26T11:15:00',
            customer: 'Carlos Rodríguez',
            total: 1161.56,
            status: 'pending',
            items: 3
          },
          {
            id: '1002',
            date: '2023-07-25T14:45:00',
            customer: 'María García',
            total: 798.54,
            status: 'completed',
            items: 5
          },
          {
            id: '1001',
            date: '2023-07-24T10:30:00',
            customer: 'Juan Pérez',
            total: 907.48,
            status: 'completed',
            items: 2
          }
        ];

        // Datos de productos más vendidos
        const mockTopProducts = [
          { id: 1, name: 'Sofá Moderno', sales: 42, revenue: 25189.58, category: 'Sofás y Sillones', stock: 15 },
          { id: 2, name: 'Cama King Size', sales: 38, revenue: 30399.62, category: 'Dormitorio', stock: 8 },
          { id: 3, name: 'Mesa de Comedor', sales: 35, revenue: 10499.65, category: 'Mesas y Sillas', stock: 12 },
          { id: 4, name: 'Silla de Comedor', sales: 120, revenue: 10798.80, category: 'Mesas y Sillas', stock: 45 },
          { id: 5, name: 'Armario Ropero', sales: 28, revenue: 19599.72, category: 'Armarios', stock: 10 }
        ];

        // Datos de visitas por categoría
        const mockCategoryVisits = [
          { category: 'Sofás y Sillones', visits: 4500, percentage: 30 },
          { category: 'Mesas y Sillas', visits: 3200, percentage: 21 },
          { category: 'Dormitorio', visits: 2800, percentage: 19 },
          { category: 'Armarios', visits: 1900, percentage: 13 },
          { category: 'Decoración', visits: 1500, percentage: 10 },
          { category: 'Jardín', visits: 1100, percentage: 7 }
        ];

        // Datos de ventas
        const mockSalesData = {
          totalSales: 125750.45,
          totalOrders: 215,
          averageOrderValue: 584.89,
          totalReturns: 12,
          returnsRate: 5.58,
          salesGrowth: 12.5,
          ordersGrowth: 8.3,
          returnsGrowth: -2.1,
          monthlySales: [
            { month: 'Ene', sales: 8500.25 },
            { month: 'Feb', sales: 9200.50 },
            { month: 'Mar', sales: 10100.75 },
            { month: 'Abr', sales: 9800.30 },
            { month: 'May', sales: 11200.45 },
            { month: 'Jun', sales: 12500.60 },
            { month: 'Jul', sales: 13500.80 },
            { month: 'Ago', sales: 0 },
            { month: 'Sep', sales: 0 },
            { month: 'Oct', sales: 0 },
            { month: 'Nov', sales: 0 },
            { month: 'Dic', sales: 0 }
          ],
          salesByCategory: [
            { category: 'Sofás y Sillones', amount: 37725.13, percentage: 30 },
            { category: 'Dormitorio', amount: 31437.61, percentage: 25 },
            { category: 'Mesas y Sillas', amount: 25150.09, percentage: 20 },
            { category: 'Armarios', amount: 18862.57, percentage: 15 },
            { category: 'Decoración', amount: 7545.03, percentage: 6 },
            { category: 'Jardín', amount: 5030.02, percentage: 4 }
          ]
        };

        setMarketingCampaigns(mockCampaigns);
        setRecentOrders(mockRecentOrders);
        setTopProducts(mockTopProducts);
        setCategoryVisits(mockCategoryVisits);
        setSalesData(mockSalesData);
        setIsLoading(false);
      }, 1000);
    };

    loadDashboardData();
  }, [isAuthenticated, navigate, period]);

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Formatear número como moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Obtener color según estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      case 'active':
        return 'Activa';
      case 'scheduled':
        return 'Programada';
      default:
        return 'Desconocido';
    }
  };

  // Obtener icono y color según tendencia
  const getTrendIndicator = (value) => {
    if (value > 0) {
      return { icon: <ArrowUp className="h-4 w-4 text-green-500" />, color: 'text-green-500' };
    } else if (value < 0) {
      return { icon: <ArrowDown className="h-4 w-4 text-red-500" />, color: 'text-red-500' };
    } else {
      return { icon: null, color: 'text-gray-500' };
    }
  };

  if (!isAuthenticated) {
    return null; // No renderizar nada si no está autenticado
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Panel de Administración</h1>
          <div className="flex items-center space-x-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
              <option value="year">Último año</option>
            </select>
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Gestionar Pedidos
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`${activeTab === 'sales' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Ventas
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`${activeTab === 'products' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`${activeTab === 'marketing' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Marketing
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Total Sales Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <DollarSign className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Ventas Totales</dt>
                            <dd>
                              <div className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  {formatCurrency(salesData.totalSales)}
                                </div>
                                <div className={`ml-2 flex items-baseline text-sm font-semibold ${getTrendIndicator(salesData.salesGrowth).color}`}>
                                  {getTrendIndicator(salesData.salesGrowth).icon}
                                  <span className="sr-only">Incremento de</span>
                                  {Math.abs(salesData.salesGrowth)}%
                                </div>
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Orders Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                          <ShoppingBag className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Pedidos Totales</dt>
                            <dd>
                              <div className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  {salesData.totalOrders}
                                </div>
                                <div className={`ml-2 flex items-baseline text-sm font-semibold ${getTrendIndicator(salesData.ordersGrowth).color}`}>
                                  {getTrendIndicator(salesData.ordersGrowth).icon}
                                  <span className="sr-only">Incremento de</span>
                                  {Math.abs(salesData.ordersGrowth)}%
                                </div>
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Average Order Value Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                          <Package className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Valor Medio Pedido</dt>
                            <dd>
                              <div className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  {formatCurrency(salesData.averageOrderValue)}
                                </div>
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Returns Rate Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                          <RefreshCw className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Tasa de Devoluciones</dt>
                            <dd>
                              <div className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  {salesData.returnsRate}%
                                </div>
                                <div className={`ml-2 flex items-baseline text-sm font-semibold ${getTrendIndicator(-salesData.returnsGrowth).color}`}>
                                  {getTrendIndicator(-salesData.returnsGrowth).icon}
                                  <span className="sr-only">Cambio de</span>
                                  {Math.abs(salesData.returnsGrowth)}%
                                </div>
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Sales Chart */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Ventas Mensuales</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Evolución de ventas durante el año actual
                        </p>
                      </div>
                      <div className="mt-5 h-48">
                        {/* Simulación de gráfico */}
                        <div className="h-full flex items-end space-x-2">
                          {salesData.monthlySales.map((item, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-blue-500 rounded-t" 
                                style={{ 
                                  height: `${(item.sales / Math.max(...salesData.monthlySales.map(s => s.sales || 1))) * 100}%`,
                                  minHeight: item.sales > 0 ? '4px' : '0'
                                }}
                              ></div>
                              <div className="text-xs text-gray-500 mt-1">{item.month}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Distribution */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Ventas por Categoría</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Distribución de ventas por categoría de producto
                        </p>
                      </div>
                      <div className="mt-5 space-y-3">
                        {salesData.salesByCategory.map((category, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-gray-700">{category.category}</div>
                              <div className="text-gray-900 font-medium">{formatCurrency(category.amount)}</div>
                            </div>
                            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${category.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Pedidos Recientes</h3>
                      <button
                        onClick={() => navigate('/admin')}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Ver todos
                      </button>
                    </div>
                  </div>
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
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(order.total)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <div className="space-y-6">
                {/* Sales Overview */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Resumen de Ventas</h3>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500">Ventas Totales</h4>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(salesData.totalSales)}</p>
                        <div className="mt-1 flex items-baseline text-sm">
                          <span className={`${getTrendIndicator(salesData.salesGrowth).color} font-semibold flex items-center`}>
                            {getTrendIndicator(salesData.salesGrowth).icon}
                            {Math.abs(salesData.salesGrowth)}%
                          </span>
                          <span className="text-gray-500 ml-2">vs. periodo anterior</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500">Número de Pedidos</h4>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{salesData.totalOrders}</p>
                        <div className="mt-1 flex items-baseline text-sm">
                          <span className={`${getTrendIndicator(salesData.ordersGrowth).color} font-semibold flex items-center`}>
                            {getTrendIndicator(salesData.ordersGrowth).icon}
                            {Math.abs(salesData.ordersGrowth)}%
                          </span>
                          <span className="text-gray-500 ml-2">vs. periodo anterior</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500">Devoluciones</h4>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{salesData.totalReturns}</p>
                        <div className="mt-1 flex items-baseline text-sm">
                          <span className={`${getTrendIndicator(-salesData.returnsGrowth).color} font-semibold flex items-center`}>
                            {getTrendIndicator(-salesData.returnsGrowth).icon}
                            {Math.abs(salesData.returnsGrowth)}%
                          </span>
                          <span className="text-gray-500 ml-2">vs. periodo anterior</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sales Chart */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Evolución de Ventas</h3>
                  </div>
                  <div className="p-5">
                    <div className="h-72">
                      {/* Simulación de gráfico de línea */}
                      <div className="h-full flex flex-col">
                        <div className="flex-1 flex items-end space-x-2">
                          {salesData.monthlySales.map((item, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-blue-500 rounded-t" 
                                style={{ 
                                  height: `${(item.sales / Math.max(...salesData.monthlySales.map(s => s.sales || 1))) * 100}%`,
                                  minHeight: item.sales > 0 ? '4px' : '0'
                                }}
                              ></div>
                              <div className="text-xs text-gray-500 mt-1">{item.month}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Ventas Máximas</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(Math.max(...salesData.monthlySales.map(s => s.sales)))}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Ventas Mínimas</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(Math.min(...salesData.monthlySales.filter(s => s.sales > 0).map(s => s.sales)))}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Promedio Mensual</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(salesData.monthlySales.filter(s => s.sales > 0).reduce((acc, curr) => acc + curr.sales, 0) / salesData.monthlySales.filter(s => s.sales > 0).length)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sales by Category */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Ventas por Categoría</h3>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        {/* Simulación de gráfico circular */}
                        <div className="relative h-64 w-64 mx-auto">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-500">Total</p>
                              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(salesData.totalSales)}</p>
                            </div>
                          </div>
                          <svg viewBox="0 0 100 100" className="h-full w-full">
                            {salesData.salesByCategory.map((category, index) => {
                              const startAngle = salesData.salesByCategory.slice(0, index).reduce((sum, cat) => sum + cat.percentage, 0) * 3.6;
                              const endAngle = startAngle + category.percentage * 3.6;
                              const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                              const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                              const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                              const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                              const largeArcFlag = category.percentage > 50 ? 1 : 0;
                              
                              const colors = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F97316'];
                              
                              return (
                                <path 
                                  key={index}
                                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                  fill={colors[index % colors.length]}
                                />
                              );
                            })}
                          </svg>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {salesData.salesByCategory.map((category, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-2" 
                              style={{ backgroundColor: ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F97316'][index % 6] }}
                            ></div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-700">{category.category}</p>
                                <p className="text-sm font-medium text-gray-900">{formatCurrency(category.amount)}</p>
                              </div>
                              <div className="mt-1 flex justify-between text-xs">
                                <p className="text-gray-500">{category.percentage}% del total</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Top Products */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Productos Más Vendidos</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Producto
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoría
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ventas
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ingresos
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {topProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {product.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {product.sales} unidades
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(product.revenue)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {product.stock} unidades
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Category Visits */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Visitas por Categoría</h3>
                  </div>
                  <div className="p-5">
                    <div className="space-y-4">
                      {categoryVisits.map((category, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-gray-700">{category.category}</div>
                            <div className="text-gray-900 font-medium">{category.visits.toLocaleString()} visitas</div>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Performance */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Rendimiento de Productos</h3>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500">Producto Más Vendido</h4>
                        <p className="mt-2 text-xl font-bold text-gray-900">{topProducts[0].name}</p>
                        <div className="mt-1 text-sm text-gray-500">
                          <p>{topProducts[0].sales} unidades vendidas</p>
                          <p className="mt-1">{formatCurrency(topProducts[0].revenue)} en ingresos</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500">Categoría Más Popular</h4>
                        <p className="mt-2 text-xl font-bold text-gray-900">{categoryVisits[0].category}</p>
                        <div className="mt-1 text-sm text-gray-500">
                          <p>{categoryVisits[0].visits.toLocaleString()} visitas</p>
                          <p className="mt-1">{categoryVisits[0].percentage}% del total de visitas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Marketing Tab */}
            {activeTab === 'marketing' && (
              <div className="space-y-6">
                {/* Marketing Campaigns */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Campañas de Marketing</h3>
                      <button
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Nueva Campaña
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Periodo
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Presupuesto
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Conversiones
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ingresos
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {marketingCampaigns.map((campaign) => (
                          <tr key={campaign.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {campaign.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                                {getStatusText(campaign.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(campaign.budget)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {campaign.conversions > 0 ? campaign.conversions : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {campaign.revenue > 0 ? formatCurrency(campaign.revenue) : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Campaign Performance */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* ROI Chart */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">ROI de Campañas</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Retorno de inversión de las campañas activas
                        </p>
                      </div>
                      <div className="mt-5 space-y-4">
                        {marketingCampaigns
                          .filter(campaign => campaign.status === 'active' || campaign.status === 'completed')
                          .map((campaign, index) => {
                            const roi = campaign.revenue > 0 ? ((campaign.revenue - campaign.spent) / campaign.spent) * 100 : 0;
                            return (
                              <div key={index}>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="text-gray-700">{campaign.name}</div>
                                  <div className={`font-medium ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {roi.toFixed(2)}% ROI
                                  </div>
                                </div>
                                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${roi >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                    style={{ width: `${Math.min(Math.abs(roi), 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  {/* Conversion Rates */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Tasas de Conversión</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Porcentaje de clics que resultan en ventas
                        </p>
                      </div>
                      <div className="mt-5 space-y-4">
                        {marketingCampaigns
                          .filter(campaign => campaign.clicks > 0)
                          .map((campaign, index) => {
                            const conversionRate = (campaign.conversions / campaign.clicks) * 100;
                            return (
                              <div key={index}>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="text-gray-700">{campaign.name}</div>
                                  <div className="text-gray-900 font-medium">
                                    {conversionRate.toFixed(2)}%
                                  </div>
                                </div>
                                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${Math.min(conversionRate * 5, 100)}%` }}
                                  ></div>
                                </div>
                                <div className="mt-1 flex justify-between text-xs text-gray-500">
                                  <span>{campaign.conversions} conversiones</span>
                                  <span>{campaign.clicks} clics</span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Marketing */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Email Marketing</h3>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mb-4">
                          <Mail className="h-6 w-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">2,450</h4>
                        <p className="text-sm text-gray-500">Suscriptores</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-500 mb-4">
                          <Mail className="h-6 w-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">32.5%</h4>
                        <p className="text-sm text-gray-500">Tasa de apertura</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-500 mb-4">
                          <Mail className="h-6 w-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">12.8%</h4>
                        <p className="text-sm text-gray-500">Tasa de clics</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Campañas de Email Recientes</h4>
                      <ul className="divide-y divide-gray-200">
                        <li className="py-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Novedades de Verano</p>
                            <p className="text-xs text-gray-500">Enviado: 15 Jul 2023</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">35.2% abiertos</p>
                            <p className="text-xs text-gray-500">14.8% clics</p>
                          </div>
                        </li>
                        <li className="py-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Descuentos Exclusivos</p>
                            <p className="text-xs text-gray-500">Enviado: 1 Jul 2023</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">42.1% abiertos</p>
                            <p className="text-xs text-gray-500">18.5% clics</p>
                          </div>
                        </li>
                        <li className="py-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Nueva Colección</p>
                            <p className="text-xs text-gray-500">Enviado: 15 Jun 2023</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">38.7% abiertos</p>
                            <p className="text-xs text-gray-500">16.2% clics</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;