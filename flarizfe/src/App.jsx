import React, { useState, useEffect } from 'react';
import LeadForm from './LeadForm';
import Dashboard from './Dashboard';

function App() {
  
  const [view, setView] = useState('dashboard');

  
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState({ totalLeads: 0, conversionRate: '0%', wonLeads: 0 });

 
  const [statusFilter, setStatusFilter] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  
  const fetchLeads = async () => {
    let url = 'http://localhost:5000/api/leads';
    let params = [];
    if (statusFilter) params.push(`status=${statusFilter}`);
    if (locationSearch) params.push(`location=${locationSearch}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    const res = await fetch(url);
    const data = await res.json();
    setLeads(data);
  };

  
  const fetchAnalytics = async () => {
    const res = await fetch('http://localhost:5000/api/analytics');
    const data = await res.json();
    setAnalytics(data);
  };


  const loadData = () => {
    fetchLeads();
    fetchAnalytics();
  };


  useEffect(() => {
    loadData();
  }, [statusFilter, locationSearch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
     
      <div className="bg-white p-4 max-w-7xl mx-auto rounded shadow-sm mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Solar CRM Dashboard</h1>
        <div className="space-x-2">
          <button onClick={() => setView('dashboard')} className="px-3 py-1 bg-gray-200 text-sm font-semibold rounded">Dashboard</button>
          <button onClick={() => setView('form')} className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded">Add Lead</button>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto">
        {view === 'dashboard' ? (
          <Dashboard 
            leads={leads} 
            analytics={analytics} 
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            locationSearch={locationSearch} setLocationSearch={setLocationSearch}
            onRefresh={loadData}
          />
        ) : (
          <LeadForm onSuccess={() => { loadData(); setView('dashboard'); }} />
        )}
      </div>
    </div>
  );
}

export default App;