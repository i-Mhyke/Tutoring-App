const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name cannot be blank'],
        uppercase: true
    },
    description: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;