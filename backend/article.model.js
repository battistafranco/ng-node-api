const mongoose = require('mongoose');
const Author = require('./author.model.js');

const ArticleSchema = mongoose.Schema({
    title: String,
    short_description: String,
    long_description: String,
    updated_at: Date,
    created_at: Date,
    deleted_at: Date,
    authors: [String]
}, {
        timestamps: false
    });

    
module.exports = mongoose.model('Articles', ArticleSchema);

