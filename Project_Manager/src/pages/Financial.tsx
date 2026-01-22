import {TrendingDown, TrendingUp, DollarSign, AlertCircle, FileText, Download, Plus, Eye} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import { useState } from 'react'

export default function Financial() {
  const [showGSTInvoice, setShowGSTInvoice] = useState(false)

  // Minimal budget data
  const budgetCategories = [
    { name: 'Labor', budget: 120, spent: 95, percentage: 79, color: '#f97316' },
    { name: 'Materials', budget: 180, spent: 152, percentage: 84, color: '#10b981' },
    { name: 'Equipment', budget: 50, spent: 38, percentage: 76, color: '#3b82f6' },
    { name: 'Overhead', budget: 30, spent: 29, percentage: 97, color: '#a855f7' },
  ]

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)
  const remaining = totalBudget - totalSpent

  // Minimal invoice data
  const invoices = [
    { id: 'GST-2024-001', client: 'Mr. Rajesh Kumar', amount: 85, gst: 15.3, total: 100.3, status: 'paid', date: '2024-01-15' },
    { id: 'GST-2024-002', client: 'HSR Developers', amount: 250, gst: 45, total: 295, status: 'overdue', date: '2024-01-10' },
  ]

  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(1)}L`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial Management</h1>
          <p className="text-slate-600">Track budgets, expenses, and GST-compliant invoicing</p>
        </div>
        <button 
          onClick={() => setShowGSTInvoice(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Create GST Invoice
        </button>
      </div>

      {/* Summary Cards - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <DollarSign size={36} />
            <TrendingUp size={22} className="opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{formatCurrency(totalBudget)}</div>
          <div className="text-blue-100 text-sm font-medium">Total Budget</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <TrendingDown size={36} />
            <span className="text-sm opacity-80">{Math.round((totalSpent/totalBudget)*100)}% used</span>
          </div>
          <div className="text-3xl font-bold mb-1">{formatCurrency(totalSpent)}</div>
          <div className="text-orange-100 text-sm font-medium">Total Spent</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <AlertCircle size={36} />
            <span className="text-sm opacity-80">Available</span>
          </div>
          <div className="text-3xl font-bold mb-1">{formatCurrency(remaining)}</div>
          <div className="text-emerald-100 text-sm font-medium">Remaining</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <FileText size={36} />
            <TrendingUp size={22} className="opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">18%</div>
          <div className="text-purple-100 text-sm font-medium">Profit Margin</div>
        </div>
      </div>

      {/* Visual Budget Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Budget Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign size={24} className="text-orange-500" />
            Spend Distribution by Category
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={budgetCategories}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                dataKey="spent"
                label={(entry) => `${entry.name}: ${formatCurrency(entry.spent)}`}
              >
                {budgetCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: 'white' }}
                formatter={(value: number) => [formatCurrency(value), 'Spent']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Budget vs Spent */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-orange-500" />
            Budget vs Actual Comparison
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={budgetCategories}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: 'white' }}
                formatter={(value: number) => [formatCurrency(value), '']}
              />
              <Legend />
              <Bar dataKey="budget" fill="#10b981" radius={[8, 8, 0, 0]} name="Budget" />
              <Bar dataKey="spent" fill="#f97316" radius={[8, 8, 0, 0]} name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Bars - Detailed View */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Detailed Budget Breakdown</h2>
        <div className="space-y-6">
          {budgetCategories.map((category) => (
            <div key={category.name} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="font-bold text-slate-900">{category.name}</span>
                  <span className="text-sm text-slate-600">
                    {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                  </span>
                </div>
                <span className={`font-bold text-lg ${category.percentage > 90 ? 'text-red-500' : 'text-slate-900'}`}>
                  {category.percentage}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 group-hover:shadow-lg`}
                  style={{ 
                    width: `${category.percentage}%`,
                    backgroundColor: category.percentage > 90 ? '#ef4444' : category.color
                  }}
                />
              </div>
              {category.percentage > 90 && (
                <p className="text-xs text-red-600 mt-1 font-medium">⚠️ Exceeding budget threshold</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* GST Invoices Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText size={24} className="text-orange-500" />
            GST Invoices
          </h2>
          <div className="flex gap-3">
            <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-all flex items-center gap-2 font-medium">
              <Download size={18} />
              Export All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50">
                <th className="text-left py-4 px-4 text-sm font-bold text-slate-700">Invoice No.</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-slate-700">Client</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-slate-700">Base Amount</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-slate-700">GST (18%)</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-slate-700">Total</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-slate-700">Date</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-slate-700">Status</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">{invoice.id}</td>
                  <td className="py-4 px-4 text-slate-700">{invoice.client}</td>
                  <td className="py-4 px-4 font-semibold text-slate-900">{formatCurrency(invoice.amount)}</td>
                  <td className="py-4 px-4 text-slate-600">{formatCurrency(invoice.gst)}</td>
                  <td className="py-4 px-4 font-bold text-orange-600 text-lg">{formatCurrency(invoice.total)}</td>
                  <td className="py-4 px-4 text-slate-600">{new Date(invoice.date).toLocaleDateString('en-IN')}</td>
                  <td className="py-4 px-4">
                    <span className={`
                      px-3 py-1.5 rounded-full text-xs font-bold
                      ${invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : ''}
                      ${invoice.status === 'overdue' ? 'bg-red-100 text-red-700 animate-pulse' : ''}
                      ${invoice.status === 'sent' ? 'bg-blue-100 text-blue-700' : ''}
                    `}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1">
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GST Invoice Creation Modal */}
      {showGSTInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="text-orange-500" size={28} />
                Create GST Invoice
              </h3>
              <button 
                onClick={() => setShowGSTInvoice(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Client Name</label>
                  <input type="text" className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">GSTIN</label>
                  <input type="text" placeholder="22AAAAA0000A1Z5" className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Project Name</label>
                <input type="text" className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Base Amount (₹)</label>
                  <input type="number" className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">GST Rate (%)</label>
                  <select className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:outline-none">
                    <option>18%</option>
                    <option>12%</option>
                    <option>5%</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea rows={3} className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:outline-none" />
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600">Base Amount:</span>
                  <span className="font-semibold">₹0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600">GST (18%):</span>
                  <span className="font-semibold">₹0.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-slate-300">
                  <span className="text-slate-900 font-bold text-lg">Total Amount:</span>
                  <span className="font-bold text-orange-600 text-xl">₹0.00</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowGSTInvoice(false)} className="flex-1 border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all">
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
