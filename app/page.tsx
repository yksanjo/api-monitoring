'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, XCircle, AlertTriangle, Clock, TrendingUp, TrendingDown, RefreshCw, Eye, Plus } from 'lucide-react';

const apis = [
  { id: 1, name: 'Stripe API', url: 'api.stripe.com', status: 'operational', uptime: 99.99, avgResponse: 145, lastCheck: 'Just now' },
  { id: 2, name: 'Twilio', url: 'api.twilio.com', status: 'operational', uptime: 99.95, avgResponse: 230, lastCheck: 'Just now' },
  { id: 3, name: 'Auth0', url: 'auth0.com', status: 'degraded', uptime: 98.50, avgResponse: 890, lastCheck: 'Just now' },
  { id: 4, name: 'SendGrid', url: 'api.sendgrid.com', status: 'operational', uptime: 99.98, avgResponse: 180, lastCheck: 'Just now' },
  { id: 5, name: 'OpenWeather', url: 'api.openweathermap.org', status: 'down', uptime: 95.20, avgResponse: 0, lastCheck: '2 min ago' },
  { id: 6, name: 'JSONPlaceholder', url: 'jsonplaceholder.typicode.com', status: 'operational', uptime: 100.0, avgResponse: 95, lastCheck: 'Just now' },
];

const statusColors = {
  operational: 'text-green-400',
  degraded: 'text-yellow-400',
  down: 'text-red-400',
};

const statusBg = {
  operational: 'bg-green-400/10',
  degraded: 'bg-yellow-400/10',
  down: 'bg-red-400/10',
};

export default function APIMonitoring() {
  const [monitored, setMonitored] = useState(apis);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const overallUptime = (monitored.reduce((acc, api) => acc + api.uptime, 0) / monitored.length).toFixed(2);
  const operational = monitored.filter(a => a.status === 'operational').length;
  const degraded = monitored.filter(a => a.status === 'degraded').length;
  const down = monitored.filter(a => a.status === 'down').length;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl font-bold">API Monitoring</h1>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <div className="text-slate-400 text-sm">Overall Uptime</div>
            <div className="text-2xl font-bold text-cyan-400">{overallUptime}%</div>
          </div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-400 text-sm">Operational</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{operational}</div>
          </div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">Degraded</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{degraded}</div>
          </div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-slate-400 text-sm">Down</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{down}</div>
          </div>
        </div>

        {/* API List */}
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h2 className="font-semibold">Monitored APIs</h2>
            <button className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
              <Plus className="w-4 h-4" /> Add API
            </button>
          </div>
          <div className="divide-y divide-slate-700">
            {monitored.map((api, i) => (
              <motion.div
                key={api.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 flex items-center justify-between hover:bg-slate-700/50"
              >
                <div className="flex items-center gap-4">
                  {api.status === 'operational' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : api.status === 'degraded' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <div>
                    <div className="font-medium">{api.name}</div>
                    <div className="text-sm text-slate-400">{api.url}</div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-xs text-slate-400">Uptime</div>
                    <div className={`font-semibold ${api.uptime >= 99 ? 'text-green-400' : api.uptime >= 95 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {api.uptime}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">Avg Response</div>
                    <div className="font-semibold">{api.avgResponse > 0 ? `${api.avgResponse}ms` : '-'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">Last Check</div>
                    <div className="text-sm">{api.lastCheck}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusBg[api.status as keyof typeof statusBg]} ${statusColors[api.status as keyof typeof statusColors]}`}>
                    {api.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
