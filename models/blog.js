const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogschema = new schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    }
}, {timestamps: true });

const blog = mongoose.model('blog', blogschema);
module.exports = blog;