const express = require("express")
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express();

//Set up View engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookiekey]
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to database
mongoose.connect(keys.mongodb.dbURI), () => {
    console.log('Connected to mongodb')
}


//Set up Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//Create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});


app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Server has started");
});