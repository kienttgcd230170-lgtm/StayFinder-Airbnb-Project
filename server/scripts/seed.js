require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../api/models/listingModel');

const samples = [
  { title: 'Bright apartment near the beach', description: 'A relaxed, light-filled apartment with a balcony, a fully equipped kitchen, and an easy walk to the sand. Great for couples or a small family.', location: 'Da Nang, Vietnam', propertyType: 'Apartment', pricePerNight: 48, maxGuests: 3, bedrooms: 1, bathrooms: 1, imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', amenities: ['Wi-Fi', 'Kitchen', 'Air conditioning', 'Balcony'], hostName: 'Linh' },
  { title: 'Modern villa with a private pool', description: 'Unwind in a spacious private villa with a sunny pool, outdoor dining, and generous living space. Ideal for a group getaway.', location: 'Hoi An, Vietnam', propertyType: 'Villa', pricePerNight: 125, maxGuests: 6, bedrooms: 3, bathrooms: 2, imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', amenities: ['Pool', 'Wi-Fi', 'Kitchen', 'Free parking'], hostName: 'Minh' },
  { title: 'Cosy old-town guesthouse', description: 'A welcoming guesthouse tucked into a peaceful lane close to cafes, markets, and historic streets. Simple, comfortable, and full of character.', location: 'Hoi An, Vietnam', propertyType: 'Guesthouse', pricePerNight: 35, maxGuests: 2, bedrooms: 1, bathrooms: 1, imageUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80', amenities: ['Wi-Fi', 'Air conditioning', 'Workspace'], hostName: 'An' },
  { title: 'Family house with garden', description: 'A calm family home with a leafy garden, roomy kitchen, and comfortable bedrooms. A lovely base for exploring the city and nearby coast.', location: 'Hue, Vietnam', propertyType: 'House', pricePerNight: 62, maxGuests: 5, bedrooms: 3, bathrooms: 2, imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', amenities: ['Garden', 'Kitchen', 'Wi-Fi', 'Free parking'], hostName: 'Thu' },
  { title: 'Minimal studio in the city', description: 'A smart, compact studio with a comfortable bed, a work desk, and quick access to food, coffee, and public transport.', location: 'Hanoi, Vietnam', propertyType: 'Apartment', pricePerNight: 42, maxGuests: 2, bedrooms: 1, bathrooms: 1, imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', amenities: ['Wi-Fi', 'Workspace', 'Kitchenette', 'Air conditioning'], hostName: 'Nam' },
  { title: 'Woodland cabin escape', description: 'A peaceful wooden cabin surrounded by greenery, with a deck for slow mornings and a cosy interior for quiet evenings.', location: 'Da Lat, Vietnam', propertyType: 'Cabin', pricePerNight: 74, maxGuests: 4, bedrooms: 2, bathrooms: 1, imageUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80', amenities: ['Deck', 'Kitchen', 'Free parking', 'Mountain view'], hostName: 'Bao' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stayfinder');
    const count = await Listing.countDocuments();
    if (count > 0) {
      console.log(`Seed skipped: ${count} listings already exist. Delete them manually if you want to reseed.`);
    } else {
      await Listing.insertMany(samples);
      console.log(`Inserted ${samples.length} sample listings.`);
    }
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally { await mongoose.disconnect(); }
}
seed();
