module.exports = (app)=>{
    const booking = require('../controllers/booking.controller');
    
    app.post('/booking', booking.create);
    app.get('/booking', booking.findAll);
    app.get('/booking/search', booking.getBookingsByMovieTitle);
    app.get('/booking/:id', booking.findById);
    app.put('/booking/:id', booking.update);
    app.delete('/booking/:id', booking.delete);
  }