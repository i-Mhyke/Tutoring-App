const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Subject name cannot be blank']
    },
    textbook: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;