<template>
  <div>
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">A little closer to your next adventure</span>
        <h1>Find a stay<br>that feels like you.</h1>
        <p>Thoughtful places, lovely hosts, and room to make your own memories — wherever you're headed.</p>
        <a href="#stays" class="btn">Explore stays <span>↘</span></a>
      </div>
    </section>

    <form class="search-panel" @submit.prevent="searchListings">
      <div class="field"><label for="location">Where to?</label><input id="location" v-model.trim="filters.location" placeholder="Search destinations" /></div>
      <div class="field"><label for="guests">Who's coming?</label><select id="guests" v-model="filters.guests"><option value="">Any number of guests</option><option v-for="n in 8" :key="n" :value="n">{{ n }} {{ n === 1 ? 'guest' : 'guests' }}</option></select></div>
      <button class="btn" type="submit">⌕ &nbsp; Search stays</button>
    </form>

    <section id="stays">
      <div class="section-heading">
        <div><span class="eyebrow">Handpicked for your next trip</span><h2>Places to stay</h2><p>{{ listings.length }} {{ listings.length === 1 ? 'stay' : 'stays' }} to explore</p></div>
        <router-link class="inline-link" to="/listings/new">+ Add a property</router-link>
      </div>
      <div v-if="loading" class="loading-state">Finding lovely places for you…</div>
      <div v-else-if="error" class="error-state"><p>{{ error }}</p><button class="btn secondary" @click="loadListings">Try again</button></div>
      <div v-else-if="!listings.length" class="empty-state"><h3>No stays found just yet</h3><p>Try another destination, or add a property to get started.</p><button class="btn" @click="resetSearch">Clear search</button></div>
      <div v-else class="listing-grid">
        <article class="listing-card" v-for="listing in listings" :key="listing._id">
          <router-link :to="{ name: 'listing-detail', params: { id: listing._id } }" class="listing-photo-wrap">
            <img class="listing-photo" :src="listing.imageUrl || fallbackImage" :alt="listing.title" @error="useFallback" />
            <span class="photo-label">{{ listing.propertyType || 'Stay' }}</span>
          </router-link>
          <div class="listing-content">
            <div class="listing-topline"><h3 class="listing-title"><router-link :to="{ name: 'listing-detail', params: { id: listing._id } }">{{ listing.title }}</router-link></h3><span class="rating"><span>★</span> New</span></div>
            <p class="listing-location">{{ listing.location }}</p>
            <div class="listing-meta"><span>♙ {{ listing.maxGuests }} guests</span><span>·</span><span>{{ listing.bedrooms }} bed{{ listing.bedrooms === 1 ? '' : 's' }}</span><span>·</span><span>{{ listing.bathrooms }} bath{{ listing.bathrooms === 1 ? '' : 's' }}</span></div>
            <div class="listing-price"><strong>${{ listing.pricePerNight }}</strong> <span>night</span></div>
            <div class="card-actions"><router-link class="btn small" :to="{ name: 'listing-detail', params: { id: listing._id } }">View stay</router-link><router-link class="btn small secondary" :to="{ name: 'listing-edit', params: { id: listing._id } }">Edit</router-link><button class="btn small danger" @click="removeListing(listing)">Delete</button></div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { api, errorMessage } from '../helpers/helpers';
const FALLBACK = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';
export default {
  name: 'Home',
  data() { return { listings: [], loading: true, error: '', filters: { location: '', guests: '' }, fallbackImage: FALLBACK }; },
  methods: {
    async loadListings(params) { this.loading = true; this.error = ''; try { this.listings = await api.getListings(params || {}); } catch (error) { this.error = errorMessage(error); } finally { this.loading = false; } },
    searchListings() { this.loadListings({ location: this.filters.location, guests: this.filters.guests }); },
    resetSearch() { this.filters = { location: '', guests: '' }; this.loadListings(); },
    async removeListing(listing) { if (!window.confirm(`Delete “${listing.title}”? This cannot be undone.`)) return; try { await api.deleteListing(listing._id); await this.loadListings({ location: this.filters.location, guests: this.filters.guests }); } catch (error) { this.error = errorMessage(error); } },
    useFallback(event) { if (event.target.src !== FALLBACK) event.target.src = FALLBACK; }
  },
  mounted() { this.loadListings(); }
};
</script>
