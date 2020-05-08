const _= require('lodash');
const Subject = require('./../models/subjectModel');
const User = require('./../models/userModel');

exports.createSubject = async (req, res, next) => {
    try{
        const subject = await Subject.create({
            title: req.body.title,
            textbook: req.body.textbook,
            category: req.params.category_id
        });
        res.status(201).json({
            status: 'success',
            subject
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }
};
exports.getAllSubjects = async (req, res, next) =>{
    try{
        const subjects = await Subject.find()
        .populate("category", "name description");
            res.status(200).json({
                status: "OK",
                results: subjects.length,
                subjects
            })
    }catch(err){
            res.status(400).json({
                status: 'Fail',
                Error: 'Could not get subjects',
                err
            })
    }
    next();
};
exports.getSubjectInCategory = async (req, res, next) =>{
    try{
        const categorySubjects = await Subject.find({category: req.params.category_id}).sort(req.query.sort)
        .populate("category","name");
            res.status(200).json({
                status: 'Success',
                categorySubjects
            });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            error: err
        })
    }
};
exports.updateSubject = async (req, res, next) =>{
    let subject = await Subject.findById({_id: req.params.subject_id});
        subject = _.extend(subject, req.body)
        subject.save(err =>{
            if(err){
                res.status(400).json({
                    status: 'Fail',
                    error : "There was a problem updating the subject!.",
                    err
                })
            }
            res.status(200).json({
                Status: 'Success',
                subject
            })
        });
};
exports.deleteSubject = async (req, res, next) =>{
    try{
        await Subject.findByIdAndDelete({_id: req.params.subject_id}, function(err, data){
            if(err){
                res.status(400).json({
                    status: 'Fail',
                    error: err
                })
            }
            res.status(204).json({
                status: 'Success',
                data
            })
        });
    }catch(err){
        console.log(err);
    }
};
exports.getSubjectById = async (req, res, next) =>{
    try{
        const subject = await Subject.findById({_id: req.params.subject_id})
        .populate("category", "name description");
        res.status(200).json({
            status: 'Success',
            subject
        })
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            err
        })
    }
};
exports.getSubjectsByTitle = async (req, res, next) =>{
    try{
        console.log(req);
        const subjects = await Subject.find({title: req.query.subject.toUpperCase()})
        .populate("category", "name description");
            if(subjects.length === 0){
             return res.status(400).json({
                    status: 'fail',
                    message: "No records found"
                })
            }
                res.status(200).json({
                    status: 'sucess',
                    subjects
                })
            console.log(subjects);
    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'Fail',
            err
        })
    }
    next();
};
exports.getTutorsBySubject = async (req, res, next) =>{
    try{
        const tutors = await User.find({subjects: req.params.subject_id}).sort(req.query.sort)
        .populate("subjects", "title textbook");
        if(tutors.length === 0){
            return res.status(400).json({
                   status: 'fail',
                   message: "No tutor found for this subject"
               })
           }
            res.status(200).json({
                status: 'Success',
                tutors
            })
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            err
        })
    }
};