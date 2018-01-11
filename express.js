var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});

db.once('open', function () {
    console.log('Connected to Database');
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    age : Number
});

var User = mongoose.model('User', userSchema);

var student = new User({
    name : 'Arnold',
    age : 21
});

student.save(function (err, data) {
    if (err) console.log(err);
    else console.log('Saved : ', data );
});

User.find(function (err, persons) {
    if (err) return console.error(err);
    console.log(persons);
})

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});













