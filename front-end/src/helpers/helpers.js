import axios from 'axios';

const client = axios.create({ baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api' });

export const api = {
  getListings: params => client.get('/listings', { params }).then(res => res.data),
  getListing: id => client.get(`/listings/${id}`).then(res => res.data),
  createListing: payload => client.post('/listings', payload).then(res => res.data),
  updateListing: (id, payload) => client.put(`/listings/${id}`, payload).then(res => res.data),
  deleteListing: id => client.delete(`/listings/${id}`).then(res => res.data),
  getBookings: () => client.get('/bookings').then(res => res.data),
  createBooking: payload => client.post('/bookings', payload).then(res => res.data)
};

export function errorMessage(error) {
  return (error.response && error.response.data && error.response.data.message) || 'Could not complete the request. Check that the backend and MongoDB are running.';
}
