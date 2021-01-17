const express = require("express");
const { builtinModules } = require("module");
const router = express.Router();
var http = require('http');
var fs = require('fs');
let userData;
router.get('/', checkAuthenticated, async (req, res) => {
    userData = req.user;
    console.log('User Data', userData);

    res.render('profile', {
        user: await req.user,
        goals: ["adasd", "asdasdas"]
    });
});




console.log('Server running at http://127.0.0.1:1337/');
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

//let myChart = document.getElementById('myChart').getContext('2d');



module.exports = router;