import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthEditCars() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editingCar, setEditingCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load the car
  useEffect(() => {
    async function loadCar() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(`${API_URL}/car/${id}`, { credentials: "include" });
        if (!response.ok) throw new Error(`Failed to load car (${response.status})`);

        const car = await response.json();

        setEditingCar({
          ...car,
          id: car._id || car.id,
          title: car.title || "",
          make: car.make || "",
          model: car.model || "",
          price: typeof car.price === "number" ? car.price : "",
          year: car.year || "",
          vehicalType: car.vehicalType || "",
          city: car.city || "",
        });
      } catch (err) {
        console.error("Load error:", err);
        setErrorMessage("Could not load this car listing.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCar();
  }, [id]);

  // One handler for every input in the form
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditingCar((prev) => ({ ...prev, [name]: value }));
  }

  // Save the changes
  async function handleUpdate(e) {
    e.preventDefault();
    if (!editingCar) return;

    setSaving(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/car/edit/${editingCar.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingCar.title,
          make: editingCar.make,
          model: editingCar.model,
          price: Number(editingCar.price),
          year: Number(editingCar.year) || editingCar.year,
          vehicalType: editingCar.vehicalType,
          city: editingCar.city,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Failed to update car (${response.status})`);
      }
      navigate("/");
    } catch (err) {
      console.error("Update error:", err);
      setErrorMessage(err.message || "Failed to update listing.");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return <p className="text-gray-500 text-sm p-6">Loading car...</p>;
  }

  if (!editingCar) {
    return (
      <div className="p-6">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">{errorMessage}</div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold text-gray-800">Edit Car</h3>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ✕
          </button>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">{errorMessage}</div>
        )}

        <form onSubmit={handleUpdate} className="flex flex-wrap gap-4">
          {/* Title */}
          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editingCar.title}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Make */}
          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
            <input
              type="text"
              name="make"
              value={editingCar.make}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Model */}
          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              type="text"
              name="model"
              value={editingCar.model}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Price */}
          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={editingCar.price}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Year */}
          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={editingCar.year}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Vehicle Type */}
          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
            <input
              type="text"
              name="vehicalType"
              value={editingCar.vehicalType}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* City */}
          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={editingCar.city}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="w-full flex gap-3 mt-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}