const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie', 
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    seats: [
      {
        row: Number,
        column: Number,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
        },
      },
    ],
    },
);

module.exports = mongoose.model('Booking', BookingSchema);
