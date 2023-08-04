module.exports = (app)=>{
    const movie = require('../controllers/movie.controller');
  
    app.post('/movies', movie.create);
    app.get('/movies', movie.findAll);
    app.get('/movies/popular', movie.findPopular);
    app.get('/movies/:slug', movie.getMovieByIdOrSlug);
    app.get('/movies/:id', movie.getMovieByIdOrSlug);
    app.put('/movies/:id', movie.update);
    app.delete('/movies/:id', movie.delete);
  }