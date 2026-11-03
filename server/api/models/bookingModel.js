const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  guestName: { type: String, required: true, trim: true, maxlength: 100 },
  guestEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true, min: 1 },
  nights: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
