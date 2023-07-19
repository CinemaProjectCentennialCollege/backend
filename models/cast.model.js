// import ActorSchema from "actor.model.js";

const { ActorSchema } = require('./actor.model');

const mongoose = require('mongoose');

const CastSchema = mongoose.Schema({
    actor: ActorSchema,
    gender : String,
    character : String
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Cast', CastSchema);