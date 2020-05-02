const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    description: string,
    subjects: []
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;