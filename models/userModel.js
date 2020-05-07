const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please provide your First name'],
        uppercase: true
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your Last name'],
        uppercase: true
    },
    email:{
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail, 'Please provide a valid email']
    },
    role:{
        type: String,
        enum: ['user', 'tutor'],
        default: 'user'
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password should be more than eight characters'],
        select: false
    },
    confirmPassword:{
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el){
                return el === this.password
            },
            message: 'Password is not the same'
        }
    },
    active:{
        type: Boolean,
        default: true,
        select: false
    },
    subjects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }],
},{timestamps: true});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});
userSchema.pre(/^find/, function(next){
    this.find({ active: {$ne : false}})
    next();
})
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
};

const User = mongoose.model('User', userSchema);
module.exports = User;