// create a reference to the model

let ContactModel = require('../models/contact_list');


// Contact List function
module.exports.contact_listList = function(req, res, next) {  
    ContactModel.find((err, contact_listList) => {
        //console.log(contact_listList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('contact_list/list', {
                title: 'Contact List', 
                ContactList: contact_listList,
                userName: req.user ? req.user.username : ''
            })            
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
        _id: req.body.id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        size : {
            h: req.body.size_h,
            w: req.body.size_w,
            uom: req.body.size_uom,
        },
        tags: req.body.tags.split(",").map(word => word.trim())
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
            res.redirect('/contact_list/list');
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
            // refresh the book list
            res.redirect('/contact_list/list');
        }
    });

}

//displayAddPage function 
module.exports.displayAddPage = (req, res, next) => {

    let newItem = ContactModel();

    res.render('contact_list/add_edit', {
        title: 'Add a new Item',
        item: newItem,
        userName: req.user ? req.user.username : ''
    })          

}

//processAddPage function 
module.exports.processAddPage = (req, res, next) => {

    let newItem = ContactModel({
        _id: req.body.id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        size : {
            h: req.body.size_h,
            w: req.body.size_w,
            uom: req.body.size_uom,
        },
        tags: req.body.tags.split(",").map(word => word.trim())
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
            res.redirect('/contact_list/list');
        }
    });
    
}