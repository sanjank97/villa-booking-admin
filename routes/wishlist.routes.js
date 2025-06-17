const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, wishlistController.addToWishlist);
router.get('/', verifyToken, wishlistController.getAllWishlist);
router.delete('/:id', verifyToken, wishlistController.removeWishlist);

module.exports = router;



