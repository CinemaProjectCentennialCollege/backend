const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
const app = express();
const session = require('express-session');
const requireLogin = require('./public/session_manager');
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'));
app.use(express.json());

app.use(session({
    secret: 'cinerama',
    resave: false,
    saveUninitialized: false
  }));

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect(dbConfig.url,{
    useNewUrlParser : true
})
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('It was not possible to connect to the datbase.', err);
        process.exit();
    });



app.get('/', (req, res)=>{
    res.json({
        "message": "successfull!"
    })
})
require('./routes/user.route')(app);
require('./routes/actor.route')(app);
require('./routes/movie.route')(app);
require('./routes/cast.route')(app);
require('./routes/crew.route.js')(app);
require('./routes/tags.route')(app);
require('./routes/booking.route')(app);

app.listen(4000, () =>{
    console.log('Server is up');
})