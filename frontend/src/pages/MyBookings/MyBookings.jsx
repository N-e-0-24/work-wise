import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../../fetchRequestBuilder/apifetch";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await apiFetch("my-bookings");
        // Filter only ACTIVE bookings
        const activeBookings = data.filter((booking) => booking.status === "ACTIVE");
        setBookings(activeBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    setCanceling(bookingId);
    try {
      await apiFetch(`cancel-booking/${bookingId}`, {
        method: "POST",
      });
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      alert("Booking canceled successfully!");
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Error canceling the booking. Please try again.");
    } finally {
      setCanceling(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>

        {loading ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No active bookings found.</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border-b border-gray-700 last:border-b-0"
              >
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-400">
                      Booked on:{" "}
                      <span className="font-semibold text-emerald-400">
                        {new Date(booking.createdAt).toLocaleString()}
                      </span>
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {booking.seats.map((seat) => (
                        <span
                          key={seat.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800"
                        >
                          Seat {seat.seatNumber}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end w-full">
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={canceling === booking.id}
                      className="px-6 py-3 text-sm font-medium w-auto border rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {canceling === booking.id ? (
                        <span className="inline-flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Canceling...
                        </span>
                      ) : (
                        "Cancel Booking"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-emerald-400   hover:text-emerald-300 font-medium transition-colors"
          >
            Navigate back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
