// services/bookingService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BookingService {
  async findAvailableSeatsInSameRow(numberOfSeats) {
    const rows = await prisma.seat.groupBy({
      by: ['rowNumber'],
      _count: {
        id: true,
      },
      where: {
        isBooked: false,
      },
      having: {
        id: {
          _count: {
            gte: numberOfSeats,
          },
        },
      },
    });

    for (const row of rows) {
      const availableSeats = await prisma.seat.findMany({
        where: {
          rowNumber: row.rowNumber,
          isBooked: false,
        },
        orderBy: {
          seatNumber: 'asc',
        },
        take: numberOfSeats,
      });

      if (availableSeats.length === numberOfSeats) {
        return availableSeats;
      }
    }

    return null;
  }

  async findNearbyAvailableSeats(numberOfSeats) {
    const availableSeats = await prisma.seat.findMany({
      where: {
        isBooked: false,
      },
      orderBy: [
        { rowNumber: 'asc' },
        { seatNumber: 'asc' },
      ],
      take: numberOfSeats,
    });

    if (availableSeats.length === numberOfSeats) {
      return availableSeats;
    }

    return null;
  }

  async bookSeats(userId, numberOfSeats) {
    if (numberOfSeats > 7) {
      throw new Error('Cannot book more than 7 seats at a time');
    }

    return await prisma.$transaction(async (tx) => {
      // First try to find seats in the same row
      let seatsToBook = await this.findAvailableSeatsInSameRow(numberOfSeats);

      // If not available in same row, find nearby seats
      if (!seatsToBook) {
        seatsToBook = await this.findNearbyAvailableSeats(numberOfSeats);
      }

      if (!seatsToBook || seatsToBook.length < numberOfSeats) {
        throw new Error('Not enough seats available');
      }

      // Create booking
      const booking = await tx.booking.create({
        data: {
          userId,
          status: 'ACTIVE',
        },
      });

      // Update seats
      await tx.seat.updateMany({
        where: {
          id: {
            in: seatsToBook.map(seat => seat.id),
          },
        },
        data: {
          isBooked: true,
          bookingId: booking.id,
        },
      });

      // Return booking with seats
      return await tx.booking.findUnique({
        where: { id: booking.id },
        include: {
          seats: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });
  }

  async cancelBooking(bookingId, userId) {
    return await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findFirst({
        where: {
          id: bookingId,
          userId: userId,
          status: 'ACTIVE',
        },
      });

      if (!booking) {
        throw new Error('Booking not found or already cancelled');
      }

      // Update booking status
      await tx.booking.update({
        where: { id: bookingId },
        data: { status: 'CANCELLED' },
      });

      // Free up the seats
      await tx.seat.updateMany({
        where: { bookingId: bookingId },
        data: {
          isBooked: false,
          bookingId: null,
        },
      });

      return { message: 'Booking cancelled successfully' };
    });
  }

  async getBookingsByUser(userId) {
    return await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        seats: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAvailableSeats() {
    return await prisma.seat.findMany({
      where: {
        isBooked: false,
      },
      orderBy: [
        { rowNumber: 'asc' },
        { seatNumber: 'asc' },
      ],
    });
  }
}

module.exports = new BookingService();