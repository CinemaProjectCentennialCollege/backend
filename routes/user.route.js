module.exports = (app)=>{
  const user = require('../controllers/user.controller');

  app.post('/register', user.create);
  app.post('/login/', user.findOne);
  app.get('/users', user.findAll);
  //app.get('/users/:id', user.findOne);
  app.put('/users/:id', user.update);
  app.delete('/users/:id', user.delete);
}