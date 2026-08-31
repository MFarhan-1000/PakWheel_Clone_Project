import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // =========================
  // CHECK ADMIN FIRST
  // =========================
  const checkAdmin = async () => {
    try {
      const result = await fetch(`${API_URL}/isadmin`, {
        method: "GET",
        credentials: "include",
      });

      if (!result.ok) {
        // not admin (or not logged in) -> kick them out
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  // =========================
  // FETCH ALL CARS
  // =========================
  const fetchCars = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/car/getcar`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      const carList = Array.isArray(json) ? json : json.Cars || json.cars || [];

      const formatted = carList.map((car) => ({
        id: car._id || car.id,
        name: car.title || `${car.make || ""} ${car.model || ""}`.trim() || "Untitled Car",
        price: typeof car.price === "number" ? `PKR ${car.price.toLocaleString()}` : car.price,
        image:
          Array.isArray(car.images) && car.images.length > 0
            ? car.images[0]?.url
            : car.image?.url || "https://placehold.co/400x300?text=No+Image",
      }));

      setCars(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdmin();
    fetchCars();
  }, []);

  // =========================
  // DELETE CAR
  // =========================
  const handleDelete = async (carId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car listing?");
    if (!confirmDelete) return;

    setDeletingId(carId);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/car/delete/${carId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Failed to delete car (${response.status})`);
      }

      setCars((prev) => prev.filter((car) => car.id !== carId));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete listing.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="bg-gray-50 py-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel — Manage Cars</h2>

        {loading && <p className="text-gray-500 text-sm mb-4">Loading listings...</p>}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">{error}</div>
        )}

        {!loading && !error && cars.length === 0 && (
          <p className="text-gray-500 text-sm">No listings found.</p>
        )}

        {/* FLEX WRAP GRID OF CARS */}
        <div className="flex flex-wrap gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col text-center hover:shadow-lg transition-shadow duration-200 w-full sm:w-[47%] lg:w-[23%]"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-36 object-contain mb-4"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x300?text=No+Image";
                }}
              />

              <h3 className="text-blue-900 font-semibold text-base mb-1">{car.name}</h3>
              <p className="text-green-600 font-medium text-sm mb-4">{car.price}</p>

              <button
                onClick={() => handleDelete(car.id)}
                disabled={deletingId === car.id}
                className="mt-auto bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg disabled:opacity-50"
              >
                {deletingId === car.id ? "Deleting..." : "Delete Listing"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}