import {Plus, Search, AlertTriangle, TrendingDown} from 'lucide-react'

export default function Materials() {
  const materials = [
    { id: 1, name: 'Cement (50kg bags)', stock: 450, minStock: 200, price: 380, unit: 'bag', status: 'good' },
    { id: 2, name: 'Steel TMT Bars (12mm)', stock: 85, minStock: 100, price: 65000, unit: 'ton', status: 'low' },
    { id: 3, name: 'Red Bricks', stock: 15000, minStock: 10000, price: 8, unit: 'piece', status: 'good' },
    { id: 4, name: 'River Sand', stock: 12, minStock: 20, price: 3500, unit: 'ton', status: 'critical' },
    { id: 5, name: 'Plywood (18mm)', stock: 120, minStock: 50, price: 2800, unit: 'sheet', status: 'good' },
    { id: 6, name: 'Paint (20L)', stock: 32, minStock: 40, price: 4500, unit: 'bucket', status: 'low' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Materials</h1>
          <p className="text-slate-600">Track inventory and stock levels</p>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
          <Plus size={20} />
          Add Material
        </button>
      </div>

      {/* Alerts */}
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-500 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Low Stock Alert</h3>
            <p className="text-sm text-red-700">3 materials are below minimum stock levels. Order immediately to avoid delays.</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-3">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search materials..." 
            className="flex-1 outline-none text-slate-900"
          />
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div key={material.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{material.name}</h3>
                <p className="text-sm text-slate-600">₹{material.price.toLocaleString('en-IN')} per {material.unit}</p>
              </div>
              {material.status === 'critical' && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} />
                  Critical
                </span>
              )}
              {material.status === 'low' && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <TrendingDown size={12} />
                  Low
                </span>
              )}
              {material.status === 'good' && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  Good
                </span>
              )}
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Current Stock</span>
                <span className="text-2xl font-bold text-slate-900">{material.stock.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-600">Minimum Stock</span>
                <span className="text-sm font-semibold text-slate-700">{material.minStock.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    material.stock < material.minStock * 0.5 ? 'bg-red-500' :
                    material.stock < material.minStock ? 'bg-amber-500' :
                    'bg-gradient-to-r from-emerald-500 to-emerald-600'
                  }`}
                  style={{ width: `${Math.min((material.stock / material.minStock) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-100 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-200 transition-all text-sm font-medium">
                View Details
              </button>
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
