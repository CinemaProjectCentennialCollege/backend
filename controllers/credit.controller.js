const Credit = require('../models/credit.model')

exports.findAll = async (req, res) => {
    try {
      const credits = await Credit.find();
      res.json(credits);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.create = async (req, res) => {
    try {
      const { name, department, job } = req.body;
      const credit = await Credit.create({ name, department, job });
      res.json(credit);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.findById = async (req, res) => {
    try {
      const { id } = req.params;
      const credit = await Credit.findById(id);
      if (!credit) {
        return res.status(404).json({ error: 'Credit not found' });
      }
      res.json(credit);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, department, job } = req.body;
      const credit = await Credit.findByIdAndUpdate(
        id,
        { name, department, job },
        { new: true }
      );
      if (!credit) {
        return res.status(404).json({ error: 'Credit not found' });
      }
      res.json(credit);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const credit = await Credit.findByIdAndDelete(id);
      if (!credit) {
        return res.status(404).json({ error: 'Credit not found' });
      }
      res.json({ message: 'Credit deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };