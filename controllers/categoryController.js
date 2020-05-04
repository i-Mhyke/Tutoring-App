const Category = require('./../models/categoryModel');
const Subject = require('./../models/subjectModel');

exports.createCategory = async (req, res, next) =>{
    try{
        const category = await Category.create({
            name : req.body.name,
            description: req.body.description
        });
        res.status(201).json({
            status: 'Success',
            category
        }); 
    }catch(err){
        res.status(500).json({
            status: 'fail',
            error: err
        })
    }
};
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
        res.status(500).json({
            status: 'fail',
            error: err
        })
    }
};
exports.getCategories = async (req, res, next) =>{
    try{
        const categories = await Category.find();
        res.status(200).json({
            status: 'success',
            categories
        });

    }catch(err){
        res.status(400).json({
            status: 'Fail',
            error: err
        })
    }
};
exports.getSubjectInCategory = async (req, res, next) =>{
    try{
        const categorySubjects = await Subject.find({category: req.params.category_id})
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
}