import React, { useState } from 'react'
import {Home, ClipboardList, Users, Package, AlertTriangle, FileText, Menu, X, Mic, Plus} from 'lucide-react'
import Dashboard from './components/Dashboard'
import TasksView from './components/TasksView'
import WorkersView from './components/WorkersView'
import ResourcesView from './components/ResourcesView'
import SafetyView from './components/SafetyView'
import ReportsView from './components/ReportsView'

type ViewType = 'dashboard' | 'tasks' | 'workers' | 'resources' | 'safety' | 'reports'

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { id: 'dashboard' as ViewType, name: 'Dashboard', icon: Home },
    { id: 'tasks' as ViewType, name: 'Tasks', icon: ClipboardList },
    { id: 'workers' as ViewType, name: 'Workers', icon: Users },
    { id: 'resources' as ViewType, name: 'Resources', icon: Package },
    { id: 'safety' as ViewType, name: 'Safety', icon: AlertTriangle },
    { id: 'reports' as ViewType, name: 'Reports', icon: FileText },
  ]

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'tasks':
        return <TasksView />
      case 'workers':
        return <WorkersView />
      case 'resources':
        return <ResourcesView />
      case 'safety':
        return <SafetyView />
      case 'reports':
        return <ReportsView />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SiteOps AI</h1>
              <p className="text-xs text-gray-500">Construction Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Mic size={18} />
              <span className="hidden sm:inline text-sm">Voice Note</span>
            </button>
            <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-57px)] sticky top-[57px]">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsMobileMenuOpen(false)}>
            <aside className="w-64 bg-white h-full" onClick={(e) => e.stopPropagation()}>
              <nav className="p-4 space-y-1 mt-16">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = currentView === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </button>
                  )
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default App
