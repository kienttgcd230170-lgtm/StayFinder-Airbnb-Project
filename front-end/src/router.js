import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ListingDetail from './views/ListingDetail.vue';
import ListingForm from './views/ListingForm.vue';
import Bookings from './views/Bookings.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/listings/new', name: 'listing-new', component: ListingForm },
    { path: '/listings/:id/edit', name: 'listing-edit', component: ListingForm },
    { path: '/listings/:id', name: 'listing-detail', component: ListingDetail },
    { path: '/bookings', name: 'bookings', component: Bookings },
    { path: '*', redirect: '/' }
  ],
  scrollBehavior() { return { x: 0, y: 0 }; }
});
