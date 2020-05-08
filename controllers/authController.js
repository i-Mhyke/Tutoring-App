const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const {promisify} = require('util');
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
        console.log(process.env);
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: 'student',
        email: req.body.email,
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
    else{
        console.log(err);
    res.status(400).json({
        status: 'fail',
        error: err
    })
}
}
next();
};
exports.tutorSignUp = async (req, res, next) => {
    try{
        const userExists = await User.findOne({email: req.body.email});
        if (userExists){
            return res.status(403).json({
                status: 'fail',
                error: 'Email already exists'
            })
        }
        console.log(process.env);
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: 'tutor',
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
    else{
        console.log(err);
    res.status(400).json({
        status: 'fail',
        error: err
    })
}
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
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if(!currentUser || currentUser.active === false){
            return next(
                    res.status(401).json({
                    status: 'Fail',
                    Error: 'User with token does not exist'
                })
            )
        }
        req.user = currentUser;
    }catch(err){
        res.status(401).json({
            status: 'Fail',
            Error: 'You are not authenticated'
        });
        console.log(err);
    }
    next();
};
exports.restrictTo = (...roles) =>{
    return (req, res, next) =>{
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
    if(!req.user.isAdmin){
        return next(
            res.status(403).json({
                status: 'fail',
                Error: 'You are not authorized to perform this action'
            })
        )
    }
    next();
};

