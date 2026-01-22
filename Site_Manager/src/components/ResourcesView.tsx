import React from 'react'
import {Package, TrendingDown, AlertCircle, Sparkles} from 'lucide-react'

const ResourcesView = () => {
  const materials = [
    { id: 1, name: 'Cement (50kg bags)', stock: 145, unit: 'bags', minStock: 100, status: 'good', lastUpdate: '2 hours ago' },
    { id: 2, name: 'Steel Rods (12mm)', stock: 45, unit: 'pieces', minStock: 50, status: 'low', lastUpdate: '1 hour ago' },
    { id: 3, name: 'Bricks', stock: 2850, unit: 'pieces', minStock: 1000, status: 'good', lastUpdate: '3 hours ago' },
    { id: 4, name: 'Sand (Cubic Meter)', stock: 8, unit: 'm³', minStock: 15, status: 'critical', lastUpdate: '30 mins ago' },
    { id: 5, name: 'Gravel (Cubic Meter)', stock: 22, unit: 'm³', minStock: 20, status: 'good', lastUpdate: '1 hour ago' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'low':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStockPercentage = (stock: number, minStock: number) => {
    return Math.min((stock / minStock) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
          <p className="text-gray-600 mt-1">Track materials and inventory</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Sparkles size={18} />
          <span className="text-sm font-medium">AI Recommendations</span>
        </button>
      </div>

      {/* Alerts */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-red-900">Low Stock Alert</h3>
            <p className="text-sm text-red-700 mt-1">2 materials are below minimum stock levels. Reorder recommended.</p>
          </div>
        </div>
      </div>

      {/* Materials List */}
      <div className="grid gap-4">
        {materials.map((material) => {
          const stockPercentage = getStockPercentage(material.stock, material.minStock)
          
          return (
            <div key={material.id} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{material.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Min. stock: {material.minStock} {material.unit}</p>
                    <p className="text-xs text-gray-500 mt-1">Updated {material.lastUpdate}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded border ${getStatusColor(material.status)}`}>
                  {material.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current Stock</span>
                  <span className="font-semibold text-gray-900">{material.stock} {material.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      material.status === 'critical' ? 'bg-red-500' :
                      material.status === 'low' ? 'bg-amber-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${stockPercentage}%` }}
                  />
                </div>
                {material.status !== 'good' && (
                  <div className="flex items-center gap-2 mt-3 p-3 bg-amber-50 rounded-lg">
                    <TrendingDown className="text-amber-600" size={16} />
                    <p className="text-xs text-amber-700">
                      {material.status === 'critical' 
                        ? `Urgent reorder needed. ${material.minStock - material.stock} ${material.unit} below minimum.`
                        : `Reorder soon. Approaching minimum threshold.`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors text-left">
          <Package className="text-blue-600 mb-2" size={24} />
          <p className="font-medium text-gray-900">Log Receipt</p>
          <p className="text-xs text-gray-600 mt-1">Record material arrival</p>
        </button>
        <button className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:border-purple-400 transition-colors text-left">
          <TrendingDown className="text-purple-600 mb-2" size={24} />
          <p className="font-medium text-gray-900">Log Usage</p>
          <p className="text-xs text-gray-600 mt-1">Track material consumption</p>
        </button>
        <button className="bg-white border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors text-left">
          <AlertCircle className="text-green-600 mb-2" size={24} />
          <p className="font-medium text-gray-900">Request Materials</p>
          <p className="text-xs text-gray-600 mt-1">Submit procurement request</p>
        </button>
      </div>
    </div>
  )
}

export default ResourcesView
