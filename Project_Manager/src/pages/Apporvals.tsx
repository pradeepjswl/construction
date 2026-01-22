import {Check, X, Clock, Package} from 'lucide-react'

export default function Approvals() {
  const requests = [
    {
      id: 1,
      type: 'material',
      item: 'Cement (50kg bags)',
      quantity: 100,
      project: 'Whitefield Villa',
      requestedBy: 'Site Supervisor - Ramesh',
      date: '2024-01-20',
      status: 'pending',
      reason: 'Urgent - Foundation work starting tomorrow'
    },
    {
      id: 2,
      type: 'material',
      item: 'Steel TMT Bars (12mm)',
      quantity: 5,
      project: 'HSR Complex',
      requestedBy: 'Engineer - Suresh',
      date: '2024-01-20',
      status: 'pending',
      reason: 'Column reinforcement required'
    },
    {
      id: 3,
      type: 'equipment',
      item: 'Concrete Mixer',
      quantity: 1,
      project: 'Marathahalli Apartments',
      requestedBy: 'Site Supervisor - Vijay',
      date: '2024-01-19',
      status: 'approved',
      reason: 'Slab casting work'
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Approvals</h1>
        <p className="text-slate-600">Review and approve resource requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <Clock className="text-amber-500" size={32} />
            <span className="text-2xl font-bold text-slate-900">7</span>
          </div>
          <div className="text-sm text-slate-600">Pending Approvals</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <Check className="text-emerald-500" size={32} />
            <span className="text-2xl font-bold text-slate-900">45</span>
          </div>
          <div className="text-sm text-slate-600">Approved This Month</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <X className="text-red-500" size={32} />
            <span className="text-2xl font-bold text-slate-900">3</span>
          </div>
          <div className="text-sm text-slate-600">Rejected</div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{request.item}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                      <span>Quantity: <span className="font-semibold text-slate-900">{request.quantity}</span></span>
                      <span>•</span>
                      <span>{request.project}</span>
                      <span>•</span>
                      <span>{request.requestedBy}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Reason: </span>
                    {request.reason}
                  </p>
                </div>

                <div className="text-xs text-slate-500">
                  Requested on {new Date(request.date).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              <div className="flex lg:flex-col gap-2 lg:min-w-[120px]">
                {request.status === 'pending' ? (
                  <>
                    <button className="flex-1 lg:w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium">
                      <Check size={18} />
                      Approve
                    </button>
                    <button className="flex-1 lg:w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2 font-medium">
                      <X size={18} />
                      Reject
                    </button>
                  </>
                ) : request.status === 'approved' ? (
                  <div className="flex-1 lg:w-full">
                    <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-center font-semibold mb-2">
                      ✓ Approved
                    </div>
                    <button className="w-full bg-slate-100 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-200 transition-all text-sm font-medium">
                      Mark Fulfilled
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
