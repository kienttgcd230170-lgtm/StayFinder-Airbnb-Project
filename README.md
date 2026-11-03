# StayFinder — Airbnb-style rental project

A coursework-friendly starter built by adapting the structure and Vue 2 / Express / Mongoose stack of the supplied COMP1842 example project.

## Features in this first working version
- Vue 2 single-page app with Vue Router
- Browse/search/filter rental listings
- Listing detail page
- Create, edit, and delete listings (CRUD)
- Create bookings and view bookings
- Express REST API with validation and consistent JSON errors
- MongoDB persistence through Mongoose
- Seed script for realistic demo listings

Authentication, host/guest roles, reviews, image uploads, maps, payments, and messaging are intentionally left as next-stage enhancements. Booking creation is a coursework demo, not a payment or availability guarantee.

## Requirements
- Node.js 18+ (recommended)
- MongoDB Community Server running locally, with MongoDB Compass available to inspect data
- VS Code

## 1. Start MongoDB
Start your local MongoDB service. Compass can connect to `mongodb://127.0.0.1:27017`.

## 2. Start the backend
Open a terminal in `airbnb-project/server`:

```bash
npm install
```

Copy `.env.example` to `.env` and adjust `MONGODB_URI` if needed. Then:

```bash
npm run seed
npm run dev
```

The API runs at `http://localhost:3000`. Check `http://localhost:3000/api/health`.

## 3. Start the Vue frontend
Open a second terminal in `airbnb-project/front-end`:

```bash
npm install
npm run serve
```

Open the local URL printed by Vue CLI, usually `http://localhost:8080`.

## 4. Inspect the database in Compass
Connect to `mongodb://127.0.0.1:27017` and open the `stayfinder` database. The seed script creates `listings` documents. Create a booking through the website to populate the `bookings` collection.

## API overview
- `GET /api/listings` — list, search, filter by location and guests
- `GET /api/listings/:id` — listing details
- `POST /api/listings` — create a listing
- `PUT /api/listings/:id` — update a listing
- `DELETE /api/listings/:id` — delete a listing
- `GET /api/bookings` — list demo bookings
- `POST /api/bookings` — create a booking

## Important notes
- The app uses sample external Unsplash image URLs. Internet access is needed to load those photos.
- This is a local development project. Do not deploy it publicly without authentication, authorization, rate limiting, secure secrets, and proper booking conflict checks.
- Never commit your `.env` file or real credentials.
