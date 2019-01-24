require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const bookcontroller = require('./controllers/books');
const add = require('./controllers/add');
const addcat = require('./controllers/addcat');


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.use(express.static(__dirname + '/assets/'));
app.use(express.static('img'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'header', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(4000, () => {
    console.log('Express server started at port : 4000');
});
app.use('/add', add);
app.use('/addcat', addcat);
app.use('/', bookcontroller);


