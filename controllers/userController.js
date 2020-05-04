const User = require('./../models/userModel');

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
        await User.findByIdAndUpdate(req.user.id, {active: false});
        res.status(204).json({
            status: "Success",
            data: null
        });
    }catch(err){
        console.log(err)
    }
    next();
};












































// exports.userById = (req, res, next, id) =>{
//     User.find(ObjectId(id))
//     .exec((err, user) =>{
//         if(err || !user){
//             return next(res.status(500).json({
//                 error: err
//             })
//             )}
//         req.user = user;
//         next();
//     })
//     next();
// };

