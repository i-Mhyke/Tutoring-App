const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
    name: String,
    
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    tutors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;