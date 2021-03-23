const { json } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    search_name: {
        type: String,
        required: true,
        unique: true
    },
    num_followers: {
        type: String
    },
}, {
    timestamps: true
});

const Search = mongoose.model('gd_search', searchSchema)
module.exports = Search;