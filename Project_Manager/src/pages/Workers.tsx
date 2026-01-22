import {Plus, Search, Phone, Mail} from 'lucide-react'

export default function Workers() {
  const workers = [
    { id: 1, name: 'Ramesh Kumar', role: 'Mason', skills: ['Brickwork', 'Plastering'], wage: 800, phone: '+91 98765 43210', attendance: 96 },
    { id: 2, name: 'Suresh Reddy', role: 'Carpenter', skills: ['Woodwork', 'Furniture'], wage: 900, phone: '+91 98765 43211', attendance: 92 },
    { id: 3, name: 'Vijay Singh', role: 'Electrician', skills: ['Wiring', 'Installation'], wage: 1000, phone: '+91 98765 43212', attendance: 98 },
    { id: 4, name: 'Prakash Rao', role: 'Plumber', skills: ['Piping', 'Fixtures'], wage: 950, phone: '+91 98765 43213', attendance: 94 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Workers</h1>
          <p className="text-slate-600">Manage workforce and attendance</p>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
          <Plus size={20} />
          Add Worker
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-3">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search workers by name, role, or skills..." 
            className="flex-1 outline-none text-slate-900"
          />
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <div key={worker.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {worker.name.charAt(0)}
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                {worker.role}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">{worker.name}</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {worker.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={14} className="text-orange-500" />
                {worker.phone}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Daily Wage:</span>
                <span className="font-semibold text-slate-900">₹{worker.wage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Attendance:</span>
                <span className="font-semibold text-emerald-600">{worker.attendance}%</span>
              </div>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-4">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full"
                style={{ width: `${worker.attendance}%` }}
              />
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-100 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-200 transition-all text-sm font-medium">
                View Profile
              </button>
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
