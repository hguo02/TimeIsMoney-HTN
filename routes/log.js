const express = require("express");
const records = require('../models/user').records;
const User = require('../models/user').user;
const { builtinModules } = require("module");
const router = express.Router();
var { body, validationResult } = require('express-validator');

router.get('/', checkAuthenticated, async (req, res) => {
    res.render('log', { userlogs: await req.user.goals });
    // console.log(req.user.log);
});

router.post('/', async (req, res) => {
    // console.log("bruh");
    console.log(req.body.goalSelect)

    // let x = req.user.goals.find({
    //     "goals": req.body.goalSelect
    // });

    // console.log(x);
    // // console.log(x[2].progress);
    // let newValue = req.body.goalSelect - req.user.value;
    // console.log(newValue);
    // try {
    //     await User.updateOne(
    //         { "goal": req.body.goalSelect },
    //         { "$set": { "progress": newValue } });
    //     // await
    // } catch (e) {
    //     console.log("gg");
    // }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

module.exports = router;