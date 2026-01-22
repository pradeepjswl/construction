import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Briefcase, BarChart3, DollarSign, Users, CheckCircle, FileText, Bot, Menu, X, LogOut, TrendingUp, Calendar, Layers, Target, PieChart, Activity} from 'lucide-react'

const ManagerDashboard = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  const handleLogout = () => {
    navigate('/')
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'planning', label: 'Project Planning', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'finance', label: 'Financial', icon: DollarSign },
    { id: 'workforce', label: 'Workforce', icon: Users },
    { id: 'approvals', label: 'Approvals', icon: CheckCircle },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'ai', label: 'AI Assistant', icon: Bot },
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
              <h1 className="text-lg font-bold text-[#34495e]">Project Manager</h1>
              <p className="text-xs text-[#7f8c8d]">Multi-Project Dashboard</p>
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
                      activeSection === item.id ? 'bg-[#34495e] text-white' : 'text-[#34495e]'
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
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl bg-[#e0e5ec] p-4"
                   style={{
                     boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                   }}>
                <div className="flex items-center justify-between mb-2">
                  <Layers size={24} className="text-[#34495e]" />
                  <span className="text-xs text-[#27ae60] font-medium">Active</span>
                </div>
                <h3 className="text-2xl font-bold text-[#34495e]">5</h3>
                <p className="text-xs text-[#7f8c8d]">Active Projects</p>
              </div>

              <div className="rounded-2xl bg-[#e0e5ec] p-4"
                   style={{
                     boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                   }}>
                <div className="flex items-center justify-between mb-2">
                  <DollarSign size={24} className="text-[#27ae60]" />
                  <span className="text-xs text-[#27ae60] font-medium">+12%</span>
                </div>
                <h3 className="text-2xl font-bold text-[#34495e]">$2.4M</h3>
                <p className="text-xs text-[#7f8c8d]">Total Budget</p>
              </div>

              <div className="rounded-2xl bg-[#e0e5ec] p-4"
                   style={{
                     boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                   }}>
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp size={24} className="text-[#e67e22]" />
                  <span className="text-xs text-[#27ae60] font-medium">On Track</span>
                </div>
                <h3 className="text-2xl font-bold text-[#34495e]">78%</h3>
                <p className="text-xs text-[#7f8c8d]">Avg Progress</p>
              </div>

              <div className="rounded-2xl bg-[#e0e5ec] p-4"
                   style={{
                     boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                   }}>
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle size={24} className="text-[#27ae60]" />
                  <span className="text-xs text-[#e67e22] font-medium">8 Pending</span>
                </div>
                <h3 className="text-2xl font-bold text-[#34495e]">12</h3>
                <p className="text-xs text-[#7f8c8d]">Approvals</p>
              </div>
            </div>

            {/* Quick Access */}
            <h2 className="text-lg font-bold text-[#34495e] mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setActiveSection('analytics')}
                className="rounded-2xl bg-[#e0e5ec] p-6 transition-all hover:scale-[1.02]"
                style={{
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                }}>
                <div className="w-14 h-14 rounded-xl bg-[#34495e] flex items-center justify-center mx-auto mb-3"
                     style={{
                       boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
                     }}>
                  <BarChart3 size={28} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#34495e] text-center">Analytics</h3>
                <p className="text-xs text-[#7f8c8d] text-center mt-1">View insights</p>
              </button>

              <button
                onClick={() => setActiveSection('finance')}
                className="rounded-2xl bg-[#e0e5ec] p-6 transition-all hover:scale-[1.02]"
                style={{
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                }}>
                <div className="w-14 h-14 rounded-xl bg-[#27ae60] flex items-center justify-center mx-auto mb-3"
                     style={{
                       boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
                     }}>
                  <DollarSign size={28} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#34495e] text-center">Financial</h3>
                <p className="text-xs text-[#7f8c8d] text-center mt-1">Budget & costs</p>
              </button>

              <button
                onClick={() => setActiveSection('approvals')}
                className="rounded-2xl bg-[#e0e5ec] p-6 transition-all hover:scale-[1.02]"
                style={{
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                }}>
                <div className="w-14 h-14 rounded-xl bg-[#e67e22] flex items-center justify-center mx-auto mb-3"
                     style={{
                       boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
                     }}>
                  <CheckCircle size={28} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#34495e] text-center">Approvals</h3>
                <p className="text-xs text-[#7f8c8d] text-center mt-1">Review pending</p>
              </button>

              <button
                onClick={() => setActiveSection('ai')}
                className="rounded-2xl bg-[#e0e5ec] p-6 transition-all hover:scale-[1.02]"
                style={{
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
                }}>
                <div className="w-14 h-14 rounded-xl bg-[#9b59b6] flex items-center justify-center mx-auto mb-3"
                     style={{
                       boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
                     }}>
                  <Bot size={28} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#34495e] text-center">AI Assistant</h3>
                <p className="text-xs text-[#7f8c8d] text-center mt-1">Get insights</p>
              </button>
            </div>

            {/* Project Overview */}
            <h2 className="text-lg font-bold text-[#34495e] mb-4">Project Portfolio</h2>
            <div className="space-y-3">
              {[
                { name: 'Downtown Tower', progress: 85, budget: '$890K', status: 'On Track', color: '#27ae60' },
                { name: 'Riverside Complex', progress: 62, budget: '$1.2M', status: 'Delayed', color: '#e67e22' },
                { name: 'Industrial Park', progress: 45, budget: '$340K', status: 'On Track', color: '#27ae60' },
              ].map((project, idx) => (
                <div key={idx} className="rounded-xl bg-[#e0e5ec] p-4"
                     style={{
                       boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                     }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-[#34495e]">{project.name}</h3>
                      <p className="text-xs text-[#7f8c8d]">Budget: {project.budget}</p>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full" 
                          style={{ backgroundColor: project.color, color: 'white' }}>
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#d1d9e6]">
                    <div className="h-full rounded-full" 
                         style={{ width: `${project.progress}%`, backgroundColor: project.color }}></div>
                  </div>
                  <p className="text-xs text-[#7f8c8d] mt-2">{project.progress}% Complete</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'planning' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Project Planning</h2>
            <p className="text-[#7f8c8d] mb-6">Strategic project planning and scheduling</p>
            <div className="text-center py-12 text-[#7f8c8d]">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p>Project planning interface coming soon...</p>
            </div>
          </div>
        )}

        {activeSection === 'analytics' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Analytics Dashboard</h2>
            <p className="text-[#7f8c8d] mb-6">Gantt charts, budgets, and resource allocation analytics</p>
            <div className="text-center py-12 text-[#7f8c8d]">
              <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
              <p>Analytics dashboard coming soon...</p>
            </div>
          </div>
        )}

        {activeSection === 'finance' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Financial Dashboard</h2>
            <p className="text-[#7f8c8d] mb-6">Budgets, spending, profitability forecasting, and invoice tracking</p>
            <div className="text-center py-12 text-[#7f8c8d]">
              <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
              <p>Financial dashboard coming soon...</p>
            </div>
          </div>
        )}

        {activeSection === 'workforce' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Workforce Management</h2>
            <p className="text-[#7f8c8d] mb-6">Worker profiles, skills tracking, and attendance management</p>
            <div className="text-center py-12 text-[#7f8c8d]">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>Workforce management interface coming soon...</p>
            </div>
          </div>
        )}

        {activeSection === 'approvals' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Approval Workflows</h2>
            <p className="text-[#7f8c8d] mb-6">Review and approve requests across projects</p>
            <div className="text-center py-12 text-[#7f8c8d]">
              <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Approval workflows coming soon...</p>
            </div>
          </div>
        )}

        {activeSection === 'reports' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">Report Generation</h2>
            <p className="text-[#7f8c8d] mb-6">Customizable PDF reports for projects and finances</p>
            <div className="text-center py-12 text-[#7f8c8d]">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>Report generation interface coming soon...</p>
            </div>
          </div>
        )}

        {activeSection === 'ai' && (
          <div>
            <h2 className="text-xl font-bold text-[#34495e] mb-4">AI Assistant</h2>
            <p className="text-[#7f8c8d] mb-6">AI-powered decision support and insights</p>
            <div className="text-center py-12 text-[#7f8c8d]">
              <Bot size={48} className="mx-auto mb-4 opacity-50" />
              <p>AI assistant interface coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ManagerDashboard
