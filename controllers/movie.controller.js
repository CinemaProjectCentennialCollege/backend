const mongoose = require('mongoose');
const axios = require('axios');
const GOOGLE_API_KEY = 'AIzaSyAdiixz8wMF2AqXA6___4CIDY46POZ3It0';
const SEARCH_ENGINE_ID = '72999ac01925c40d6';

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
        slug: 1,
        overview: 1,
        poster_path: 1,
        adult: 1,
        vote_average: 1,
        vote_count: { $toInt: "$vote_count" },
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


// Function to fetch a single movie object by _id or slug
exports.getMovieByIdOrSlug = (req, res) => {
  const movieId = req.params.id;
  const movieSlug = req.params.slug;

  let query = {}
  // Check if the identifier is a valid ObjectId (i.e., _id field)
  if (mongoose.isValidObjectId(movieId)) {
    // Find by _id
    query["_id"] = movieId;
  } else {
    // Find by slug
    query["slug"] = movieSlug;
  }

  Movie.aggregate([
    {
      $match: query // Filter by the given tmdbId
    },
    {
      $lookup: {
        from: 'cast', // Name of the casts collection
        localField: 'tmdb_id',
        foreignField: 'tmdbId',
        as: 'casts'
      },
    },
    {
      $lookup: {
        from: 'bookings', // Name of the casts collection
        localField: '_id',
        foreignField: 'movie',
        as: 'bookings'
      },
    },

    // {
    //   $match: {
    //     'booking.date': targetDate // Filter by the desired date
    //   }
    // },
    // {
    //   $unwind: '$booking'
    // }


    // {
    //   $project: {
    //     _id: 1,
    //     tmdb_id: 1,
    //     title: 1,
    //     slug: 1,
    //     overview: 1,
    //     poster_path: 1,
    //     casts: 1,
    //     adult: 1,
    //     vote_average: 1,
    //     vote_count: { $toInt: "$vote_count" },
    //     genres: 1,
    //     original_language: 1,
    //   }
    // }
  ]).then(movie => {
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.json(movie[0]);
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Something went wrong', error: err });
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

exports.getMoviePosterURL = async (req, res)=>{
  const movieName = req.query.movieName;

  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: `${movieName} poster`,
        searchType: 'image',
      },
    }
    );
    const firstResult = response.data.items[0];
    const posterLink = firstResult.link;

    res.json({ posterLink });
    // res.json(posterLink);
    console.log('API Response:', posterLink);
  } catch (error) {
      console.error('Error fetching movie poster:', error);
      res.status(500).json({ error: 'Internal server error' });
  }

}


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

exports.findByTitle = (req, res) => {
    const titleQuery = req.query.title;
    const query = titleQuery ? { title: { $regex: titleQuery, $options: 'i' } } : {};
  
    Movie.find(query)
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Something went wrong', error: err });
      });
  };
  

exports.findOne = (req, res) => {
    const title = req.body.title;

    Movie.findOne({ title: title })
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