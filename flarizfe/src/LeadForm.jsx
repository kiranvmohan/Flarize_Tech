import React, { useState } from 'react'

function LeadForm({ onSuccess }) {

  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    location: '',
    property_type: 'Residential', 
    system_size: '',
    source: 'Website' 
  });

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) 
      });

      if (response.ok) {
        alert('Lead saved to database successfully!');
        
       
        setFormData({
          full_name: '', phone_number: '', email: '', location: '',
          property_type: 'Residential', system_size: '', source: 'Website'
        });

        if (onSuccess) onSuccess(); 
      } else {
        alert('Failed to save data. Check backend console.');
      }
    } catch (err) {
      alert('Network Error: Cannot connect to the backend server.');
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Solar Lead Enrolment
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Input customer details below 
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
        
      
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            
          
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white border border-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 text-sm"
                />
              </div>
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white border border-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 text-sm"
                />
              </div>
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white border border-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 text-sm"
                />
              </div>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Location / City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco"
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white border border-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 text-sm"
                />
              </div>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Property Type
              </label>
              <div className="mt-2">
                <select 
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-gray-800 px-3 py-2 text-base text-white border border-white/10 focus:outline-2 focus:outline-indigo-500 text-sm cursor-pointer"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-200">
                System Size (1-100 kW)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="system_size"
                  value={formData.system_size}
                  onChange={handleChange}
                  placeholder="e.g. 12"
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white border border-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 text-sm"
                />
              </div>
            </div>

           
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-200">
                Lead Source
              </label>
              <div className="mt-2">
                <select 
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-gray-800 px-3 py-2 text-base text-white border border-white/10 focus:outline-2 focus:outline-indigo-500 text-sm cursor-pointer"
                >
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Walk-in">Walk-in</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>
            </div>

          </div>

         
          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors cursor-pointer"
            >
              Add Lead Profile Record
            </button>
          </div>
        </form>

      </div>
    </div>
    </>
  )
}

export default LeadForm;