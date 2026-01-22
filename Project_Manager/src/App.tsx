import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Project'
import ProjectDetails from './pages/ProjectDetails'
import Financial from './pages/Financial'
import Workers from './pages/Workers'
import Materials from './pages/Materials'
import Approvals from './pages/Apporvals'
import Reports from './pages/Reports'
import AIAssistant from './pages/AIAssistant'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="financial" element={<Financial />} />
            <Route path="workers" element={<Workers />} />
            <Route path="materials" element={<Materials />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="reports" element={<Reports />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </>
  )
}

export default App
