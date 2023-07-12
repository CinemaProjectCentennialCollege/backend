const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name: String,
    poster : String,
    backdrop : String,
    tags : [String]
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Movie', MovieSchema);