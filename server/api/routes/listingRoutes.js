const express = require('express');
const controller = require('../controllers/listingController');
const router = express.Router();

router.get('/', controller.listListings);
router.post('/', controller.createListing);
router.get('/:id', controller.getListing);
router.put('/:id', controller.updateListing);
router.delete('/:id', controller.deleteListing);
module.exports = router;
