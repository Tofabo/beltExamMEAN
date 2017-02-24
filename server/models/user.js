var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    items: [{type: Schema.Types.ObjectId, ref: "Item"}],
}, {timestamps: true});

mongoose.model('User', UserSchema);
