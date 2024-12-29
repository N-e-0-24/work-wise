// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { signin, signup } = require('../controllers/authController');
const bookingService = require('../service/bookingService');

// Public routes
router.post('/signin', signin);
router.post('/signup', signup);

// Protected routes
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all available seats
router.get('/available-seats', authenticateToken, async (req, res) => {
  try {
    const availableSeats = await bookingService.getAvailableSeats();
    res.json(availableSeats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book seats
router.post('/book-seats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { numberOfSeats } = req.body;

    // Validate input
    if (!numberOfSeats || typeof numberOfSeats !== 'number') {
      return res.status(400).json({ 
        message: 'Please provide a valid number of seats to book' 
      });
    }

    if (numberOfSeats <= 0) {
      return res.status(400).json({ 
        message: 'Number of seats must be greater than 0' 
      });
    }

    if (numberOfSeats > 7) {
      return res.status(400).json({ 
        message: 'Cannot book more than 7 seats at a time' 
      });
    }

    const booking = await bookingService.bookSeats(userId, numberOfSeats);
    res.status(201).json({
      message: 'Seats booked successfully',
      booking
    });

  } catch (error) {
    if (error.message === 'Not enough seats available') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.post('/cancel-booking/:bookingId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({ 
        message: 'Booking ID is required' 
      });
    }

    const result = await bookingService.cancelBooking(bookingId, userId);
    res.json(result);

  } catch (error) {
    if (error.message === 'Booking not found or already cancelled') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// Get user's bookings
router.get('/my-bookings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await bookingService.getBookingsByUser(userId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;