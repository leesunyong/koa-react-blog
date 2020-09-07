const mongoose = require('mongoose');
const { Schema } = mongoose;


const Post = new Schema({
    writer: {
        username: { type: String, default: 'admin'}
    },
    title: String,
    content: String,
    writtenAt: { type: Date, default: Date.now }
});


Post.statics.getList = function() {
    return this.find({}).exec();
};


module.exports = mongoose.model('Post', Post);