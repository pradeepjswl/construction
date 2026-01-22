import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {HardHat, ClipboardList, Mic, FileText, MapPin, SquareCheck as CheckSquare, Package, Users, AlertTriangle, Send, Menu, X, LogOut, Camera, TrendingUp, Clock, Battery} from 'lucide-react'
import DPRForm from '../components/DPRForm'
import VoiceRecorder from '../components/VoiceRecorder'
import TaskManager from '../components/TaskManager'
import ResourceManager from '../components/ResourceManager'
import SafetyReporter from '../components/SafetyReporter'
import ResourceRequestForm from '../components/ResourceRequestForm'
import WorkerManager from '../components/WorkerManager'

const SupervisorDashboard = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  const handleLogout = () => {
    navigate('/')
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: HardHat },
    { id: 'dpr', label: 'Daily Report', icon: FileText },
    { id: 'voice', label: 'Voice Notes', icon: Mic },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'resources', label: 'Resources', icon: Package },
    { id: 'workers', label: 'Workers', icon: Users },
    { id: 'safety', label: 'Safety', icon: AlertTriangle },
    { id: 'requests', label: 'Requests', icon: Send },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e5ec] via-[#d1d9e6] to-[#e0e5ec]">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-[#e0e5ec] px-4 py-4"
              style={{
                boxShadow: '0 4px 12px rgba(163, 177, 198, 0.4)'
              }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl bg-[#e0e5ec] flex items-center justify-center"
              style={{
                boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
              }}>
              {menuOpen ? <X size={20} className="text-[#34495e]" /> : <Menu size={20} className="text-[#34495e]" />}
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#34495e]">Site Supervisor</h1>
              <p className="text-xs text-[#7f8c8d]">Construction Site A</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded-xl bg-[#e0e5ec] flex items-center justify-center"
            style={{
              boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
            }}>
            <LogOut size={18} className="text-[#e74c3c]" />
          </button>
        </div>
      </header>

      {/* Side Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}>
          <div className="w-64 h-full bg-[#e0e5ec] p-4"
               onClick={(e) => e.stopPropagation()}
               style={{
                 boxShadow: '8px 0 24px rgba(163, 177, 198, 0.6)'
               }}>
            <nav className="space-y-2 mt-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === item.id ? 'bg-[#e67e22] text-white' : 'text-[#34495e]'
                    }`}
                    style={activeSection !== item.id ? {
                      boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                    } : {}}>
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 pb-20">
        {activeSection === 'overview' && (
          <div>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl bg-[#e0e5ec] p-4"
                   style={{
                     boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                   }}>
                <div className="flex items-center justify-between mb-2">
                  <Clock size={24} className="text-[#e67e22]" />
                  <span className="text-xs text-[#27ae60] font-medium">On Time</span>
                </div>
                <h3 className="text-2xl font-bold text-[#34495e]">8:45 AM</h3>
                <p className="text-xs text-[#7f8c8d]">Check-in Time</p>
              </div>

              <div className="rounded-2xl bg-[#e0e5ec] p-4"
                   style={{
                     boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                   }}>
                <div className="flex items-center justify-between mb-2">
                  <Users size={24} className="text-[#34495e]" />
                  <span className="text-xs text-[#27ae60] font-medium">+5</span>
                </div>
                <h3 className="text-2xl font-bold text-[#34495e]">42</h3>
                <p className="text-xs text-[#7f8c8d]">Workers Present</p>
              </div>

              <div className="rounded-2xl bg-[#e0e5ec] p-4"
                   style={{
                     boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                   }}>
                <div className="flex items-center justify-between mb-2">
                  <CheckSquare size={24} className="text-[#27ae60]" />
                  <span className="text-xs text-[#e67e22] font-medium">3 Pending</span>
                </div>
                <h3 className="text-2xl font-bold text-[#34495e]">12/15</h3>
                <p className="text-xs text-[#7f8c8d]">Tasks Complete</p>
              </div>

              <div className="rounded-2xl bg-[#e0e5ec] p-4"
                   style={{
                     boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                   }}>
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle size={24} className="text-[#e74c3c]" />
                  <span className="text-xs text-[#e74c3c] font-medium">Action</span>
                </div>
                <h3 className="text-2xl font-bold text-[#34495e]">2</h3>
                <p className="text-xs text-[#7f8c8d]">Safety Alerts</p>
              </div>
            </div>

            {/* Quick Actions */}
            <h2 className="text-lg font-bold text-[#34495e] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setActiveSection('voice')}
                className="rounded-2xl bg-[#e0e5ec] p-6 transition-all hover:scale-[1.02]"
                style={{
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                }}>
                <div className="w-14 h-14 rounded-xl bg-[#e67e22] flex items-center justify-center mx-auto mb-3"
                     style={{
                       boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
                     }}>
                  <Mic size={28} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#34495e] text-center">Voice Note</h3>
                <p className="text-xs text-[#7f8c8d] text-center mt-1">Quick report</p>
              </button>

              <button
                onClick={() => setActiveSection('dpr')}
                className="rounded-2xl bg-[#e0e5ec] p-6 transition-all hover:scale-[1.02]"
                style={{
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                }}>
                <div className="w-14 h-14 rounded-xl bg-[#34495e] flex items-center justify-center mx-auto mb-3"
                     style={{
                       boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
                     }}>
                  <FileText size={28} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#34495e] text-center">Submit DPR</h3>
                <p className="text-xs text-[#7f8c8d] text-center mt-1">Daily report</p>
              </button>

              <button
                onClick={() => setActiveSection('safety')}
                className="rounded-2xl bg-[#e0e5ec] p-6 transition-all hover:scale-[1.02]"
                style={{
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                }}>
                <div className="w-14 h-14 rounded-xl bg-[#e74c3c] flex items-center justify-center mx-auto mb-3"
                     style={{
                       boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
                     }}>
                  <AlertTriangle size={28} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#34495e] text-center">Report Hazard</h3>
                <p className="text-xs text-[#7f8c8d] text-center mt-1">Safety first</p>
              </button>

              <button
                onClick={() => setActiveSection('tasks')}
                className="rounded-2xl bg-[#e0e5ec] p-6 transition-all hover:scale-[1.02]"
                style={{
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                }}>
                <div className="w-14 h-14 rounded-xl bg-[#27ae60] flex items-center justify-center mx-auto mb-3"
                     style={{
                       boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
                     }}>
                  <CheckSquare size={28} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#34495e] text-center">Create Task</h3>
                <p className="text-xs text-[#7f8c8d] text-center mt-1">Assign work</p>
              </button>
            </div>

            {/* Recent Activity */}
            <h2 className="text-lg font-bold text-[#34495e] mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { icon: Camera, text: 'Material delivery photo logged', time: '10 mins ago', color: '#27ae60' },
                { icon: AlertTriangle, text: 'Safety inspection completed', time: '1 hour ago', color: '#e67e22' },
                { icon: CheckSquare, text: 'Foundation work task completed', time: '2 hours ago', color: '#34495e' },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="rounded-xl bg-[#e0e5ec] p-4 flex items-center space-x-4"
                       style={{
                         boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                       }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color }}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#34495e]">{item.text}</p>
                      <p className="text-xs text-[#7f8c8d]">{item.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeSection === 'dpr' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Daily Progress Report</h2>
            <p className="text-[#7f8c8d] mb-6">Submit comprehensive daily report with work summary, weather, safety, and materials</p>
            <DPRForm />
          </div>
        )}

        {activeSection === 'voice' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">AI Voice Notes</h2>
            <p className="text-[#7f8c8d] mb-6">Record voice notes with auto-transcription for quick reporting</p>
            <VoiceRecorder />
          </div>
        )}

        {activeSection === 'tasks' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Task Management</h2>
            <p className="text-[#7f8c8d] mb-6">Create and track AI/Manual tasks with assignments</p>
            <TaskManager />
          </div>
        )}

        {activeSection === 'resources' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Resource Management</h2>
            <p className="text-[#7f8c8d] mb-6">Track material arrivals, stock levels with photo logs and AI suggestions</p>
            <ResourceManager />
          </div>
        )}

        {activeSection === 'workers' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Worker Management</h2>
            <p className="text-[#7f8c8d] mb-6">Geofenced attendance, assignments, and skills tracking</p>
            <WorkerManager />
          </div>
        )}

        {activeSection === 'safety' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Safety & Compliance</h2>
            <p className="text-[#7f8c8d] mb-6">Hazard reporting with photos, AI detection, and geofence alerts</p>
            <SafetyReporter />
          </div>
        )}

        {activeSection === 'requests' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Resource Requests</h2>
            <p className="text-[#7f8c8d] mb-6">Track resource requests with status updates</p>
            <ResourceRequestForm />
          </div>
        )}
      </main>
    </div>
  )
}

export default SupervisorDashboard