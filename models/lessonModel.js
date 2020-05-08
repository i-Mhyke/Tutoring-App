const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    subject: {
        type: String,
    },
    topic: {
        type: String,
    },
    tutor_email:{
        type: String,
        required: [true, "input tutor email"],
        lowercase: true,
        select: false
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    student_email:{
        type: String,
        required: [true, "input student's email"],
        lowercase: true,
        select: false
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;