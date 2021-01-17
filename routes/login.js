const express = require('express');
const router = express.Router();
const { builtinModules } = require("module");
const bcrypt = require('bcrypt');
const User = require('../models/user').user;
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');


let { body, validationResult } = require('express-validator');

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('login');
    // let userInfo = user.find({
    //     username: req.body.loginUsername,
    //     password: req.body.loginPassword
    // });
});

// router.post('/', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))



function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile')
    }
    next()
}


// router.post('/', async (req, res, next) => {
//     // passport.authenticate('local', {
//     //     successRedirect: '/profile',
//     //     failureRedirect: '/login',
//     //     failureFlash: true
//     // })(req, res, next);
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             errors: errors.array()
//         });
//     }

//     const { username, password } = req.body;
//     try {
//         let user = await User.findOne({
//             username
//         });

//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect username."
//             });
//             // const usernameField = document.getElementById('loginUsername');

//             // usernameField.style.border = "1px solid red"

//         }

//         // console.log("bruh");

//         const isMatchingPass = await bcrypt.compare(password, user.password);
//         // console.log("bruh")

//         if (!isMatchingPass) {
//             return res.status(400).json({
//                 message: "Incorrect password."
//             });
//         } else {
//             res.redirect('profile');
//         }



//     } catch (e) {
//         console.error(e);
//         res.status(500).json({
//             message: "Server error."
//         });
//     }
// });

module.exports = router;