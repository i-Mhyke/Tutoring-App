const _ = require('lodash');
const User = require('./../models/userModel');
const Subject = require('./../models/subjectModel');

exports.assignAdminRole = async (req, res) => {
    let updatedUser;
    await User.findOne({_id: req.params.user_id}, 'role', function(err, person){
        if(err) return res.status(500).send("something went wrong");
        updatedUser = person;
    });
    if(updatedUser.role === "tutor"){
        User.findOneAndUpdate({_id: req.params.user_id}, {isAdmin: true}, {new: true}, function (err, user) {
          if (err) return res.status(500).send("There was a problem updating the user.");
          res.status(200).send(user);
        });
    }else{
        res.status(400).send("Students are not allowed to be admin");
    }
};
exports.deleteUser = async (req, res, next) =>{
    try{
        await User.findByIdAndUpdate(req.params.user_id, {active: false});
        res.status(204).json({
            status: "Success",
            data: null
        });
    }catch(err){
        console.log(err)
        res.status(400).json({
            error: 'Error occured!'
        })
    }
    next();
};
exports.deleteMe = async (req, res, next) =>{
    try{
        await User.findByIdAndUpdate(req.user.id, {active: false});
        res.status(204).json({
            status: "Success",
            data: null
        });
    }catch(err){
        console.log(err)
        res.status(400).json({
            error: 'Error occured!'
        })
    }
    next();
};
exports.updateUser = async (req, res, next) =>{
    let user = await User.findById({_id: req.params.user_id});
        user = _.extend(user, req.body)
        user.save(err =>{
            if(err){
                res.status(400).json({
                    status: 'Fail',
                    error : "There was a problem updating the user!.",
                    err
                })
            }
            res.status(200).json({
                Status: 'Success',
                user
            })
        });
};
exports.updateMe = async (req, res, next) =>{
    let user = await User.findById({_id: req.user.id});
        user = _.extend(user, req.body)
        user.save(err =>{
            if(err){
                res.status(400).json({
                    status: 'Fail',
                    error : "There was a problem updating your details!.",
                    err
                })
            }
            res.status(200).json({
                Status: 'Success',
                user
            })
        });
};
exports.getAllUsers = async (req, res, next) =>{
    try{
        const allUsers = await User.find();

        if(allUsers){
            return res.status(200).json(allUsers);
        }
    }catch(err){
        console.log(err)
    }
};
exports.getUserById = async (req, res, next) =>{
    try{
        await User.findById({_id: req.params.user_id}, function(err, user){
            if(err){
                res.status(400).json({
                    status: 'Fail',
                    error: 'Could not get users',
                    err
                })
            }
            res.status(200).json({
                status: "Success",
                user
            })
        })
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            err
        })
    }
};
exports.getAllTutors = async (req, res, next) =>{
    try{
       const allUsers = await User.find().sort(req.query.sort);
       const tutors = new Array();
       allUsers.map((user) =>{
           if(user.role === "tutor"){
             return tutors.push(user);
           }
       })
        res.status(200).json({
            status: 'Success',
            tutors
        })
    }catch(err){
            res.status(500).json({
                status: 'Fail',
                message: 'Tutors not found'
            })
    }
};
exports.getAllStudents = async (req, res, next) =>{
    try{
       const allUsers = await User.find().sort(req.query.sort);
       console.log(req);
       const students = new Array();
       allUsers.map((user) =>{
           if(user.role === "user"){
             return students.push(user);
           }
       })
        res.status(200).json({
            status: 'Success',
            students
        })
    }catch(err){
            res.status(500).json({
                status: 'Fail',
                message: 'Students not found'
            })
    }
};
exports.tutorRegisterSubject = async (req, res, next) =>{
    try{
    const tutor = await User.findByIdAndUpdate({_id: req.user.id}, {$push: {subjects: req.params.subject_id}},           {new: true, useFindAndModify: false});
            res.status(200).json({
                Status: 'Success',
                tutor
            })
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            error: 'Could not register for subject',
            err
        })
    }
};
exports.getSubjectsregistered = async (req, res, next) =>{
    try{
        const mySubjects = await Subject.find({_id: req.user.subjects})
        .populate("category", "name description");
        res.status(200).json({
            Status: 'Success',
            mySubjects
        })
    }catch(err){
        res.status(500).json({
            status: 'fail',
            error: 'Could not get subjects registered',
            err
        })
    }
};
 exports.deleteRegisteredSubject = async (req, res, next) =>{
    try{
        const subject = await User.findByIdAndUpdate({_id: req.user.id}, {$pull: {subjects: req.params.subject_id}}, {new: true});
            res.status(200).json({
                status: 'Success',
                subject
            })
    }catch(err){
        res.status(500).json({
            status: 'Fail',
            error: 'Could not delete subject',
            err
        })
    }
};
