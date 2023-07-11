const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    email: {type : String, 
            unique : true, 
            required : true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
    name : {type : String, 
            required : true},
    phone : {type : Number, 
            required : true}
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Contact', ContactSchema);