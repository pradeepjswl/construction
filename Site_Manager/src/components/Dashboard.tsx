import React from 'react'
import {Users, ClipboardCheck, Package, AlertTriangle, TrendingUp, Clock} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { label: 'Workers Present', value: '24/30', icon: Users, color: 'bg-blue-500', change: '+2' },
    { label: 'Tasks Completed', value: '12/18', icon: ClipboardCheck, color: 'bg-green-500', change: '+3' },
    { label: 'Materials Stock', value: '87%', icon: Package, color: 'bg-purple-500', change: '-5%' },
    { label: 'Safety Alerts', value: '2', icon: AlertTriangle, color: 'bg-red-500', change: 'Active' },
  ]

  const recentActivity = [
    { time: '09:15 AM', action: 'Worker Check-in', detail: 'Rajesh Kumar clocked in', status: 'success' },
    { time: '09:30 AM', action: 'Material Received', detail: '500 kg cement arrived', status: 'info' },
    { time: '10:00 AM', action: 'Task Completed', detail: 'Foundation pouring finished', status: 'success' },
    { time: '10:45 AM', action: 'Safety Alert', detail: 'Harness check required', status: 'warning' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Good Morning, Supervisor</h2>
        <p className="text-blue-100">Here's what's happening on your site today</p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <Clock size={16} />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.detail}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors text-left">
          <TrendingUp className="text-blue-600 mb-2" size={24} />
          <p className="font-medium text-gray-900">Generate DPR</p>
          <p className="text-xs text-gray-600 mt-1">Daily Progress Report</p>
        </button>
        <button className="bg-white border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors text-left">
          <ClipboardCheck className="text-green-600 mb-2" size={24} />
          <p className="font-medium text-gray-900">Create Task</p>
          <p className="text-xs text-gray-600 mt-1">Assign work to team</p>
        </button>
        <button className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:border-purple-400 transition-colors text-left">
          <Package className="text-purple-600 mb-2" size={24} />
          <p className="font-medium text-gray-900">Log Materials</p>
          <p className="text-xs text-gray-600 mt-1">Record inventory</p>
        </button>
        <button className="bg-white border-2 border-red-200 rounded-lg p-4 hover:border-red-400 transition-colors text-left">
          <AlertTriangle className="text-red-600 mb-2" size={24} />
          <p className="font-medium text-gray-900">Report Hazard</p>
          <p className="text-xs text-gray-600 mt-1">Safety incident</p>
        </button>
      </div>
    </div>
  )
}

export default Dashboard
