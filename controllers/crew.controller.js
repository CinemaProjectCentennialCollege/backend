const Crew = require('../models/crew.model')

exports.findAll = (req, res) =>{
  const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 20
  }
  Crew.find().skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .then(crew => {
      res.send(crew)
  })
  .catch(err => {
      res.status(500).send({
          'message' : 'Something went wrong!!', 'error' : err
      })
  })
}


exports.create = async (req, res) => {
    try {
      const { name,gender, image, department, job } = req.body;
      const credit = await Crew.create({ name,gender, image, department, job });
      res.json(credit);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.findById = async (req, res) => {
    try {
      const { id } = req.params;
      const crew = await Crew.findById(id);
      if (!crew) {
        return res.status(404).json({ error: 'Crew not found' });
      }
      res.json(crew);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name,gender, image, department, job } = req.body;
      const crew = await Crew.findByIdAndUpdate(
        id,
        { name,gender, image, department, job },
        { new: true }
      );
      if (!crew) {
        return res.status(404).json({ error: 'Crew not found' });
      }
      res.json(crew);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const crew = await Crew.findByIdAndDelete(id);
      if (!crew) {
        return res.status(404).json({ error: 'Credit not found' });
      }
      res.json({ message: 'Crew deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };