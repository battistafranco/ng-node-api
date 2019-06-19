module.exports = (app) => {
    const authors = require('./author.controller.js');
    // Retrieve all authors
    app.get('/authors', authors.findAll);    
}