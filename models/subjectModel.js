const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Subject name cannot be blank'],
        uppercase: true
    },
    textbook: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    tutors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;