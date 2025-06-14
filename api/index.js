import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import userRoute from './routes/users.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


// Create Express app
const app = express();
// Load environment variables
dotenv.config();

// MongoDB connection function
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// MongoDB connection status logs
mongoose.connection.on('connected', () => {
  console.log('📡 MongoDB connected');
});
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});


// Middleware


app.use(cookieParser());
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', userRoute);

// Error handling middleware
app.use((err,req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });

});





// Start server
app.listen(8000, () => {  
    connect();   
  console.log('🚀 Server is running on port 8000');
});

