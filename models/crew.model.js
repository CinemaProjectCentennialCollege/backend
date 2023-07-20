const mongoose = require('mongoose');

const CrewSchema = mongoose.Schema({
    name : String,
    gender : String,
    image : String,
    department : String,
    job : String,
},
{
    collection : 'crew'
}
);
module.exports = mongoose.model('Crew', CrewSchema);