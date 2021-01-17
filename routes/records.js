const express = require("express");
const Record = require('../models/user').records;
const User = require('../models/user').user;

const { builtinModules } = require("module");
var { body, validationResult } = require('express-validator');

// const app = express();
const router = express.Router();

router.get('/', checkAuthenticated, async (req, res) => {
    res.render('records', { records1: await req.user.goals })

})
// req.user.log.find({})
// req.user.log.filter()

router.get('/new', checkAuthenticated, (req, res) => {
    res.render('new')
});

router.post('/', async (req, res) => {
    let newRecord = await new Record({
        goalType: req.body.goalType,
        goal: req.body.goal,
        value: req.body.value,
        progress: req.body.value, // if it fails then this is problem
        createdAt: req.body.createdAt
    })
    try {
        newGoals = req.user.goals;
        newGoals.push(newRecord);
        await User.update(
            { "username": req.user.username },
            { $set: { 'goals': newGoals } });
        await newRecord.save()
    } catch (e) {
        res.render('records', { records1: req.user.goals })
    }
    res.render('records', { records1: req.user.goals })
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

module.exports = router;
