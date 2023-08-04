const Booking = require('../models/booking.model');
const Movie = require('../models/movie.model');

exports.findAll = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const { movie, date, seats } = req.body;
    const booking = await Booking.create({ movie, date, seats });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { movie, date, seats } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { movie, date, seats },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

};

exports.getBookingsByMovieTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const movie = await Movie.findOne({ title });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movieId = movie._id; // Extract the ObjectId from the movie

    // Now, query bookings using the movieId
    const bookings = await Booking.find({
      'movie': movieId,
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this movie title' });
    }

    res.json(bookings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};