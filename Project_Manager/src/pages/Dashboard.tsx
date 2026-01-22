import {TrendingUp, AlertTriangle, Clock, IndianRupee, Users, Briefcase, Target, Activity} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts'

export default function Dashboard() {
  const stats = [
    { 
      label: 'Active Projects', 
      value: '3', 
      change: 'Across all sites',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Total Budget', 
      value: '₹4.55Cr', 
      change: '₹2.71Cr spent',
      icon: IndianRupee,
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      label: 'Active Workers', 
      value: '48', 
      change: '94% attendance',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Pending Tasks', 
      value: '12', 
      change: '5 high priority',
      icon: Clock,
      color: 'from-orange-500 to-amber-500'
    },
  ]

  // Minimal project data
  const projects = [
    { name: 'Villa - Whitefield', progress: 78, status: 'On Track', spent: 66, budget: 85 },
    { name: 'Complex - HSR', progress: 45, status: 'At Risk', spent: 130, budget: 250 },
    { name: 'Apartments', progress: 92, status: 'Ahead', spent: 105, budget: 120 },
  ]

  // Budget distribution data for pie chart
  const budgetData = [
    { name: 'Labor', value: 35, color: '#f97316' },
    { name: 'Materials', value: 42, color: '#10b981' },
    { name: 'Equipment', value: 15, color: '#3b82f6' },
    { name: 'Other', value: 8, color: '#a855f7' },
  ]

  // Weekly spend trend
  const spendTrend = [
    { week: 'W1', amount: 18 },
    { week: 'W2', amount: 25 },
    { week: 'W3', amount: 32 },
    { week: 'W4', amount: 28 },
  ]

  // Project comparison for bar chart
  const projectComparison = projects.map(p => ({
    name: p.name.split(' - ')[0],
    budget: p.budget,
    spent: p.spent
  }))

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Activity className="text-orange-500" size={40} />
              Executive Dashboard
            </h1>
            <p className="text-slate-300 text-lg">Real-time construction insights at a glance</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Overall Progress</div>
            <div className="text-5xl font-bold text-orange-500">72%</div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="text-white" size={28} />
              </div>
              <TrendingUp className="text-emerald-500 group-hover:scale-125 transition-transform" size={22} />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
            <div className="text-sm font-semibold text-slate-700 mb-1">{stat.label}</div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Target size={24} className="text-orange-500" />
              Budget Distribution
            </h2>
            <span className="text-sm text-slate-500">Current allocation</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: 'white' }}
                formatter={(value) => [`${value}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {budgetData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-slate-700 font-medium">{item.name}</span>
                <span className="text-sm text-slate-500 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Spend Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity size={24} className="text-orange-500" />
              Weekly Spend Trend
            </h2>
            <span className="text-sm text-emerald-600 font-semibold">↓ 12% vs last month</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={spendTrend}>
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: 'white' }}
                formatter={(value) => [`₹${value}L`, 'Spent']}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#f97316" 
                strokeWidth={3}
                dot={{ fill: '#f97316', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Budget Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase size={24} className="text-orange-500" />
              Project Budget Analysis
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={projectComparison}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: 'white' }}
                formatter={(value) => [`₹${value}L`, '']}
              />
              <Legend />
              <Bar dataKey="budget" fill="#10b981" radius={[8, 8, 0, 0]} name="Budget" />
              <Bar dataKey="spent" fill="#f97316" radius={[8, 8, 0, 0]} name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Progress Cards */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Target size={24} className="text-orange-500" />
            Active Projects
          </h2>
          <div className="space-y-5">
            {projects.map((project) => (
              <div key={project.name} className="group border-2 border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">{project.name}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-slate-600">₹{project.spent}L / ₹{project.budget}L</span>
                      <span className={`
                        px-2 py-0.5 rounded-full text-xs font-bold
                        ${project.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${project.status === 'At Risk' ? 'bg-red-100 text-red-700' : ''}
                        ${project.status === 'Ahead' ? 'bg-blue-100 text-blue-700' : ''}
                      `}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-500">{project.progress}%</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500 group-hover:shadow-lg"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <div className="flex items-start gap-4">
          <AlertTriangle className="text-orange-500 flex-shrink-0 mt-1" size={28} />
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Attention Required</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-slate-700"><strong>HSR Complex:</strong> Budget variance +₹8L - Review required</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-slate-700"><strong>Equipment:</strong> Excavator scheduled for 2 sites tomorrow</span>
              </div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-xl transition-all whitespace-nowrap">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
