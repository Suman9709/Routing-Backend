const express = require('express');
const { default: mongoose } = require('mongoose');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const { blogRouter } = require('./routes/blogroute');
const { healthRoute } = require('./routes/healthroute');
const { authRouter} = require('./routes/authorroute');
const { MONGO_URI } = require('./env');
const {logger} = require("./middleware/logger")
const { ensureAuth } = require('./middleware/auth');


const PORT = 8080;

const app = express();

require("dotenv").config();

//we can use mustache insted of ejs this is used to render mustache templates
app.set('view engine', 'ejs');
app.use(methodOverride("_method"))
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
// this is used to make urlparams to json eg if i gice data in form it show in url but after using urlencoded it hide the url
app.use(express.static("public"));
// sits in the middle of all requests , and logs every request
app.use(logger);
// passport
require('./config/passport')(passport)
// const ppConfig = require('./config/passport')
//ppCinfig(passport) same as above


app.use(session({
    secret:process.env['SESSION_SECRET'],
    resave:true,
    saveUninitialized:true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_message = req.flash("success-msg");

    res.locals.error_message = req.flash("error-msg");
    res.locals.error = req.flash("error");

    res.locals.author = req.author || null;

    next();
})
app.use("/health", healthRoute);
app.use("/blog", blogRouter);
app.use('/auth', authRouter)
// app.use("/author", authorRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongoose.connect(MONGO_URI)
});


