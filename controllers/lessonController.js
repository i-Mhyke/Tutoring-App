const Lesson = require("./../models/lessonModel");
const Subject = require('./../models/subjectModel');
const Category = require('./../models/categoryModel');

exports.createLesson = async (req, res, next) =>{
    try{
        const lessons = await Lesson.find()
        .populate("tutor", "-__v -subjects -isAdmin").populate("student", "-__v -subjects -isAdmin -createdAt -updatedAt");
        res.status(200).json({
            Status: 'Success',
            result: lessons.length,
            lessons
        })
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            Error: 'Error getting lessons'
        })
    }
};
exports.updateLesson = async (req, res, next) =>{
    try{
        if(req.body.tutor_email){
            const tutor = await User.findOne({email: req.body.tutor_email.toLowerCase()});
            if(tutor == null){
                res.status(500).json({
                    status: 'fail',
                    message: 'Tutor not found'
                })
            }
            await Lesson.findByIdAndUpdate({_id: req.params.lesson_id}, {tutor: tutor.id});
        }
        else if(req.body.student_email){
            const student = await User.findOne({email: req.body.student_email.toLowerCase()});
                if(student == null){
                 return res.status(500).json({
                        status: 'fail',
                        message: 'Student not found'
                    })
                }
            await Lesson.findByIdAndUpdate({_id: req.params.lesson_id}, {student: student.id});
            }
        let lesson = await Lesson.findById({_id: req.params.lesson_id});
        lesson = _.extend(lesson, req.body)
        lesson.save(err =>{
            if(err){
                res.status(400).json({
                    status: 'Fail',
                    err
                })
            }
            res.status(200).json({
                Status: 'Success',
                lesson
            })
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            Status: 'Fail',
            Error: 'Something went wrong',
            err
        })
    }
};
exports.deleteLesson = async (req, res, next) =>{
    try{
        await Lesson.findByIdAndRemove({_id: req.params.lesson_id});
        res.status(204).json({
            status: 'Success',
            data: null
        })
    }catch(err){
        res.status(500).json({
            status: 'Fail',
            err
        })
    }
};
exports.tutorLessons = async (req, res, next) =>{
    try{
        const myLessons = await Lesson.find({tutor: req.user.id})
        .populate("tutor", "-__v -subjects -isAdmin").populate("student", "-__v -subjects -isAdmin -createdAt -updatedAt");
        if(myLessons == null){
            res.status(400).json({
                Message: "You don't have any lesson at this time "
            })
        }
        res.status(200).json({
            status: 'Success',
            result: myLessons.length,
            myLessons
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            Error: 'Something went wrong',
            err
        })
    }
};
exports.studentLessons = async (req, res, next) =>{
    try{
        const myLessons = await Lesson.find({student: req.user.id})
        .populate("tutor", "-__v -subjects -isAdmin").populate("student", "-__v -subjects -isAdmin -createdAt -updatedAt");
        if(myLessons == null){
            res.status(400).json({
                Message: "You don't have any lesson at this time "
            })
        }
        res.status(200).json({
            status: 'Success',
            result: myLessons.length,
            myLessons
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            Error: 'Something went wrong',
            err
        })
    }
};