var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: {type:String, minlength: 5},
    description: {type:String, minlength: 10},
    _owner: {type: Schema.Types.ObjectId, ref: 'User'},
    owner: Object,
    taggeduser: Object,
    status: {type:String, default: "unchecked"}
}, {timestamps: true});

mongoose.model('Item', ItemSchema);
