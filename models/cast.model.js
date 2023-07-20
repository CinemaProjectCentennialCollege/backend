const mongoose = require('mongoose');

const CastSchema = mongoose.Schema({
    actor: {
        name: String,
        gender: String,
        image: String,
      },
    gender : String,
    character : String
},
{
    collection: 'cast',
}
);
module.exports = mongoose.model('Cast', CastSchema);