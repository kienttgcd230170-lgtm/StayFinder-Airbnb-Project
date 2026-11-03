const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 3000 },
  location: { type: String, required: true, trim: true, maxlength: 120 },
  propertyType: { type: String, enum: ['Apartment', 'House', 'Villa', 'Cabin', 'Guesthouse', 'Other'], default: 'Apartment' },
  pricePerNight: { type: Number, required: true, min: 1 },
  maxGuests: { type: Number, required: true, min: 1, max: 30 },
  bedrooms: { type: Number, default: 1, min: 0, max: 50 },
  bathrooms: { type: Number, default: 1, min: 0, max: 50 },
  imageUrl: { type: String, default: '', trim: true },
  amenities: [{ type: String, trim: true }],
  hostName: { type: String, default: 'StayFinder Host', trim: true }
}, { timestamps: true });

module.exports = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);
