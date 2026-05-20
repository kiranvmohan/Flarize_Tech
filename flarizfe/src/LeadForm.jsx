import React, { useState } from 'react';

function LeadForm({ onSuccess }) {
  
  const [formData, setFormData] = useState({
    full_name: '', phone_number: '', email: '', location: '', property_type: 'Residential', system_size: '', source: 'Website'
  });
  const [error, setError] = useState('');

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    
    if (!formData.full_name || !formData.phone_number || !formData.email || !formData.location || !formData.system_size) {
      setError('Validation Error: Please make sure all form input fields are filled.');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone_number)) {
      setError('Validation Error: Phone number must contain exactly 10 digits.');
      return;
    }

    const res = await fetch('http://localhost:5000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Lead saved successfully!');
      onSuccess(); 
    } else {
      setError('Processing failed. Please check form constraints properties.');
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-xl max-w-2xl mx-auto border border-gray-800 shadow-xl">
      <h2 className="text-xl font-bold text-white text-center mb-4">Add Solar Enquiry</h2>
      {error && <div className="mb-4 p-2 text-xs bg-red-950 border border-red-800 text-red-400 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full bg-white/5 border border-gray-700 p-2 rounded text-white" placeholder="Rahul Nair" />
          </div>
          <div>
            <label className="block mb-1">Phone Number</label>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full bg-white/5 border border-gray-700 p-2 rounded text-white" placeholder="9876543210" />
          </div>
          <div>
            <label className="block mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-gray-700 p-2 rounded text-white" placeholder="rahul@example.com" />
          </div>
          <div>
            <label className="block mb-1">Location / City</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-white/5 border border-gray-700 p-2 rounded text-white" placeholder="Palakkad" />
          </div>
          <div>
            <label className="block mb-1">Property Type</label>
            <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white">
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">System Size (kW)</label>
            <input type="number" name="system_size" value={formData.system_size} onChange={handleChange} className="w-full bg-white/5 border border-gray-700 p-2 rounded text-white" placeholder="12" />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-1">Lead Source</label>
            <select name="source" value={formData.source} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white">
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Walk-in">Walk-in</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full mt-4 bg-indigo-500 p-2 text-white font-bold rounded hover:bg-indigo-400">Save Lead Profile</button>
      </form>
    </div>
  );
}

export default LeadForm;