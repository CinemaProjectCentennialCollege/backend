module.exports = (app)=>{
    const actor = require('../controllers/actor.controller');
  
    app.post('/actors', actor.create);
    app.get('/actors', actor.findAll);
    app.get('/actors/:id', actor.findById);
    app.put('/actors/:id', actor.update);
    app.delete('/actors/:id', actor.delete);
  }