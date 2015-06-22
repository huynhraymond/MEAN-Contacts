
var mongoose = require('mongoose');

var ContactModel = mongoose.model('contact', {
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    tel: {
        type: String,
        required: true
    }
});

module.exports = ContactModel;