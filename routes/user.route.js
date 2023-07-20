module.exports = (app)=>{
  const user = require('../controllers/user.controller');

  app.post('/users', user.create);
  app.post('/users/userName/', user.findOne);
  app.get('/users', user.findAll);
  app.get('/users/:id', user.findOne);
  app.put('/users/:id', user.update);
  app.delete('/users/:id', user.delete);
}