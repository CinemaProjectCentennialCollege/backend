module.exports = (app)=>{
    const tag = require('../controllers/tags.controller');
  
    app.post('/tags', tag.create);
    app.get('/tags', tag.findAll);
    app.get('/tags/:id', tag.findById);
    app.put('/tags/:id', tag.update);
    app.delete('/tags/:id', tag.delete);
  }