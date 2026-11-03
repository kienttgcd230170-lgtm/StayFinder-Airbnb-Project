<template>
  <div class="form-layout">
    <div class="page-intro"><span class="eyebrow">{{ isEdit ? 'Make it yours' : 'Share your space' }}</span><h1 class="page-title">{{ isEdit ? 'Edit your listing' : 'List a new stay' }}</h1><p class="subheading">Add the details travellers need to picture their time here.</p></div>
    <div class="form-card">
      <div v-if="error" class="notice error">{{ error }}</div>
      <form @submit.prevent="saveListing">
        <div class="form-grid">
          <div class="field full"><label for="title">Property title *</label><input id="title" v-model.trim="listing.title" required maxlength="100" placeholder="e.g. Bright apartment near the beach" /></div>
          <div class="field full"><label for="description">Description *</label><textarea id="description" v-model.trim="listing.description" required maxlength="3000" placeholder="What makes this place special?" /></div>
          <div class="field"><label for="location">Location *</label><input id="location" v-model.trim="listing.location" required placeholder="e.g. Hoi An, Vietnam" /></div>
          <div class="field"><label for="type">Property type</label><select id="type" v-model="listing.propertyType"><option>Apartment</option><option>House</option><option>Villa</option><option>Cabin</option><option>Guesthouse</option><option>Other</option></select></div>
          <div class="field"><label for="price">Price per night (USD) *</label><input id="price" v-model.number="listing.pricePerNight" type="number" min="1" required /></div>
          <div class="field"><label for="guests">Maximum guests *</label><input id="guests" v-model.number="listing.maxGuests" type="number" min="1" max="30" required /></div>
          <div class="field"><label for="bedrooms">Bedrooms</label><input id="bedrooms" v-model.number="listing.bedrooms" type="number" min="0" max="50" /></div>
          <div class="field"><label for="bathrooms">Bathrooms</label><input id="bathrooms" v-model.number="listing.bathrooms" type="number" min="0" max="50" /></div>
          <div class="field full"><label for="image">Photo URL</label><input id="image" v-model.trim="listing.imageUrl" type="url" placeholder="https://… (optional)" /><small class="muted">For this first version, use an image URL. Uploads can be added later.</small></div>
          <div class="field"><label for="host">Host name</label><input id="host" v-model.trim="listing.hostName" placeholder="Your name" /></div>
          <div class="field"><label for="amenities">Amenities</label><input id="amenities" v-model="amenitiesText" placeholder="Wi-Fi, Kitchen, Pool" /><small class="muted">Separate each amenity with a comma.</small></div>
        </div>
        <div class="form-actions"><button class="btn" type="submit" :disabled="saving">{{ saving ? 'Saving…' : (isEdit ? 'Save changes' : 'Publish listing') }}</button><router-link class="btn secondary" to="/">Cancel</router-link></div>
      </form>
    </div>
  </div>
</template>
<script>
import { api, errorMessage } from '../helpers/helpers';
const blankListing = () => ({ title: '', description: '', location: '', propertyType: 'Apartment', pricePerNight: 50, maxGuests: 2, bedrooms: 1, bathrooms: 1, imageUrl: '', amenities: [], hostName: '' });
export default {
  name: 'ListingForm',
  data() { return { listing: blankListing(), amenitiesText: '', loading: false, saving: false, error: '' }; },
  computed: { isEdit() { return Boolean(this.$route.params.id); } },
  async mounted() {
    if (!this.isEdit) return;
    this.loading = true;
    try { this.listing = await api.getListing(this.$route.params.id); this.amenitiesText = (this.listing.amenities || []).join(', '); }
    catch (error) { this.error = errorMessage(error); }
    finally { this.loading = false; }
  },
  methods: {
    async saveListing() {
      this.error = ''; this.saving = true;
      const payload = { ...this.listing, amenities: this.amenitiesText.split(',').map(item => item.trim()).filter(Boolean) };
      try {
        const saved = this.isEdit ? await api.updateListing(this.$route.params.id, payload) : await api.createListing(payload);
        this.$router.push({ name: 'listing-detail', params: { id: saved._id } });
      } catch (error) { this.error = errorMessage(error); }
      finally { this.saving = false; }
    }
  }
};
</script>
