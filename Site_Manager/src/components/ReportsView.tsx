import React from 'react'
import {FileText, Download, Mic, Calendar} from 'lucide-react'

const ReportsView = () => {
  const reports = [
    { id: 1, date: '2025-01-16', type: 'Daily Progress Report', createdBy: 'Supervisor', method: 'Voice Note', status: 'completed' },
    { id: 2, date: '2025-01-15', type: 'Daily Progress Report', createdBy: 'Supervisor', method: 'Manual', status: 'completed' },
    { id: 3, date: '2025-01-14', type: 'Daily Progress Report', createdBy: 'Supervisor', method: 'Voice Note', status: 'completed' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Daily Reports</h2>
          <p className="text-gray-600 mt-1">View and generate progress reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Mic size={18} />
          <span className="text-sm font-medium">Voice Note DPR</span>
        </button>
      </div>

      {/* Create New Report */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Create Today's Report</h3>
        <p className="text-blue-100 mb-4">Record your daily progress in 2 minutes with AI voice notes</p>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            <Mic size={20} />
            Record Voice Note
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
            <FileText size={20} />
            Manual Entry
          </button>
        </div>
      </div>

      {/* Report Template Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">DPR Template Includes:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">Work Summary</p>
              <p className="text-sm text-gray-600">Tasks completed today</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">Weather Conditions</p>
              <p className="text-sm text-gray-600">Temperature, rainfall, etc.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">Workers Present</p>
              <p className="text-sm text-gray-600">Attendance count & names</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">Materials Used</p>
              <p className="text-sm text-gray-600">Quantities consumed</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">Safety Incidents</p>
              <p className="text-sm text-gray-600">Hazards & resolutions</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">Photo Documentation</p>
              <p className="text-sm text-gray-600">Progress images</p>
            </div>
          </div>
        </div>
      </div>

      {/* Past Reports */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Past Reports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{report.type}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {report.date}
                      </span>
                      <span>Created by: {report.createdBy}</span>
                      {report.method === 'Voice Note' && (
                        <span className="flex items-center gap-1 text-purple-600">
                          <Mic size={14} />
                          {report.method}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download size={16} />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReportsView
