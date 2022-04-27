const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access User model & run .findAll() method to read all users
    // much like SELECT * FROM users;
    User.findAll({
        // use attributes as the key & instruct query to exclude password column
        // needed to keep user info private
        // use array so we can add addtl later if needed
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    // access User model & find read singular id
    // much like SELECT * FROM users WHERE id = 1;
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        // if no users with that id ar found
        if (!dbUserData) {
            // let user know response was recieved but no users found
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Kyle', email: '7krich@gmail.com', password: 'password123'}
    // created acts much like INSERT INTO users (username, email, password) VALUES ("","","");
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Kyle', email: '7krich@gmail.com', password: 'password123'}
    // if req.body has exact key/value pairs to match the model, we can use just req.body instead
    // updated combines params for created & looking up data
    // sql version = UPDATE users SET username = "", email = "", password = "" WHERE id = 1;
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;