module.exports = (app)=>{
    const cast = require('../controllers/cast.controller');
  
    app.post('/cast', cast.create);
    app.get('/cast', cast.findAll);
    app.get('/cast/:id', cast.findById);
    app.put('/cast/:id', cast.update);
    app.delete('/cast/:id', cast.delete);
  }