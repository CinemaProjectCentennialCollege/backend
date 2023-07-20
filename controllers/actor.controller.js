const Actor = require('../models/actor.model')

exports.findAll = async (req, res) => {
    try {
      const actors = await Actor.find();
      res.json(actors);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.create = async (req, res) => {
    try {
      const { name, gender, image } = req.body;
      const actor = await Actor.create({ name, gender, image });
      res.json(actor);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.findById = async (req, res) => {
    try {
      const { id } = req.params;
      const actor = await Actor.findById(id);
      if (!actor) {
        return res.status(404).json({ error: 'Actor not found' });
      }
      res.json(actor);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, gender, image } = req.body;
      const actor = await Actor.findByIdAndUpdate(
        id,
        { name, gender, image },
        { new: true }
      );
      if (!actor) {
        return res.status(404).json({ error: 'Actor not found' });
      }
      res.json(actor);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const actor = await Actor.findByIdAndDelete(id);
      if (!actor) {
        return res.status(404).json({ error: 'Actor not found' });
      }
      res.json({ message: 'Actor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };