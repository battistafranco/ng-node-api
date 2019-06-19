const Author = require('./author.model.js');

// Retrieve all articles from the database.
exports.findAll = (req, res) => {
    Author.find()
        .then(authors => {
            res.send(authors);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving authors."
            });
        });
};

