var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

module.exports = (function () {
    return {
        add: function (req, res) {
            //find user who created item
            User.findOne({ _id: req.body._owner }, function (err, user) {
                //create item schema, push to user items and save both
                var item = new Item(req.body);
                item.save(function (err) {
                    user.items.push(item);
                    user.save(function (err) {
                        if(err){
                             return res.json({ error: "Something went wrong. Please try again!", status: false });
                        }
                        //if user has tagged a friend, find that friend and save item to their items array
                        else if (item.taggeduser) {
                            User.findOne({ _id: item.taggeduser }, function (err, user2) {
                                user2.items.push(item);
                                user2.save(function (err) {
                                    if (err) {
                                        return res.json({ error: "Something went wrong. Please try again!", status: false });
                                    } else {
                                        res.redirect('/'); 
                                    }
                                })
                            })
                        }
                        //if no tagged user
                        else{
                                res.redirect('/');
                        }
                    })
                })
            })
        },
        changestatus: function (req, res) {
            //find item
            Item.findOne({ _id: req.body.id }, function (err, item) {
                if (err) {
                    return res.json({ error: "Something went wrong. Please try again!", status: false });
                }
                //change status and save
                else {
                    if (item.status == "unchecked") {
                        item.status = "checked";
                    }
                    else {
                        item.status = "unchecked";
                    }
                    item.save(function (err) {
                        if (err) {
                            return res.json({ error: "Something went wrong. Please try again!", status: false })
                        } else {
                            res.json({ status: true, item: item });
                        }
                    })
                }
            })
        }
    }
})()

