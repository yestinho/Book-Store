const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const books = mongoose.model('books');
const brows = mongoose.model('brow');


router.get('/', (req, res) => {
    
    res.render("books/index", {
        viewTitle: "Welcom To Bigil Book Store",
        
   
    });
});






router.get('/addb', (req, res) => {
    
    books.find((err, docs) => {
        if (!err) {
            res.render("books/addbrow", { viewTitle:'Brow Book',
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});
router.post('/addb', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var brow = new brows();
    brow.c_name = req.body.c_name;
    brow.email = req.body.email;
    brow.book = req.body.book;
    brow.address = req.body.address;
    brow.date = req.body.date;
    brow.save((err, doc) => {
        if (!err)
            res.redirect('/brow');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("books/addbrow", {
                    viewTitle: "Insert NEw Brow",
                    brow: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    brows.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/brow'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("books/addbrow", {
                    viewTitle: 'Update Books',
                    brow: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/brow', (req, res) => {
    brows.find((err, docs) => {
        if (!err) {
            res.render("books/brow", {
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
            case 'c_name':
                // @ts-ignore
                body['c_nameError'] = err.errors[field].message;
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
    brows.findById(req.params.id, (err, doc) => {
        if (!err) {


            books.find((err, docs) => {
                if (!err) {
                    res.render("books/addbrow", {
                        viewTitle: "Update Browed Books",
                        brow: doc,
                        list: docs
                    });
                   
                }
                else {
                    console.log('Error in retrieving browed books list :' + err);
                }
            });
        




            
        }
    });
});

router.get('/delete/:id', (req, res) => {
    brows.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/brow');
        }
        else { console.log('Error in brow delete :' + err); }
    });
});

// brows part

module.exports = router;