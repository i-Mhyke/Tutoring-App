const mongoose = require('mongoose');
const User = require('./userModel');

const lessonSchema = new mongoose.Schema({
    subject: {
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

// lessonSchema.post('save', async function(next){
//     const tutor = await User.findOne({email: this.tutor_email});
//     const student = await User.findOne({email: this.student_email});

//     await this.update({_id: req.params.lesson_id},  {
//         $set: {
//           "tutor": tutor.email,
//           "student": student.email
//         }
//       })
//       next();
// })
const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;