const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resetSeats = async () => {
  try {
    // Reset all seats to unbooked
    await prisma.seat.updateMany({
      data: {
        isBooked: false
      }
    });
    console.log('Booking reset completed.');
  } catch (error) {
    console.error('Error resetting bookings:', error);
  } finally {
    await prisma.$disconnect();
  }
};

resetSeats();
