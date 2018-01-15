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
        .then(item => {
            res.send("User saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// student.save(function (err, data) {
//     if (err) console.log(err);
//     else console.log('Saved : ', data );
// });

// User.find(function (err, persons) {
//     if (err) return console.error(err);
//     console.log(persons);
// });

app.use(express.static(__dirname + '/Public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});













