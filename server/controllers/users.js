var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');


module.exports = (function(){
    return {
        login: function(req, res){
            //find user by name
            User.findOne({name: req.body.name}, function(err, user){
                //if user doesn't exist, create and save that user and save that user in session
                if(!user){
                    var newUser = new User(req.body);
                    newUser.save(function(err){
                        if(err){
                            return res.json({error: "Something went wrong. Please try again!", status:false})
                        }
                        req.session.user = newUser;
                        req.session.save();
                        res.json({status: true});
                    })
                }
                //if user exist already, save that user to session
                else{
                    req.session.user = user;
                    req.session.save();
                    res.json({status: true});
                }
            })
        },

        checkUser: function(req, res){
            //check if there is a user in session, if not redirect to login page
            if(!req.session || !req.session.user){
                res.json(null);
            }else{
                User.findOne({_id:req.session.user._id}).populate("items").exec(function(err, user){
                    res.json(user);
                });
                
            }
        },

        logout: function(req, res){
            req.session.destroy();
            res.redirect('/')
        },

        getall: function(req, res){
            //find all users
            User.find({}, function(err, users){
                if(err){
                    return res.json({error: "Something went wrong. Please try again!", status:false});
                }
                res.json({status:true, users: users})
            })
        },

        getone: function(req, res){
            //find user by id and populate items
            User.findOne({_id:req.body.id}).populate("items").exec(function(err, user){
                 if(err){
                    return res.json({error: "Something went wrong. Please try again!", status:false});
                }
                res.json({status:true, user: user})
            })
        },
    }
})()
