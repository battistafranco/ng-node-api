module.exports = app => {
  const articles = require("./article.controller.js");

  // Create a new Article
  app.post("/articles", articles.create);

  // Retrieve all articles
  app.get("/articles", articles.findAll);

  // Retrieve all articles by title
  app.get("/articlesByTitle/:title", articles.findAllByTitle);

  // Retrieve all articles by author
  app.get("/articlesByAuthor/:author", articles.findAllByAuthor);

  // Retrieve a single Article with articleId
  app.get("/articles/:articleId", articles.findOne);

  // Update a Note with articleId
  app.put("/articles/:articleId", articles.update);

  // Delete a Note with articleId
  app.delete("/articles/:articleId", articles.delete);
};
