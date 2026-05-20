import React from 'react'

function Dashboard() {
  return (
   <>

   <div className="space-y-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      
        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Leads</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">12</p>
        </div>
       
        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Conversion Rate</p>
          <p className="text-2xl font-bold mt-1 text-green-600">25.0%</p>
        </div>
     
        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Deals Closed (Won)</p>
          <p className="text-2xl font-bold mt-1 text-blue-600">3</p>
        </div>
      </div>

   
      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Search City Location</label>
          <input 
            type="text" 
            placeholder="Type city name..." 
            className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" 
          />
        </div>
        <div className="w-full sm:w-48">
          <label className="block text-xs font-medium text-gray-500 mb-1">Filter Workflow Stage</label>
          <select className="w-full p-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
            <option value="">All Statuses</option>
            <option value="New Lead">New Lead</option>
            <option value="Contacted">Contacted</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

     
      <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-100 text-xs font-bold uppercase text-gray-600 border-b border-gray-200">
              <tr>
                <th className="p-3">Client Information</th>
                <th className="p-3">City Location</th>
                <th className="p-3">Requirements</th>
                <th className="p-3">Workflow Status</th>
                <th className="p-3 text-right">Advance Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              
            
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-3">
                  <div className="font-bold text-gray-900">Rahul Nair</div>
                  <div className="text-xs text-gray-500">rahul@example.com • 9876543210</div>
                </td>
                <td className="p-3 font-medium text-gray-600">Palakkad</td>
                <td className="p-3">
                  <span className="font-semibold text-gray-900">12 kW</span>
                  <div className="text-xs text-gray-400">Residential • Website</div>
                </td>
                <td className="p-3">
                  <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-yellow-100 text-yellow-800">
                    New Lead
                  </span>
                </td>
                <td className="p-3 text-right">
                  <select className="p-1.5 border border-gray-300 rounded text-xs bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
   </>
  )
}

export default Dashboard