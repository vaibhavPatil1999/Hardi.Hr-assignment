const mongoose = require('mongoose')
const adminModel = mongoose.Schema({
    name : {
        type : String,
        required:true
    }
})
module.exports = mongoose.model("admins",adminModel)