import React, { useState, useEffect } from "react";

export default function ListingGrid({
  title = "Popular Cars",
  endpoint,
  items,
}) {
  const [data, setData] = useState(items || null);
  const [loading, setLoading] = useState(!!endpoint && !items);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If static items are provided, prioritize them and avoid fetching
    if (items) {
      setData(items);
      setLoading(false);
      return;
    }

    if (!endpoint) return;

    const controller = new AbortController();

    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const json = await response.json();

        const formattedCars = (json.Cars || []).map((car) => ({
          id: car._id || car.id,
          title:
            car.title ||
            `${car.make || ""} ${car.model || ""}`.trim() ||
            "Untitled Car",
          price:
            typeof car.price === "number"
              ? `PKR ${car.price.toLocaleString()}`
              : car.price,
          image: car.image?.url || "https://placehold.co/400x300?text=No+Image",
          name: car.salesPerson?.name || "N/A",
          phone: car.salesPerson?.phone || null,
          make: car.make,
          city: car.city,
          year: car.year,
        }));

        setData(formattedCars);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError(err.message || "Failed to load listings.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCars();

    return () => controller.abort();
  }, [endpoint, items]);

  const listings = data || [];

  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

        {loading && (
          <p className="text-gray-500 text-sm mb-4">Loading listings...</p>
        )}
        {error && <p className="text-amber-600 text-sm mb-4">{error}</p>}

        {!loading && !error && listings.length === 0 && (
          <p className="text-gray-500 text-sm">No listings found.</p>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer w-full sm:w-[47%] md:w-[30%] lg:w-[23%]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-36 object-contain mb-4"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300?text=No+Image";
                }}
              />

              <h3 className="text-blue-900 font-semibold text-base mb-1">
                {item.title}
              </h3>
              <p className="text-green-600 font-medium text-sm mb-2">
                {item.price}
              </p>

              <div className="space-y-1 text-sm text-slate-900 mb-3">
                <p>
                  <span className="text-slate-900 font-bold">Make : </span>
                  <span className="font-semibold">{item.make}</span>
                </p>
                <p>
                  <span className="text-slate-900 font-bold">City : </span>
                  <span className="font-semibold">{item.city}</span>
                </p>
                <p>
                  <span className="text-slate-900 font-bold">Year : </span>
                  <span className="font-semibold">{item.year}</span>
                </p>
              </div>

              <div className="text-gray-500 border-t border-gray-100 pt-2 w-full">
                <p className="font-bold text-gray-900">
                  Sales Person: {item.name}
                </p>
                <p className="text-gray-900">
                  Contact Now: {item.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}