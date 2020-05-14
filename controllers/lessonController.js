const User = require('./../models/userModel');
const Lesson = require("./../models/lessonModel");
const _ = require('lodash');

exports.adminCreateLesson = async (req, res, next) =>{
    try{    
       const tutor = await User.findOne({email: req.body.tutor_email.toLowerCase()});
       const student = await User.findOne({email: req.body.student_email.toLowerCase()});
       if(tutor == null){
           res.status(500).json({
               status: 'fail',
               message: 'Tutor not found'
           })
       }else if(student == null){
           res.status(500).json({
               status: 'fail',
               message: 'Student not found'
           })
       }
       const lesson = await Lesson.create({
           subject: req.body.subject,
           topic: req.body.topic,
           tutor_email: req.body.tutor_email,
           tutor: tutor.id,
           student_email: req.body.student_email,
           student: student.id
       });
            res.status(201).json({
                status: 'success',
                lesson
            });

    }catch(err){
        console.log(err)
        res.status(500).json({
            Status: 'Fail',
            err
        })
    }
};
exports.studentBookLesson = async (req, res, next) =>{
    try{
        const tutor = await User.findOne({email: req.body.tutor_email.toLowerCase()});
       if(tutor == null){
           res.status(500).json({
               status: 'fail',
               message: 'Tutor not found'
           })
       }
       const lesson = await Lesson.create({
           subject: req.body.subject,
           tutor_email: req.body.tutor_email,
           tutor: tutor.id,
           student_email: req.user.email,
           student: req.user.id
       });
            res.status(201).json({
                status: 'success',
                lesson
            });
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            Error: 'An error occured while creating lesson',
            err
        })
    }
};
exports.getAllLessons = async (req, res, next) =>{
    try{
        const lessons = await Lesson.find()
        .populate("tutor", "-__v -subjects -isAdmin").populate("student", "-__v -subjects -isAdmin");
        res.status(200).json({
            Status: 'Success',
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
}