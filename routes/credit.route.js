module.exports = (app)=>{
    const credit = require('../controllers/credit.controller');
  
    app.post('/credits', credit.create);
    app.get('/credits', credit.findAll);
    app.get('/credits/:id', credit.findById);
    app.put('/credits/:id', credit.update);
    app.delete('/credits/:id', credit.delete);
  }