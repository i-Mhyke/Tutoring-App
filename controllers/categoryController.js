const _= require('lodash');
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
exports.updateCategory = async (req, res, next) =>{
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