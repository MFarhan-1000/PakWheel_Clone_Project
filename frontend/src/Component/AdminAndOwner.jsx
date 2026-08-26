import React, { useEffect, useState } from "react";

// Import API_URL
const API_URL = import.meta.env.VITE_API_URL;

export default function ListingGrid({
  title = "Popular Cars",
  endpoint,
  items,
}) {
  const [data, setData] = useState(items || []);
  const [loading, setLoading] = useState(!!endpoint && !items);
  const [error, setError] = useState(null);

  const [editingCar, setEditingCar] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCars = async () => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();

      const cars = Array.isArray(json)
        ? json
        : json.Cars || json.cars || [];

      const formattedCars = cars.map((car) => ({
        ...car,

        id: car._id || car.id,

        name:
          car.title ||
          `${car.make || ""} ${car.model || ""}`.trim() ||
          "Untitled Car",

        price:
          typeof car.price === "number"
            ? `PKR ${car.price.toLocaleString()}`
            : car.price,

        image:
          Array.isArray(car.images) && car.images.length > 0
            ? car.images[0]?.url
            : car.image?.url ||
              "https://placehold.co/400x300?text=No+Image",
      }));

      setData(formattedCars);
    } catch (err) {
      console.error("Fetch error:", err);

      if (err.name !== "AbortError") {
        setError(err.message || "Failed to load listings.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [endpoint, items]);

  // =========================
  // DELETE CAR
  // =========================
  const handleDelete = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car listing?"
    );

    if (!confirmDelete) return;

    setDeletingId(carId);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/car/delete/${carId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `Failed to delete car (${response.status})`
        );
      }

      // Remove deleted car from UI
      setData((prev) => prev.filter((car) => car.id !== carId));
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete listing.");
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // START EDITING
  // =========================
  const handleEdit = (car) => {
    setEditingCar({
      ...car,
      title: car.title || "",
      make: car.make || "",
      model: car.model || "",
      price: car.price || "",
      year: car.year || "",
      vehicalType: car.vehicalType || "",
      city: car.city || "",
    });
  };

  // =========================
  // HANDLE EDIT INPUT
  // =========================
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE CAR
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingCar) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/car/edit/${editingCar.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editingCar.title,
            make: editingCar.make,
            model: editingCar.model,
            price: editingCar.price,
            year: editingCar.year,
            vehicalType: editingCar.vehicalType,
            city: editingCar.city,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `Failed to update car (${response.status})`
        );
      }

      // Update car in the current UI
      setData((prev) =>
        prev.map((car) => {
          if (car.id !== editingCar.id) return car;

          return {
            ...car,
            ...result,

            id: result._id || editingCar.id,

            name:
              result.title ||
              `${result.make || ""} ${result.model || ""}`.trim() ||
              "Untitled Car",

            price:
              typeof result.price === "number"
                ? `PKR ${result.price.toLocaleString()}`
                : result.price,
          };
        })
      );

      setEditingCar(null);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update listing.");
    } finally {
      setSaving(false);
    }
  };

  const listings = data || [];

  return (
    <section className="bg-gray-50 py-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {title}
        </h2>

        {loading && (
          <p className="text-gray-500 text-sm mb-4">
            Loading listings...
          </p>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {!loading && !error && listings.length === 0 && (
          <p className="text-gray-500 text-sm">
            No listings found.
          </p>
        )}

        {/* =========================
            EDIT FORM
        ========================= */}
        {editingCar && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-800">
                Edit Car
              </h3>

              <button
                type="button"
                onClick={() => setEditingCar(null)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>

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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>

                <input
                  type="text"
                  name="make"
                  value={editingCar.make}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>

                <input
                  type="text"
                  name="model"
                  value={editingCar.model}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>

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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={editingCar.year}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>

                <input
                  type="text"
                  name="vehicalType"
                  value={editingCar.vehicalType}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={editingCar.city}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex gap-3 mt-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingCar(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================
            CAR GRID
        ========================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col text-center hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-contain mb-4"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300?text=No+Image";
                }}
              />

              <h3 className="text-blue-900 font-semibold text-base mb-1">
                {item.name}
              </h3>

              <p className="text-green-600 font-medium text-sm mb-4">
                {item.price}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg disabled:opacity-50"
                >
                  {deletingId === item.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}