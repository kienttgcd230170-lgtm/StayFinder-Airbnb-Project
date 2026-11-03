const mongoose = require('mongoose');
const Listing = require('../models/listingModel');

exports.listListings = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.location) filter.location = { $regex: req.query.location, $options: 'i' };
    if (req.query.guests) filter.maxGuests = { $gte: Math.max(1, Number(req.query.guests) || 1) };
    if (req.query.propertyType && req.query.propertyType !== 'All') filter.propertyType = req.query.propertyType;
    const listings = await Listing.find(filter).sort({ createdAt: -1 }).lean();
    res.json(listings);
  } catch (error) { next(error); }
};

exports.getListing = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid listing ID.' });
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    res.json(listing);
  } catch (error) { next(error); }
};

exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) { next(error); }
};

exports.updateListing = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid listing ID.' });
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    res.json(listing);
  } catch (error) { next(error); }
};

exports.deleteListing = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid listing ID.' });
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    res.json({ message: 'Listing deleted.' });
  } catch (error) { next(error); }
};
