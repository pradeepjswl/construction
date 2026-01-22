import React, { useState } from 'react'
import {Plus, Sparkles, Filter, Search} from 'lucide-react'

const TasksView = () => {
  const [filter, setFilter] = useState('all')

  const tasks = [
    { id: 1, title: 'Foundation Reinforcement', category: 'Construction', priority: 'high', status: 'in-progress', progress: 65, assignedTo: 'Rajesh Team', dueDate: '2025-01-18' },
    { id: 2, title: 'Electrical Wiring - Floor 1', category: 'Electrical', priority: 'medium', status: 'pending', progress: 0, assignedTo: 'Unassigned', dueDate: '2025-01-20' },
    { id: 3, title: 'Plumbing Installation', category: 'Plumbing', priority: 'high', status: 'in-progress', progress: 40, assignedTo: 'Kumar Team', dueDate: '2025-01-19' },
    { id: 4, title: 'Safety Equipment Check', category: 'Safety', priority: 'critical', status: 'pending', progress: 0, assignedTo: 'Safety Officer', dueDate: '2025-01-17' },
    { id: 5, title: 'Paint Exterior Walls', category: 'Finishing', priority: 'low', status: 'completed', progress: 100, assignedTo: 'Paint Crew', dueDate: '2025-01-16' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-amber-100 text-amber-700'
      case 'blocked': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
          <p className="text-gray-600 mt-1">Manage and track construction tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Sparkles size={18} />
            <span className="text-sm font-medium">AI Generate</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            <span className="text-sm font-medium">New Task</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Category:</span> {task.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Due:</span> {task.dueDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Assigned:</span> {task.assignedTo}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span className="font-medium">{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TasksView
