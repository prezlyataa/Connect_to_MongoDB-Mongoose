const express = require('express');
const mongoose = require('mongoose');
// const User = require('./models/user');

const app = express();
app.use(express.static(__dirname + '/Public'));

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});

db.once('open', function () {
    console.log('Connected to Database');
});

// var student = new User({
//     name : 'Arnold',
//     age : 21
// });

// student.save(function (err, data) {
//     if (err) console.log(err);
//     else console.log('Saved : ', data );
// });

// User.find(function (err, persons) {
//     if (err) return console.error(err);
//     console.log(persons);
// });

app.get('/',function(req,res){
    res.sendFile('index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});













