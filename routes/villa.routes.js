const express = require('express');
const router = express.Router();
const villaController = require('../controllers/villa.controller');
const { verifyAdmin } = require('../middlewares/auth.middleware');

router.get('/', verifyAdmin, villaController.getVillas);
router.post('/', verifyAdmin, villaController.addVilla);
router.put('/:id', verifyAdmin, villaController.editVilla);
router.delete('/:id', verifyAdmin, villaController.deleteVilla);

module.exports = router;
