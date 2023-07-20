const Cast = require('../models/cast.model')

exports.findAll = (req, res) =>{
  const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 20
  }
  Cast.find().skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .then(actors => {
      res.send(actors)
  })
  .catch(err => {
      res.status(500).send({
          'message' : 'Something went wrong!!', 'error' : err
      })
  })
}

exports.create = async (req, res) => {
  try {
    const { actorId, gender, character } = req.body;
    const cast = await Cast.create({ actor: actorId, gender, character });
    res.json(cast);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.findById = async (req, res) => {
    try {
      const { id } = req.params;
      const cast = await Cast.findById(id).populate('actor');
      if (!cast) {
        return res.status(404).json({ error: 'Cast member not found' });
      }
      res.json(cast);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.findOne = (req, res) => {
    const name = req.body.name;

    Actor.findOne({ name: name })
    .then(actor => {
        if(!actor){
            res.status(400).send(
                {
                    'message' : 'Actor not available', 
                    'error' : err
                }
            )
        }
        res.send(actor)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { actorId, gender, character } = req.body;
      const cast = await Cast.findByIdAndUpdate(
        id,
        { actor: actorId, gender, character },
        { new: true }
      ).populate('actor');
      if (!cast) {
        return res.status(404).json({ error: 'Cast member not found' });
      }
      res.json(cast);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const cast = await Cast.findByIdAndDelete(id);
      if (!cast) {
        return res.status(404).json({ error: 'Cast member not found' });
      }
      res.json({ message: 'Cast member deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };