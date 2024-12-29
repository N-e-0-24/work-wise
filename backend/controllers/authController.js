const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET; // Use a secure, environment-stored key in production



const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid password format' });
      }
  
      // Find the user in the database
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT
      const token = jwt.sign(
        { id: user.id, email: user.email }, // Payload
        JWT_SECRET,                        // Secret key
        { expiresIn: '1h' }                // Expiration time
      );
  
      // Return the token
      return res.status(200).json({
        message: 'Sign-in successful',
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };



const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid fullname format' });
    }
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid password format' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate a JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      JWT_SECRET,                        // Secret key
      { expiresIn: '1h' }                // Expiration time
    );

    // Return the token instead of user data
    return res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};


module.exports = {
    signin,
    signup
}