const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const rideRoutes = require('./routes/ride.routes')

connectToDb();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/',(req,res) => {
    res.json({ message: 'Uber Clone API is running' });
});
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/rides',rideRoutes);

app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

module.exports = app;