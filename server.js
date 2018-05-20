const express = require('express');
const bodyParser = require('body-parser');

const db = require('./utils/db');
const app = express();
const PORT = process.env.PORT || 5000;
const {
    User
} = require('./models/user');

app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', (req, res) => {
    res.send(`Listening on ${ PORT }`);
})

app.get('/user', (req, res) => {
    User.find().then((user) => {
        res.send({
            user
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/user', (req, res) => {
    var user = new User({
        userID: req.body.userID,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    // result = User.addUser(user);
    user.save().then((user) => {
        res.send(user);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/user/:userID', (req, res) => {
    var userID = req.params.userID;

    User.findOne({
        userID: userID
    }).then((user) => {
        res.send(user);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.put('/user/:userID', (req, res) => {
    var query = {
        userID: req.params.userID
    };

    User.findOneAndUpdate(query, {
        role: req.body.role,
        password: req.body.password
    }, {
        upsert: true
    }, (e, raw) => {
        if (e) {
            res.status(400).send('Invalid user supplied');
        }
        res.send(raw);
    });
});


app.delete('/user/:userID', (req, res) => {
    var query = {
        userID: req.params.userID
    };
    User.findOneAndRemove(query,
        (e, raw) => {
            if (e) {
                res.status(400).send('Invalid username supplied');
            }
            res.send(raw);
        });
});