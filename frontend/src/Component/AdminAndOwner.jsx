import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function ListingGrid({ title = "Popular Cars", endpoint }) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingCarId, setDeletingCarId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if admin or not
  useEffect(() => {
    fetch(`${API_URL}/isadmin`, { credentials: "include" })
      .then((res) => setIsAdmin(res.ok))
      .catch(() => setIsAdmin(false));
  }, []);

  // Fetch the cars from database
  async function loadCars() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, { credentials: "include" });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const json = await response.json();
      const rawCars = Array.isArray(json) ? json : json.Cars || json.cars || [];

      const formattedCars = rawCars.map((car) => ({
        ...car,
        id: car._id || car.id,
        name:
          car.title ||
          `${car.make || ""} ${car.model || ""}`.trim() ||
          "Untitled Car",
        price:
          typeof car.price === "number" ?
            `PKR ${car.price.toLocaleString()}`
          : car.price,
        image:
          (car.images && car.images[0]?.url) ||
          car.image?.url ||
          "https://placehold.co/400x300?text=No+Image",
      }));

      setCars(formattedCars);
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage(err.message || "Failed to load listings.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCars();
  }, [endpoint]);

  // Delete a car
  async function handleDelete(carId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car listing?",
    );
    if (!confirmed) return;

    setDeletingCarId(carId);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/car/delete/${carId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok)
        throw new Error(`Failed to delete car (${response.status})`);

      // for refresh of cars
      await loadCars();
    } catch (err) {
      console.error("Delete error:", err);
      setErrorMessage("Failed to delete listing.");
    } finally {
      setDeletingCarId(null);
    }
  }

  return (
    <section className="bg-gray-50 py-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

        {isAdmin && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-slate-900 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Admin access
                </p>
                <p className="text-sm text-slate-300 leading-tight">
                  Manage listings
                </p>
              </div>
            </div>

            <Link
              to="/admin"
              className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Open Admin Panel
            </Link>
          </div>
        )}

        {isLoading && (
          <p className="text-gray-500 text-sm mb-4">Loading listings...</p>
        )}

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
            {errorMessage}
          </div>
        )}

        {/* ALl Cars Here */}
        <div className="flex flex-wrap gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col text-center
                         hover:shadow-lg transition-shadow duration-200
                         w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-36 object-contain mb-4"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300?text=No+Image";
                }}
              />

              <h3 className="text-blue-900 font-semibold text-base mb-1">
                {car.name}
              </h3>
              <p className="text-green-600 font-medium text-sm mb-4">
                {car.price}
              </p>

              <div className="flex gap-2 mt-auto">

                <Link
                  to={`/car/edit/${car.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg text-center"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(car.id)}
                  disabled={deletingCarId === car.id}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg disabled:opacity-50"
                >
                  {deletingCarId === car.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
