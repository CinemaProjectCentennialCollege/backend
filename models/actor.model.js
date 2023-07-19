const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({ 
    name: String,
    gender: String,
    image: String,
});

// const ActorSchema = mongoose.Schema({
//     name : String,
//     image : Number,
// },
// {
//     timestamps:true
// }
// );

module.exports.ActorSchema = ActorSchema;
// module.exports = mongoose.model('Actor', ActorSchema);

// exports.ActorSchema = ActorSchema;
// exports.Punishment = mongoose.model("Punishment", punishmentSchema);
