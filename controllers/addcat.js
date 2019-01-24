
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cats = mongoose.model('cat');


router.get('/', (req, res) => {
    
    res.render("books/addcat", {
        viewTitle: "Insert new category",
        
   
    });
});


router.post('/addcat', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var cat = new cats();
    cat.cat_name = req.body.cat_name;
    
    cat.save((err, doc) => {
        if (!err)
            res.redirect('./cat');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("books/addcat", {
                    viewTitle: "Insert NEw Cateory",
                    cat: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    cats.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('./cat'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("books/cat", {
                    viewTitle: 'Update category',
                    cat: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/cat', (req, res) => {
    cats.find((err, docs) => {
        if (!err) {
            res.render("books/cat", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving category list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    // @ts-ignore
    for (field in err.errors) {
        // @ts-ignore
        switch (err.errors[field].path) {
            case 'cat_name':
                // @ts-ignore
                body['catnameError'] = err.errors[field].message;
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    cats.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("books/addcat", {
                viewTitle: "Update Category",
                cat: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    cats.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('../cat');
        }
        else { console.log('Error in Category delete :' + err); }
    });
});
module.exports = router;