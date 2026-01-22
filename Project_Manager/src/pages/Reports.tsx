import {FileText, Download, Calendar} from 'lucide-react'

export default function Reports() {
  const reports = [
    { name: 'Monthly Financial Summary', date: '2024-01-20', type: 'Financial', size: '2.4 MB' },
    { name: 'Worker Attendance Report', date: '2024-01-18', type: 'Workforce', size: '1.8 MB' },
    { name: 'Project Progress Overview', date: '2024-01-15', type: 'Projects', size: '3.1 MB' },
    { name: 'Materials Usage Analysis', date: '2024-01-12', type: 'Resources', size: '2.2 MB' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports</h1>
        <p className="text-slate-600">Generate and download custom reports</p>
      </div>

      {/* Generate Report Card */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-3">Generate Custom Report</h2>
        <p className="mb-6 opacity-90">Select sections and download comprehensive project reports</p>
        <button className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2">
          <FileText size={20} />
          Create New Report
        </button>
      </div>

      {/* Report Templates */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2">{report.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(report.date).toLocaleDateString('en-IN')}
                    </span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                  <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium flex items-center gap-2">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
