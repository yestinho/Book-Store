const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: 'This field is required.'
    },
    category: {
        type: String,
        required: 'This field is required.'
    },
    auther: {
        type: String
    },
    isb: {
        type: String
    },
    date: {
        type: String
    }
});
var browSchema = new mongoose.Schema({
    c_name: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    book: {
        type: String
    },
    address: {
        type: String
    },
    date: {
        type: String
    }
});

// category schema
var catSchema = new mongoose.Schema({
    cat_name: {
        type: String,
        required: 'This field is required.'
    }
});

// Custom validation for email


mongoose.model('cat', catSchema);

mongoose.model('books', bookSchema);
mongoose.model('brow', browSchema);