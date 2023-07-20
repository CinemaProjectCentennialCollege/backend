const mongoose = require('mongoose');

const ActorSchema = mongoose.Schema({
    name : String,
    gender: String,
    image : Number,
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Actor', ActorSchema);