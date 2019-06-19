const Article = require("./article.model.js");

//Create new Article
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Article content can not be empty"
    });
  }
  console.log(req);
  // Create a Article
  const article = new Article({
    title: req.body.title || "No article title",
    short_description: req.body.short_description,
    long_description: req.body.long_description,
    updated_at: Date.now(),
    created_at: Date.now(),
    deleted_at: null,
    authors: req.body.authors
  });

  // Save Article in the database
  article
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the article."
      });
    });
};

// Retrieve all articles from the database by title.
exports.findAllByTitle = (req, res) => {
  var title = req.params.title;
  console.log("Title: " + title);
  Article.find({ deleted_at: null })
    .where({title: title})
    .then(articles => {
      console.log(articles);
      res.send(articles);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving articles."
      });
    });
};

// Retrieve all articles from the database by author.
exports.findAllByAuthor = (req, res) => {
  var author = req.params.author;
  console.log("author: " + author);
  Article.find({ deleted_at: null })
    .where({authors: author})
    .then(articles => {
      console.log(articles);
      res.send(articles);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving articles."
      });
    });
};


exports.findAll = (req, res) => {
  Article.find()
    .where({ deleted_at: null })
    .then(articles => {
      res.send(articles);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving articles."
      });
    });
};

// Find a single article with a articleId
exports.findOne = (req, res) => {
  Article.findById(req.params.articleId) //.populate({ path: 'authors' })
    .then(article => {
      if (!article) {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      res.send(article);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving article with id " + req.params.articleId
      });
    });
};

// Update a article
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Article content can not be empty"
    });
  }

  // Find and update article with the request body
  Article.findByIdAndUpdate(
    req.params.articleId,
    {
      title: req.body.title || "No article title",
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      updated_at: Date.now(),
      created_at: req.body.created_at,
      deleted_at: req.body.deleted_at,
      authors: req.body.authors
    },
    { new: true }
  )
    .then(article => {
      if (!article) {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      res.send(article);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.articleId
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Article.findByIdAndUpdate(req.params.articleId, {
    deleted_at: Date.now()
  })
    .then(article => {
      if (!article) {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      res.send(article);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.articleId
      });
    });
};
