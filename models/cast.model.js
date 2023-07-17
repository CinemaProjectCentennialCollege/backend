const mongoose = require('mongoose');

const CastSchema = mongoose.Schema({
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor', 
      },
    gender : String,
    character : String
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Cast', CastSchema);