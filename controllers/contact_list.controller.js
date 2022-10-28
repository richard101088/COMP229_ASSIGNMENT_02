// create a reference to the model -from database
let ContactModel = require('../models/contact_list');


// Contact List function -done -DISPLAYLIST is a function from router / richard_list - is a db declaration varName
module.exports.DISPLAYLIST = function(req, res, next) {  
    ContactModel.find((err, richard_list) => {
        console.log(richard_list);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //contact_list - from views ejs file
            res.render('contact_list/list', {
                title: 'Contact List', 
                ContactList: richard_list,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}

//displayAddPage function (within ejs files are attributes (Ang ipapasok sa ejs file are title,item,username )
module.exports.displayAddPage = (req, res, next) => {

    let newItem = ContactModel();
    //contact_list
    res.render('contact_list/add_edit', {
        title: 'Add a new Item',
        item: newItem,
        userName: req.user ? req.user.username : ''
    })          

}

//processAddPage function 
module.exports.processAddPage = (req, res, next) => {

    let newItem = ContactModel({
        _id:  req.body.id,
        ContactName: req.body.ContactName,
        ContactNumber: req.body.ContactNumber,
        EmailAddress: req.body.EmailAddress
    });

    ContactModel.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            
            console.log(item);
            res.redirect('/contactList/list');
            console.log('Test');
        }
    });
    
}

// displayEditPage function
module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    ContactModel.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contact_list/add_edit', {
                title: 'Edit Item', 
                item: itemToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

//processEditPage function 
module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id

    let updatedItem = ContactModel({
        _id:  req.body.id,
        ContactName: req.body.ContactName,
        ContactNumber: req.body.ContactNumber,
        EmailAddress: req.body.EmailAddress
    });

    ContactModel.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/contactList/add_edit');
        }
    });

}

//performDelete function 
module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;


    ContactModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list //contact_list
            res.redirect('/contactList/list');
        }
    });

}



