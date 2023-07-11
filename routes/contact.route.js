module.exports = (app)=>{
    const contacts = require('../controllers/contact.controller');
  
    app.post('/contacts', contacts.create);
    app.post('/contacts/email/', contacts.findOne);
    app.get('/contacts', contacts.findAll);
    app.get('/contacts/:id', contacts.findById);
    app.put('/contacts/:id', contacts.update);
    app.delete('/contacts/:id', contacts.delete);
  }