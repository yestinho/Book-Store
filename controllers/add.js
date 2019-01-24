
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const books = mongoose.model('books');
const cats = mongoose.model('cat');


router.get('/', (req, res) => {
    
    cats.find((err, docs) => {
        if (!err) {
            res.render("books/add", { viewTitle:'Add New Book',
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


router.post('/add', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var book = new books();
    book.bookname = req.body.bookname;
    book.category = req.body.category;
    book.auther = req.body.auther;
    book.isb = req.body.isb;
    book.date = req.body.date;
    book.save((err, doc) => {
        if (!err)
            res.redirect('./list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("books/add", {
                    viewTitle: "Insert NEw Book",
                    book: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    books.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('./list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("books/add", {
                    viewTitle: 'Update Books',
                    book: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    books.find((err, docs) => {
        if (!err) {
            res.render("books/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    // @ts-ignore
    for (field in err.errors) {
        // @ts-ignore
        switch (err.errors[field].path) {
            case 'bookname':
                // @ts-ignore
                body['bookameError'] = err.errors[field].message;
                break;
            case 'auther':
                // @ts-ignore
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
                case 'isb':
                // @ts-ignore
                body['cityError'] = err.errors[field].message;
                break;
        }
    }
}



router.get('/:id', (req, res) => {
    books.findById(req.params.id, (err, doc) => {
        if (!err) {
            cats.find((err, docs) => {
                if (!err) {
                    res.render("books/add", { viewtile:'Update Book',
                    book:doc,
                        list: docs
                    });
                }
                else {
                    console.log('Error in retrieving employee list :' + err);
                }
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    books.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('../list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
module.exports = router;