const mongoose = require('mongoose');

const TagsSchema = mongoose.Schema({
    name : String,
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Tags', TagsSchema);