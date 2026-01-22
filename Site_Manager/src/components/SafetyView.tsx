import React from 'react'
import {AlertTriangle, Shield, Camera, MapPin} from 'lucide-react'

const SafetyView = () => {
  const hazards = [
    { id: 1, title: 'Missing Safety Harness', severity: 'critical', location: 'Floor 3 - East Wing', reportedBy: 'Rajesh Kumar', time: '10:45 AM', status: 'open', description: 'Worker observed at height without harness' },
    { id: 2, title: 'Exposed Electrical Wiring', severity: 'high', location: 'Ground Floor - Panel Room', reportedBy: 'Amit Singh', time: '09:30 AM', status: 'in-progress', description: 'Live wires exposed near work area' },
    { id: 3, title: 'Uneven Flooring', severity: 'medium', location: 'Floor 2 - Corridor', reportedBy: 'Suresh Patel', time: 'Yesterday', status: 'resolved', description: 'Trip hazard identified and marked' },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-300'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-700'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700'
      case 'resolved':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Safety & Compliance</h2>
          <p className="text-gray-600 mt-1">Report and track safety hazards</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <AlertTriangle size={18} />
          <span className="text-sm font-medium">Report Hazard</span>
        </button>
      </div>

      {/* Safety Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-green-600">0</span>
          </div>
          <p className="text-sm text-gray-600">Days Since Incident</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="text-red-600" size={24} />
            <span className="text-2xl font-bold text-red-600">2</span>
          </div>
          <p className="text-sm text-gray-600">Active Hazards</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-blue-600" size={24} />
            <span className="text-2xl font-bold text-blue-600">1</span>
          </div>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-green-600">12</span>
          </div>
          <p className="text-sm text-gray-600">Resolved This Week</p>
        </div>
      </div>

      {/* Hazards List */}
      <div className="space-y-4">
        {hazards.map((hazard) => (
          <div key={hazard.id} className="bg-white rounded-lg border-2 border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{hazard.title}</h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded border-2 ${getSeverityColor(hazard.severity)}`}>
                    {hazard.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{hazard.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {hazard.location}
                  </span>
                  <span>Reported by: {hazard.reportedBy}</span>
                  <span>{hazard.time}</span>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded ${getStatusBadge(hazard.status)}`}>
                {hazard.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            {hazard.status !== 'resolved' && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Update Status
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
                  <Camera size={16} />
                  Add Photo
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SafetyView
