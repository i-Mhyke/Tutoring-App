const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name cannot be blank']
    },
    description: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;