const mongoose = require('mongoose');
const Article = require('./article.model.js');

const AuthorSchema = mongoose.Schema({
    name: String,
    articles: [String]  
}, {
    timestamps: false
});

module.exports = mongoose.model('Authors', AuthorSchema);

