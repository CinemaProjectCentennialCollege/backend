const mongoose = require('mongoose');

const CreditSchema = mongoose.Schema({
    name : String,
    department : String,
    job : String,
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Credit', CreditSchema);