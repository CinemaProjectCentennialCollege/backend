const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    movieId : String,
    score : Number,
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Rating', RatingSchema);