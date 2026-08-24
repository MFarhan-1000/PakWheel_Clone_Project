import React, { useState } from 'react';

export default function Carservices() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    model: "",
    city: "",
    filer: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Your Request is submitted we will contact you As Soon as Possible")
    setForm({
        name: "",
        phone: "",
        model: "",
        city: "",
        filer: "",
        
    })
  };

  return (
    <div className="bg-slate-300 py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left side - text and illustration */}
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Car Ownership Transfer Service
          </h2>
          <p className="text-gray-700 mb-8">
            Looking for a hassle-free quick car transfer? Your one-stop
            solution for Car Transfer. Say goodbye to long queues and enjoy a
            seamless transfer experience.
          </p>

          <div className="bg-white rounded-2xl w-full max-w-sm h-64 flex items-center justify-center mx-auto md:mx-0">
            <span className="text-6xl">🔑</span>
          </div>
        </div>

        {/* Right side - form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Book Car Ownership Transfer
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="Make/Model/Version"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Where is your car registered in?</option>
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
              <option value="peshawar">Peshawar</option>
            </select>

            <select
              name="filer"
              value={form.filer}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Are you a filer?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-semibold py-3 rounded-md hover:bg-blue-800 transition-colors"
            >
              Transfer Ownership To My Name
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}