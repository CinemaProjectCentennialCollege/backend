const Movie = require('../models/movie.model')

exports.findAll = (req, res) => {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 20,
    };
  
    Movie.find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .select('tmdb_id slug title overview poster_path adult vote_average vote_count genres original_language')
      .then((movies) => {
        res.send(movies);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Something went wrong!!',
          error: err,
        });
      });
  };
  
exports.findPopular = (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page, 10) - 1 || 0,
    limit: parseInt(req.query.limit, 10) || 20,
  };

  Movie.aggregate([
    {
      $project: {
        tmdb_id: 1,
        title: 1,
        overview: 1,
        poster_path: 1,
        adult: 1,
        vote_average: 1,
        vote_count: { $toInt: "$vote_count" },
        // vote_count: 1,
        genres: 1,
        original_language: 1,
      },
    },
    {
      $match: {
        vote_count: { $gte: 5000 },
      }
    },
    {
      $sort: {
        vote_average: -1, vote_count: -1
      }
    },
    {
      $skip: pageOptions.page * pageOptions.limit
    },
    {
      $limit: pageOptions.limit
    }
  ]).then((movies) => {
    res.send(movies);
  })
  .catch((err) => {
    res.status(500).send({
      message: 'Something went wrong!!',
      error: err,
    });
  });
};
  


exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "name cannot be empty"
    });
  }
  if (!req.body.image) {
    return res.status(400).send({
      message: "image cannot be empty"
    });
  }
  const movie = new Movie({
    name: req.body.name,
    image:  req.body.image
  });

  movie.save()
    .then(data=>res.send(data))
    .catch(error => {
        res.status(500).send({
            message:"someting went wrong while inserting data"
        })
    });
};

exports.findById = (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    // .select('title vote_average genres')
    .then(movie => {
      if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.json(movie);
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
};


exports.findBySlug = (req, res) => {
  const movieSlug = req.params.slug;

  Movie.findOne({"slug": movieSlug})
    // .select('title vote_average genres')
    .then(movie => {
      if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.json(movie);
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
};

exports.findOne = (req, res) => {
    const name = req.body.name;

    Movie.findOne({ name: name })
    .then(movie => {
        if(!movie){
            res.status(400).send(
                {
                    'message' : 'Movie not available', 
                    'error' : err
                }
            )
        }
        res.send(movie)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.update = (req,res) =>{
    if (!req.body.name){
        return res.status(400).send({
            message:"name can not be empty"
        })
    }
    if (!req.body.image){
        return res.status(400).send({
            message:"image can not be empty"
        })
    }
    const id =req.params.id;

    Movie.findByIdAndUpdate(id, {
        name: req.body.name,
        image: req.body.image
    },{new:true}).then(movie =>{
        res.send(movie)
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.delete = (req,res) =>{
    const id =req.params.id;
    Movie.findByIdAndRemove(id).then(movie =>{
        res.send({
            'message':'Removed!!'
        })
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}