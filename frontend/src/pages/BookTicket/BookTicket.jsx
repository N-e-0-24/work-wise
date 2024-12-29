import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../../fetchRequestBuilder/apifetch";

const BookMyTicket = () => {
  const [numTickets, setNumTickets] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const data = await apiFetch("available-seats", { method: "GET" });
        setAvailableSeats(data?.length);
      } catch (error) {
        setError("Failed to fetch available seats.");
      }
    };

    fetchAvailableSeats();
  }, []);

  const handleTicketBooking = async (e) => {
    e.preventDefault();

    if (numTickets < 1 || numTickets > 7) {
      setError("Please enter a number between 1 and 7 for tickets.");
      return;
    } else if (numTickets > availableSeats) {
      setError(`Only ${availableSeats} left`);
      return;
    } else {
      setError("");
    }

    try {
      setLoading(true);

      await apiFetch("book-seats", {
        method: "POST",
        body: JSON.stringify({ numberOfSeats: Number(numTickets) }),
      });

      alert(`Successfully booked ${numTickets} ticket(s)!`);
      navigate("/");
    } catch (error) {
      setError(
        "An error occurred while booking your tickets. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto bg-gray-700 rounded-lg shadow-md border border-gray-600 p-8 relative">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-white">
            Book Your Tickets
          </h1>
          <p className="text-gray-300 mt-2">
            Reserve your seats easily with our booking system. Check seat
            availability and book your spot for an enjoyable experience.
          </p>
        </div>

        {/* Available Seats Section */}
        <div className="bg-gray-600 rounded-md p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-300">
            Available Seats:{" "}
            <span className="text-white font-semibold">
              {availableSeats !== null ? availableSeats : "Loading..."}
            </span>
          </h3>
        </div>

        {/* Form Section */}
        <form onSubmit={handleTicketBooking} className="space-y-6">
          <div>
            <label
              htmlFor="tickets"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Number of Tickets
            </label>
            <input
              type="number"
              id="tickets"
              placeholder="Enter number of tickets"
              value={numTickets}
              onChange={(e) => setNumTickets(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-700 rounded-md p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gray-800 text-white font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Booking...
              </span>
            ) : (
              "Book Now"
            )}
          </button>
        </form>

        {/* Back to Homepage Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute bottom-4 left-4 text-gray-400 hover:text-gray-300 font-medium transition-colors"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default BookMyTicket;
