
const wishlistModel = require('../models/wishlist.model');

exports.addToWishlist = async (req, res) => {
  try {
    const { villa_id } = req.body;
    const user_id = req.user.id;
    
    const wishlist_id = await wishlistModel.addToWishlist(user_id, villa_id);
    res.status(201).json({ 
      success: true,
      message: 'Added to wishlist', 
      wishlist_id 
    });

  } catch(err) {
    if (err.message === 'Villa already in wishlist') {
      return res.status(400).json({ 
        success: false,
        error: err.message 
      });
    }
    res.status(500).json({ 
      success: false,
      error: 'Server error' 
    });
  }
}

exports.getAllWishlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const villa_ids = await wishlistModel.getAllWishlist(user_id);
    res.json(villa_ids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.removeWishlist =  async (req, res) => {
  try {
    const villa_id = req.params.id;
    const user_id = req.user.id;
    await wishlistModel.removeWishlist(user_id, villa_id);
    res.json("villa delated");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

