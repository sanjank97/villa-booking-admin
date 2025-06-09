const villaModel = require('../models/villa.model');

exports.getVillas = async (req, res) => {
  try {
    const villas = await villaModel.getAllVillas();
    res.json(villas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getVillasbyId = async (req, res) => {
  try {
    const villas = await villaModel.getVillasbyId(req.params.id);
    res.json(villas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addVilla = async (req, res) => {
  try {
    const villaId = await villaModel.createVilla(req.body);
    res.status(201).json({ message: 'Villa added', id: villaId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editVilla = async (req, res) => {

  

  try {
    await villaModel.updateVilla(req.params.id, req.body);
    res.json({ message: 'Villa updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteVilla = async (req, res) => {
  try {
    await villaModel.deleteVilla(req.params.id);
    res.json({ message: 'Villa deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
