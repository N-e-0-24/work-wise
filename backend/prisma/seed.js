const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedSeats = async () => {
  try {
    const seats = [];
    
    // Rows 1 to 11 have 7 seats each
    for (let row = 1; row <= 11; row++) {
      for (let seat = 1; seat <= 7; seat++) {
        seats.push({
          seatNumber: seat + (row - 1) * 7,  // Changed from seatNo
          rowNumber: row,                     // Changed from rowNo
          isBooked: false
        });
      }
    }
    
    // Row 12 has 3 seats
    for (let seat = 1; seat <= 3; seat++) {
      seats.push({
        seatNumber: 77 + seat,               // Changed from seatNo
        rowNumber: 12,                       // Changed from rowNo
        isBooked: false
      });
    }

    await prisma.seat.createMany({ data: seats });
    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSeats();