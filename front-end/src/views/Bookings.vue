<template>
  <div>
    <div class="page-intro"><span class="eyebrow">Your travel plans</span><h1 class="page-title">Bookings</h1><p class="subheading">Reservations created in this local demo appear here.</p></div>
    <div v-if="error" class="error-state"><p>{{ error }}</p><button class="btn secondary" @click="loadBookings">Try again</button></div>
    <div v-else-if="loading" class="loading-state">Loading your bookings…</div>
    <div v-else-if="!bookings.length" class="empty-state"><h3>No bookings yet</h3><p>When you request a stay, your reservation details will appear here.</p><router-link class="btn" to="/">Explore stays</router-link></div>
    <div v-else class="booking-list">
      <article class="booking-row" v-for="booking in bookings" :key="booking._id">
        <img :src="(booking.listing && booking.listing.imageUrl) || fallbackImage" :alt="(booking.listing && booking.listing.title) || 'Property'" @error="useFallback" />
        <div><span class="pill">Booking request</span><h3 style="margin-top:8px">{{ (booking.listing && booking.listing.title) || 'Property removed' }}</h3><p>{{ (booking.listing && booking.listing.location) || '' }}</p><p><strong>{{ booking.guestName }}</strong> · {{ booking.guestEmail }}</p><p>{{ formatDate(booking.checkIn) }} — {{ formatDate(booking.checkOut) }} · {{ booking.nights }} nights · {{ booking.guests }} guests</p></div>
        <div class="booking-total">${{ booking.totalPrice }}<span>Total estimate</span></div>
      </article>
    </div>
  </div>
</template>
<script>
import { api, errorMessage } from '../helpers/helpers';
const FALLBACK = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';
export default {
  name: 'Bookings',
  data() { return { bookings: [], loading: true, error: '', fallbackImage: FALLBACK }; },
  methods: {
    async loadBookings() { this.loading = true; this.error = ''; try { this.bookings = await api.getBookings(); } catch (error) { this.error = errorMessage(error); } finally { this.loading = false; } },
    formatDate(value) { return value ? new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }) : '—'; },
    useFallback(event) { if (event.target.src !== FALLBACK) event.target.src = FALLBACK; }
  },
  mounted() { this.loadBookings(); }
};
</script>
