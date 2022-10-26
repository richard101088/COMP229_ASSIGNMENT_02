
let mongoose = require('mongoose');

// Create a model class
let contact_listModel = mongoose.Schema(
    {
        Contact_Name: String,
        Contact_Number: Number,
        Email_Address: String,
        
    },
    {
        collection: "contact_list"
    }
);

module.exports = mongoose.model('Contact', contact_listModel);