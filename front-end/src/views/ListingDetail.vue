<template>
  <div>
    <div v-if="loading" class="loading-state">Loading this lovely stay…</div>
    <div v-else-if="error" class="error-state"><p>{{ error }}</p><router-link class="btn secondary" to="/">Back to stays</router-link></div>
    <div v-else-if="listing" class="detail-layout">
      <section class="detail-copy">
        <router-link class="inline-link" to="/">← All stays</router-link>
        <div style="margin-top:24px"><span class="eyebrow">{{ listing.propertyType }} · hosted by {{ listing.hostName || 'StayFinder Host' }}</span><h1>{{ listing.title }}</h1><p class="subheading">⌖ {{ listing.location }}</p></div>
        <img class="detail-image" style="margin-top:22px" :src="listing.imageUrl || fallbackImage" :alt="listing.title" @error="useFallback" />
        <div class="detail-stats"><span>♙ {{ listing.maxGuests }} guests</span><span>·</span><span>{{ listing.bedrooms }} bedrooms</span><span>·</span><span>{{ listing.bathrooms }} bathrooms</span></div>
        <h2>About this place</h2><p class="detail-description">{{ listing.description }}</p>
        <h3>What this place offers</h3><div v-if="listing.amenities && listing.amenities.length" class="amenities"><span class="amenity" v-for="item in listing.amenities" :key="item">✓ {{ item }}</span></div><p v-else class="muted">The host hasn't added amenities yet.</p>
      </section>
      <aside class="booking-card">
        <div class="booking-price">${{ listing.pricePerNight }} <span>/ night</span></div><p class="muted" style="font-size:12px;margin:5px 0 0">A lovely place to make yourself at home.</p>
        <div v-if="bookingError" class="notice error">{{ bookingError }}</div>
        <div v-if="bookingSuccess" class="notice success">Booking request saved! <router-link class="inline-link" to="/bookings">View bookings</router-link></div>
        <form @submit.prevent="bookStay">
          <div class="field"><label for="name">Your name</label><input id="name" v-model.trim="booking.guestName" required maxlength="100" placeholder="Full name" /></div>
          <div class="field"><label for="email">Email address</label><input id="email" v-model.trim="booking.guestEmail" type="email" required placeholder="you@example.com" /></div>
          <div class="field"><label for="checkin">Check-in</label><input id="checkin" v-model="booking.checkIn" type="date" :min="today" required /></div>
          <div class="field"><label for="checkout">Check-out</label><input id="checkout" v-model="booking.checkOut" type="date" :min="booking.checkIn || today" required /></div>
          <div class="field"><label for="guest-count">Guests</label><select id="guest-count" v-model.number="booking.guests"><option v-for="n in listing.maxGuests" :key="n" :value="n">{{ n }} {{ n === 1 ? 'guest' : 'guests' }}</option></select></div>
          <div v-if="nights > 0" class="divider"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${{ listing.pricePerNight }} × {{ nights }} nights</span><strong>${{ estimatedTotal }}</strong></div></div>
          <button class="btn" type="submit" :disabled="bookingSaving">{{ bookingSaving ? 'Sending request…' : 'Request to book' }}</button>
          <p class="fine-print">This learning demo saves a booking record. It does not process payments or guarantee availability.</p>
        </form>
        <div class="divider"></div><router-link class="inline-link" :to="{ name: 'listing-edit', params: { id: listing._id } }">Edit this listing</router-link>
      </aside>
    </div>
  </div>
</template>
<script>
import { api, errorMessage } from '../helpers/helpers';
const FALLBACK = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';
function dateString(date) { const y = date.getFullYear(); const m = String(date.getMonth() + 1).padStart(2, '0'); const d = String(date.getDate()).padStart(2, '0'); return `${y}-${m}-${d}`; }
export default {
  name: 'ListingDetail',
  data() { return { listing: null, loading: true, error: '', bookingError: '', bookingSuccess: false, bookingSaving: false, fallbackImage: FALLBACK, today: dateString(new Date()), booking: { guestName: '', guestEmail: '', checkIn: '', checkOut: '', guests: 1 } }; },
  computed: {
    nights() { if (!this.booking.checkIn || !this.booking.checkOut) return 0; return Math.round((new Date(`${this.booking.checkOut}T00:00:00`) - new Date(`${this.booking.checkIn}T00:00:00`)) / 86400000); },
    estimatedTotal() { return this.listing ? this.nights * this.listing.pricePerNight : 0; }
  },
  async mounted() { try { this.listing = await api.getListing(this.$route.params.id); this.booking.guests = 1; } catch (error) { this.error = errorMessage(error); } finally { this.loading = false; } },
  methods: {
    useFallback(event) { if (event.target.src !== FALLBACK) event.target.src = FALLBACK; },
    async bookStay() {
      this.bookingError = ''; this.bookingSuccess = false;
      if (this.nights < 1) { this.bookingError = 'Choose a check-out date at least one day after check-in.'; return; }
      this.bookingSaving = true;
      try { await api.createBooking({ ...this.booking, listingId: this.listing._id }); this.bookingSuccess = true; this.booking.guestName = ''; this.booking.guestEmail = ''; this.booking.checkIn = ''; this.booking.checkOut = ''; }
      catch (error) { this.bookingError = errorMessage(error); }
      finally { this.bookingSaving = false; }
    }
  }
};
</script>
