<<<<<<< Updated upstream
const Category = require('./../models/categoryModel');
const Subject = require('./../models/subjectModel');
const User = require('./../models/userModel');
=======
const _= require('lodash');
const Category = require('./../models/categoryModel');
const Subject = require('./../models/subjectModel');
>>>>>>> Stashed changes

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
exports.updateCategory = async (req, res, next) =>{
<<<<<<< Updated upstream
    await Category.findOneAndUpdate({_id: req.params.category_id}, {name: req.body.name}, {new:true},
         function(err, category){
        if (err) return res.status(500).json(
            {error : "There was a problem updating the category!.",
            err
        });
            
          res.status(200).send(category);
    });
=======
    let category = await Category.findById({_id: req.params.category_id});
        category = _.extend(category, req.body)
        category.save(err =>{
            if(err){
                res.status(400).json({
                    status: 'Fail',
                    error : "There was a problem updating the category!.",
                    err
                })
            }
            res.status(200).json({
                Status: 'Success',
                category
            })
        });
>>>>>>> Stashed changes
};
exports.deleteCategory = async (req, res, next) =>{
    try {
        const category = await Category.findByIdAndDelete({_id: req.params.category_id });
        const subject = await Subject.deleteMany({category: req.params.category_id }, function(err){
            if(err){
                res.status(500).json({
                    status: 'fail',
                    err
                })
            }
            res.status(204).json({
                status: 'Success',
                data: null
            })
        });
        console.log(category, subject);  
      } catch(err) {
        console.log(err)
      }
};
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
    try{
        await Subject.findByIdAndUpdate({_id: req.params.subject_id}, {title: req.body.title}, {new: true}, function(err, subject){
            if(err){ res.status(500).json({
                status: 'fail',
                error: err
            })
            }
            res.status(200).json({subject});
        })
    }catch(err){
        console.log(err)
    }
};
exports.deleteSubject = async (req, res, next) =>{
    try{
        await Subject.findByIdAndDelete({_id: req.params.subject_id}, function(err, data){
            if(err){
                res.status(500).json({
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
        res.status(500).json({
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
             return res.status(500).json({
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
        res.status(500).json({
            status: 'Fail',
            err
        })
    }
};
exports.getTutorsBySubject = async (req, res, next) =>{
    try{
        const tutors = await User.find({subjects: req.params.subject_id}).sort(req.query.sort)
        .populate("subjects", "title textbook");
        res.status(200).json({
            status: 'Success',
            tutors
        })
    }catch(err){
        res.status(200).json({
            status: 'Fail',
            err
        })
    }
};
=======
};
>>>>>>> Stashed changes
