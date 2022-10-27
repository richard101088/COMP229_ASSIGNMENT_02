var express = require('express');
var router = express.Router();

let contact_listController = require('../controllers/contact_list.controller');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

/* GET list of items -DONE*/
router.get('/list', contact_listController.list);

/* GET Route for displaying the Add page - CREATE Operation -done*/
router.get('/add_edit', requireAuth, contact_listController.displayAddPage);

// Delete -done
router.get('/delete/:id', requireAuth, contact_listController.performDelete);




/* POST Route for processing the Add page - CREATE Operation -*/
router.post('/add_edit', requireAuth, contact_listController.processAddPage);

// Routers for edit
router.get('/add_edit', requireAuth, contact_listController.displayEditPage);
router.post('/add_edit/:id', requireAuth, contact_listController.processEditPage);

// /:id'







//get= Display , post = execute
//Note: 

module.exports = router;