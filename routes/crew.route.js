module.exports = (app)=>{
    const crew = require('../controllers/crew.controller');
  
    app.post('/crew', crew.create);
    app.get('/crew', crew.findAll);
    app.get('/crew/:id', crew.findById);
    app.put('/crew/:id', crew.update);
    app.delete('/crew/:id', crew.delete);
  }