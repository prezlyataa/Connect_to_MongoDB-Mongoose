const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const bodyParser = require('body-parser');
const url = 'mongodb://localhost/test';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(url);

const db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});

db.once('open', function () {
    console.log('Connected to Database');
});

app.post('/new', function (req,res) {
    new User({
        name: req.body.name,
        age: req.body.age
    }).save()
        .then(user => {
            res.send("User saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.get('/view', function (req,res) {
    User.find({}, function (err,persons) {
        if (err) res.send('Error');
        else res.send(persons);
    })
});

// student.save(function (err, data) {
//     if (err) console.log(err);
//     else console.log('Saved : ', data );
// });

// User.find(function (err, persons) {
//     if (err) return console.error(err);
//     console.log(persons);
// });

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});













