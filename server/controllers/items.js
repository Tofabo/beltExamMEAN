var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

module.exports = (function () {
    return {
        add: function (req, res) {
            User.findOne({ _id: req.body._owner }, function (err, user) {
                var item = new Item(req.body);
                item.save(function (err) {
                    user.items.push(item);
                    user.save(function (err) {
                        if(err){
                             return res.json({ error: "Something went wrong. Please try again!", status: false });
                        }
                        else if (item.taggeduser) {
                            User.findOne({ _id: item.taggeduser }, function (err, user2) {
                                user2.items.push(item);
                                user2.save(function (err) {
                                    if (err) {
                                        return res.json({ error: "Something went wrong. Please try again!", status: false })
                                    } else {
                                        res.redirect('/'); //think abour redirect here
                                        // res.json({status:true});
                                    }
                                })
                            })
                        }
                        else{
                                res.redirect('/');
                                //  res.json({ status: true }) //think abour redirect here
                        }
                    })
                })
            })
        },
        changestatus: function (req, res) {
            Item.findOne({ _id: req.body.id }, function (err, item) {
                if (err) {
                    return res.json({ error: "Something went wrong. Please try again!", status: false })
                } else {
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

