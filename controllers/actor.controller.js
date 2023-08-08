const Actor = require('../models/actor.model')
const axios = require('axios');
const GOOGLE_API_KEY = 'AIzaSyAdiixz8wMF2AqXA6___4CIDY46POZ3It0';
const SEARCH_ENGINE_ID = '72999ac01925c40d6';

exports.getActorPhotoURL = async (req, res)=>{
  const actorName = req.query.actorName;

  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: `${actorName} photo`,
        searchType: 'image',
      },
    }
    );
    const firstResult = response.data.items[0];
    const posterLink = firstResult.link;

    res.json({ posterLink });
    console.log('API Response:', posterLink);
  } catch (error) {
      console.error('Error fetching actor photo:', error);
      res.status(500).json({ error: 'Internal server error' });
  }

}

exports.findAll = (req, res) =>{
  const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 20
  }
  Actor.find().skip(pageOptions.page * pageOptions.limit)
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