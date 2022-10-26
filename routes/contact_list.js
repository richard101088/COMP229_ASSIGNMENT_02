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

/* GET list of items */
router.get('/list', contact_listController.contact_listList);

// Routers for edit
router.get('/edit/:id', requireAuth, contact_listController.displayEditPage);
router.post('/edit/:id', requireAuth, contact_listController.processEditPage);

// Delete
router.get('/delete/:id', requireAuth, contact_listController.performDelete);


/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, contact_listController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, contact_listController.processAddPage);

module.exports = router;