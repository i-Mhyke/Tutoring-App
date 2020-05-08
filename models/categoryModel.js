const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
    name: String,
    description: string,
    subjects: []
=======
>>>>>>> Stashed changes
    name: {
        type: String,
        required: [true, 'Category name cannot be blank'],
        uppercase: true
    },
    description: String,
<<<<<<< Updated upstream
    subjects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }]
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;