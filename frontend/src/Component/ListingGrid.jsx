import React, { useEffect, useState } from "react";

export default function ListingGrid({ title = "Popular Cars", endpoint, items }) {
  const [data, setData] = useState(items || null);
  const [loading, setLoading] = useState(!!endpoint && !items);
  const [error, setError] = useState(null);

  useEffect(() => {
 
    if (!endpoint) return;
    // Create an controller to abort the fetch request if component unmounts
    const controller = new AbortController();

    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint,  { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const json = await response.json();
        console.log(json);

        // Format backend response
        const formattedCars = (json.Cars || []).map((car) => ({
          id: car._id || car.id,
          name: car.title || `${car.make || ""} ${car.model || ""}`.trim() || "Untitled Car",
          price: typeof car.price === "number" ? `PKR ${car.price.toLocaleString()}` : car.price,
          image: Array.isArray(car.images) && car.images.length > 0
            ? car.images.url
            : (car.image.url || "https://placehold.co/400x300?text=No+Image")
        }));

        setData(formattedCars);
      } catch (err) {
        // Ignore errors caused by intentional aborts
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

    // Abort request if component unmounts or endpoint changes
    return () => controller.abort();
  }, [endpoint, items]);

  // Fallback to empty array to avoid null property access
  const listings = data || [];

  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

        {loading && <p className="text-gray-500 text-sm mb-4">Loading listings...</p>}
        {error && <p className="text-amber-600 text-sm mb-4">{error}</p>}

        {!loading && !error && listings.length === 0 && (
          <p className="text-gray-500 text-sm">No listings found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-contain mb-4"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x300?text=No+Image";
                }}
              />
              <h3 className="text-blue-900 font-semibold text-base mb-1">{item.name}</h3>
              <p className="text-green-600 font-medium text-sm">{item.price}</p>

              {/* <h4>Contact NOW: {User.phone}</h4> */}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}