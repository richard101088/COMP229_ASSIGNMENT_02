
let mongoose = require('mongoose');

// Create a model class
let contact_listModel = mongoose.Schema(
    {
        ContactName: String,
        ContactNumber: Number,
        EmailAddress: String,
        
    },
    {
        collection: "contact_list"
    }
);

module.exports = mongoose.model('Contact', contact_listModel);


// contact_list