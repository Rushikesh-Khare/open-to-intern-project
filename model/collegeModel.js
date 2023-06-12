const mongoose = require('mongoose');

const collegeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        example: "iith"
    },
    fullName: {
        type: String,
        required: true
    },

    logoLink: {
        type: String,
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps : true});

const college = mongoose.model('college', collegeModel);
module.exports = college;