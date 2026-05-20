import React from 'react';

function Dashboard({ leads, analytics, statusFilter, setStatusFilter, locationSearch, setLocationSearch, onRefresh }) {
  

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/leads/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    onRefresh(); 
  };


  const handleDelete = async (id) => {
  
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
          method: 'DELETE'
        });
        
        if (res.ok) {
          onRefresh();
        } else {
          alert("Failed to delete lead from server.");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
   
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Total Leads</p>
          <p className="text-2xl font-bold mt-1">{analytics.totalLeads}</p>
        </div>
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Conversion Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{analytics.conversionRate}</p>
        </div>
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Deals Won</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{analytics.wonLeads}</p>
        </div>
      </div>

   
      <div className="bg-white p-4 border rounded shadow-sm flex flex-col sm:flex-row gap-4">
        <input 
          type="text" placeholder="Search by city..." value={locationSearch} 
          onChange={(e) => setLocationSearch(e.target.value)}
          className="flex-1 p-2 border rounded text-sm" 
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded text-sm">
          <option value="">All Statuses</option>
          <option value="New Lead">New Lead</option>
          <option value="Contacted">Contacted</option>
          <option value="Site Visit Scheduled">Site Visit Scheduled</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      
      <div className="bg-white border rounded shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 uppercase text-xs font-bold text-gray-600 border-b">
            <tr>
              <th className="p-3">Customer Info</th>
              <th className="p-3">Location</th>
              <th className="p-3">System Size</th>
              <th className="p-3">Status</th>
              <th className="p-3">Update Status</th>
              <th className="p-3 text-center">Actions</th> {/* Added Actions Column Header */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="p-3 font-bold">{lead.full_name}<div className="text-xs font-normal text-gray-500">{lead.email}</div></td>
                <td className="p-3">{lead.location}</td>
                <td className="p-3">{lead.system_size} kW ({lead.property_type})</td>
                <td className="p-3"><span className="p-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded">{lead.status}</span></td>
                <td className="p-3">
                  <select value={lead.status} onChange={(e) => handleStatusChange(lead.id, e.target.value)} className="p-1 border rounded text-xs">
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>
               
                <td className="p-3 text-center">
                  <button 
                    onClick={() => handleDelete(lead.id)}
                    className="px-2 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;