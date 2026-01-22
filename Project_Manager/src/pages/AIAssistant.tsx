import {Bot, Send, Plus} from 'lucide-react'

export default function AIAssistant() {
  const conversations = [
    { id: 1, title: 'Budget optimization tips', date: '2024-01-20' },
    { id: 2, title: 'Material ordering schedule', date: '2024-01-18' },
    { id: 3, title: 'Worker allocation planning', date: '2024-01-15' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Assistant</h1>
        <p className="text-slate-600">Get intelligent help with project management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-4">
          <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold mb-4">
            <Plus size={20} />
            New Chat
          </button>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div key={conv.id} className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-all">
                <h4 className="font-medium text-slate-900 text-sm mb-1">{conv.title}</h4>
                <p className="text-xs text-slate-500">{new Date(conv.date).toLocaleDateString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg flex flex-col" style={{ height: '600px' }}>
          {/* Chat Header */}
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Construction AI Assistant</h3>
                <p className="text-sm text-slate-600">Ask me anything about your projects</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white" size={16} />
                </div>
                <div className="bg-slate-100 rounded-lg p-4 max-w-lg">
                  <p className="text-slate-900">
                    Hello! I'm your AI construction management assistant. I can help you with:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    <li>• Budget optimization and cost analysis</li>
                    <li>• Project planning and scheduling</li>
                    <li>• Resource allocation recommendations</li>
                    <li>• Risk identification and mitigation</li>
                  </ul>
                  <p className="mt-3 text-slate-900">What would you like help with today?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Ask about budgets, schedules, resources..." 
                className="flex-1 bg-slate-100 px-4 py-3 rounded-lg outline-none text-slate-900"
              />
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
