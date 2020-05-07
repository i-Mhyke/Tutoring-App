const Lesson = require("./../models/lessonModel");
const Subject = require('./../models/subjectModel');
const Category = require('./../models/categoryModel');

exports.createLesson = async (req, res, next) =>{
    try{
        const subject = await Subject.findById({category: req.params.category_id});
        const category = await Category.findById({_id: req.params.category_id});

        const lesson = await Lesson.create({
            topic: req.body.topic,
            category: req.params.category_id,
            subject: req.body.subject.toUpperCase(),
            tutor: req.params.tutor_id
        });
        res.status(200).json({
            Status: 'Success',
            lesson
        })
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            err
        })
    }
};