import { useState } from "react";

export default function CarServices() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    model: "",
    city: "",
    service: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    alert(`You form is Submitted See you on ${form.date}`);
  };

  return (
    <div className="bg-slate-300 py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left side - text and illustration */}
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Car Services At Your Doorstep
          </h2>
          <p className="text-gray-700 mb-8">
            Need reliable car maintenance without the hassle? Book trusted
            mechanics for servicing, repairs, and inspections. Sit back while
            we take care of your car.
          </p>

          <div className="bg-white rounded-2xl w-full max-w-sm h-64 flex items-center justify-center mx-auto md:mx-0">
            <span className="text-6xl">🔧</span>
          </div>
        </div>

        {/* Right side - form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Book A Car Service
          </h3>
<form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              required
              placeholder="Make/Model/Version"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input 
            type="date"
            name="date"
            placeholder="Enter Date"
            value={form.date}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
             />

            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Which city are you in?</option>
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
              <option value="peshawar">Peshawar</option>
            </select>

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">What service do you need?</option>
              <option value="oil-change">Oil Change</option>
              <option value="general-service">General Service</option>
              <option value="ac-repair">AC Repair</option>
              <option value="inspection">Car Inspection</option>
            </select>

            <button
            type="submit"
              className="w-full bg-blue-900 text-white font-semibold py-3 rounded-md hover:bg-blue-800 transition-colors"
            >
              Book My Service
            </button>
          </div>
</form>

        </div>
      </div>
    </div>
  );
}