require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

// public assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use('/coverage', express.static(path.join(__dirname, '..', 'coverage')));

// ejs for view templates
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// load route


// server
const port = process.env.PORT || 3000;
app.server = app.listen(port);
console.log(`listening on port ${port}`);
const { applicationDefault } = require('firebase-admin/app');
var admin = require("firebase-admin");


const firebaseConfig = {
    credential: applicationDefault(),
    databaseURL: "https://leadtechnique2022-default-rtdb.firebaseio.com/"
};
    
admin.initializeApp(firebaseConfig);
const db = admin.database();
require('./route')(app, db);
require('./collector')(app, db);


module.exports = app;
