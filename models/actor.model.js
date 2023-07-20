const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({ 
    name: String,
    gender: String,
    image: String,
},
{   collection: 'actor',}
);

// const ActorSchema = mongoose.Schema({
//     name : String,
//     image : Number,
// },
// {
//     timestamps:true
// }
// );

const Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;
// module.exports = mongoose.model('Actor', ActorSchema);

// exports.ActorSchema = ActorSchema;
// exports.Punishment = mongoose.model("Punishment", punishmentSchema);