const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    topic: {
        type: String,
        uppercase: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});


const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;