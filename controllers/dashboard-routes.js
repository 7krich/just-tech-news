const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// GET dashboard page
router.get('/', (req, res) => {
    // hardcoded true since user needs to be logged in to see dash
    res.render('dashboard', { loggedIn: true });
  });

module.exports = router;