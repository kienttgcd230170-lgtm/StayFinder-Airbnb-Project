require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const listingRoutes = require('./api/routes/listingRoutes');
const bookingRoutes = require('./api/routes/bookingRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:8080' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((req, res) => res.status(404).json({ message: 'API route not found.' }));
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid record ID.' });
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

async function start() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stayfinder';
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`StayFinder API listening on http://localhost:${port}`));
  } catch (error) {
    console.error('Could not connect to MongoDB. Is MongoDB running?', error.message);
    process.exit(1);
  }
}

if (require.main === module) start();
module.exports = app;
