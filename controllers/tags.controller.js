const Tag = require('../models/tags.model')

exports.findAll = async (req, res) => {
    try {
      const tags = await Tag.find();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.create = async (req, res) => {
    try {
      const { name } = req.body;
      const tag = await Tag.create({ name });
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.findById = async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findById(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag not found' });
      }
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const tag = await Tag.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!tag) {
        return res.status(404).json({ error: 'Tag not found' });
      }
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findByIdAndDelete(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag not found' });
      }
      res.json({ message: 'Tag deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };