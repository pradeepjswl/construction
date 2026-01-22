import {Plus, Search, MapPin, Calendar, IndianRupee} from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: 'Residential Villa - Whitefield',
      client: 'Mr. Rajesh Kumar',
      location: 'Whitefield, Bangalore',
      budget: 8500000,
      spent: 6630000,
      progress: 78,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      status: 'active'
    },
    {
      id: 2,
      name: 'Commercial Complex - HSR Layout',
      client: 'HSR Developers Pvt Ltd',
      location: 'HSR Layout, Bangalore',
      budget: 25000000,
      spent: 13000000,
      progress: 45,
      startDate: '2023-11-01',
      endDate: '2024-08-15',
      status: 'active'
    },
    {
      id: 3,
      name: 'Apartment Block - Marathahalli',
      client: 'Green Homes Ltd',
      location: 'Marathahalli, Bangalore',
      budget: 12000000,
      spent: 10500000,
      progress: 92,
      startDate: '2023-09-01',
      endDate: '2024-03-31',
      status: 'active'
    },
  ]

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Projects</h1>
          <p className="text-slate-600">Manage all construction projects</p>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-3">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search projects by name, client, or location..." 
            className="flex-1 outline-none text-slate-900"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{project.name}</h3>
                <p className="text-slate-600 text-sm">{project.client}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                Active
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={16} className="text-orange-500" />
                {project.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar size={16} className="text-orange-500" />
                {new Date(project.startDate).toLocaleDateString('en-IN')} - {new Date(project.endDate).toLocaleDateString('en-IN')}
              </div>
            </div>

            {/* Budget Info */}
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Budget</span>
                <span className="font-semibold text-slate-900">{formatCurrency(project.budget)}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-600">Spent</span>
                <span className="font-semibold text-slate-900">{formatCurrency(project.spent)}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full"
                  style={{ width: `${(project.spent / project.budget) * 100}%` }}
                />
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Project Progress</span>
                <span className="font-semibold text-slate-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-100 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-200 transition-all font-medium">
                View Details
              </button>
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
