var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    name: {type: String},
    password: {type: String}
});


module.exports = db.model('User', UserSchema);