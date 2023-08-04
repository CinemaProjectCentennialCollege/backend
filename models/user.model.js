const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName : {type : String, 
        required : true},
    lastName : {type : String, 
        required : true},
    email: {type : String, 
            unique : true, 
            required : true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
    userName : {type : String, 
                unique : true, 
                required : true},
    password : {type : String, 
                required : true}
},
{
    timestamps:true
}
);
module.exports = mongoose.model('User', UserSchema);