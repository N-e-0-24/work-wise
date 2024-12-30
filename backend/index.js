// app.js or index.js

const express = require("express");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(
  cors({
    origin: ["https://work-wise-k9hq.vercel.app","http://localhost:3000","http://localhost:5173"],
    
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
