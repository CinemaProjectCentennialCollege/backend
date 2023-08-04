module.exports = (app)=>{
  const user = require('../controllers/user.controller');

  app.post('/register', user.register);
  app.post('/login/', user.login);

  app.get('/users', user.findAll);
  app.get('/users/:id', user.findOne);
  app.put('/users/:id', user.update);
  app.delete('/users/:id', user.delete);
}