const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('db created');
    }).on('error',function(error){
    console.log('connection error');
    });

require('./books.model');