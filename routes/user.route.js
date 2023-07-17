module.exports = (app)=>{
  const users = require('../controllers/user.controller');

  app.post('/users', users.create);
  app.post('/users/userName/', users.findOne);
  app.get('/users', users.findAll);
  app.get('/users/:id', users.findOne);
  app.put('/users/:id', users.update);
  app.delete('/users/:id', users.delete);
}