const express = require('express');
const mongoose = require("mongoose");
const recordsRouter = require('./routes/records');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const logRouter = require('./routes/log');
const passport = require('passport');
const methodOverride = require('method-override');

const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash')
const session = require('express-session')
const expressValidator = require('express-validator');
const initializePassport = require('./config/passport')

const port = process.env.PORT || 5000;
//app.use(bodyParser.json());


//app.use('flash');
require('dotenv').config();

const uri = process.env.ATLAS_URI;

// mongoose.connect('mongodb://localhost/timeismoney', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
let User = require("./models/user");




initializePassport(
    passport,
    async username => {
        console.log(User.find({ 'username': username }));
        return await User.find({ 'username': username })
    },
    id => {
        console.log(User.find({ 'id': id }));
        return User.find({ 'id': id })
    }
)

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash())
app.use(session({
    secret: "ddssdffd",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
require('./config/passport')(passport);


app.use('/register', registerRouter);
app.use('/records', recordsRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/log', logRouter);

// app.use('/records', recordsRouter);

// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", checkNotAuthenticated, (req, res) => {
    res.render("index");
});


app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})
// module.exports = router;
// app.use(express.static(path.join(__dirname, 'public')));


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile')
    }
    next()
}

app.listen(5000)
