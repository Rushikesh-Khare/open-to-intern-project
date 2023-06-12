const mongoose = require('mongoose');

const internModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Regular expression for email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email address',
        }
    },

    mobile: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Regular expression for mobile number validation
                const mobileRegex = /^[0-9]{10}$/;
                return mobileRegex.test(value);
            },
            message: 'Invalid mobileeeeee number',
        }
    },

    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "college"
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const intern = mongoose.model('Intern', internModel);
module.exports = intern;