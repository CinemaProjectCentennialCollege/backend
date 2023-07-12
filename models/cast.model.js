const mongoose = require('mongoose');

const CastSchema = mongoose.Schema({
    actorId : String,
    gender : String,
    character : String
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Cast', CastSchema);