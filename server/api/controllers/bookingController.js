const mongoose = require('mongoose');
const Listing = require('../models/listingModel');
const Booking = require('../models/bookingModel');

exports.listBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('listing', 'title location imageUrl pricePerNight').sort({ createdAt: -1 }).lean();
    res.json(bookings);
  } catch (error) { next(error); }
};

exports.createBooking = async (req, res, next) => {
  try {
    const { listingId, guestName, guestEmail, checkIn, checkOut, guests } = req.body;
    if (!mongoose.isValidObjectId(listingId)) return res.status(400).json({ message: 'Please select a valid property.' });
    if (!guestName || !guestEmail || !/^\S+@\S+\.\S+$/.test(guestEmail)) return res.status(400).json({ message: 'Enter your name and a valid email address.' });
    const start = new Date(`${checkIn}T00:00:00.000Z`);
    const end = new Date(`${checkOut}T00:00:00.000Z`);
    if (!checkIn || !checkOut || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      return res.status(400).json({ message: 'Check-out must be after check-in.' });
    }
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Property not found.' });
    const guestCount = Number(guests);
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > listing.maxGuests) {
      return res.status(400).json({ message: `Guests must be between 1 and ${listing.maxGuests}.` });
    }
    const nights = Math.round((end - start) / 86400000);
    const booking = await Booking.create({
      listing: listing._id, guestName, guestEmail, checkIn: start, checkOut: end,
      guests: guestCount, nights, totalPrice: nights * listing.pricePerNight
    });
    const result = await booking.populate('listing', 'title location imageUrl pricePerNight');
    res.status(201).json(result);
  } catch (error) { next(error); }
};
