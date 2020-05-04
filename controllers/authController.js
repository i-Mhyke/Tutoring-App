const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('./../models/userModel');



const signToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
})
};
exports.signUp = async (req, res, next) => {
    try{
        const userExists = await User.findOne({email: req.body.email});
        if (userExists){
            return res.status(403).json({
                status: 'fail',
                error: 'Email already exists'
            })
        }

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });
    const token = signToken(user._id, user.role)
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
} catch(err){
    console.error(err);
    if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
        });
    }
    else
    res.status(500).json({
        status: 'fail',
        error: err
    });
}
next();
};

exports.login = async (req, res, next) =>{
        const {email, password} = req.body;
        if(!email || !password){
            return next (res.status(400).json({
                status: 'fail',
                error: 'Please Provide Email and Password'
            })
            );
        }
        const user = await User.findOne({ email }).select('+password');
        if(!user || !(await user.correctPassword(password, user.password))){
            return res.status(401).json({
               status: 'Fail',
               error: 'Login credentials does not match any user in our database'
            })
            next();
        }

        const token = signToken(user._id, user.role);
        res.cookie('jwt', token, {expires: new Date(Date.now() + 9999)});
        // res.header('Authorization', `Bearer ${token}`);
        res.status(200).json({
            token,
            user: {
               Email: user.email, 
               Name: user.firstName,
               Id: user._id,
               Role: user.role
            }  
        });
        next();
};
exports.logout = (req, res) =>{
    res.clearCookie('jwt');
    res.status(200).json({
        message: 'Log out successful'
    });
};
exports.protectRoutes = async (req, res, next) =>{
    try{ 
        let token;
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            token = req.headers.authorization.split(' ')[1]
        }
         else if(!token){
            return next(
                res.status(401).json({
                    status: 'Fail',
                    Error: 'You are not logged in. Please login to gain access'
                })
            )
        }; 
        console.log(token);

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET, function (err){
                if (err) {
               return next( res.status(401).json({
                    status: 'Fail',
                    Error: 'You are not authenticated!'
                })
               )}
        });
        // jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        //     if (err) {
        //        return next( res.status(401).json({
        //             status: 'Fail',
        //             Error: 'You are not authenticated!'
        //         })
        //        )
        //     } else {
        //       req.decoded = decoded;
        //       next();
        //     }
        //   });
        console.log(decoded);
        const currentUser = await User.findById(decoded.id);
        if(!currentUser){
            return next(
                    res.status(401).json({
                    status: 'Fail',
                    Error: 'User with token does not exist'
                })
            )
        }
        req.user = currentUser;
    }catch(err){
        console.log(err)
    }
    next();
};
exports.restrictTo = (...roles) =>{
    return (req, res, next) =>{
       // console.log(req);
        if(!roles.includes(req.user.role)){
            return next(
                res.status(403).json({
                    status: "fail",
                    Error: "You don't have permission to perform this action"
                })
            )
        }
        next();
    }
};
exports.restrictToAdmin = (req, res, next) =>{
    //console.log(req);
    if(!req.user.isAdmin){
        return next(
            res.status(403).json({
                status: 'fail',
                Error: 'You are not allowed to perform this action'
            })
        )
    }
    next();
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

