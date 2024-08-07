const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();


authRouter.get('/login', (req, res) => {
    res.render('login',{title: 'Login'})
})

authRouter.post('/login',
    passport.authenticate('local-login', {
        successRedirect: '/blog',
        failureRedirect: '/auth/signup',
        failureFlash: true,
    })
);

authRouter.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' })
});


authRouter.post('/login', passport.authenticate('local-signup', {
    successRedirect: '/blog',
    failureRedirect: '/auth/signup',
    failureFlash: true,
})
);

authRouter.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'you are logged out')
    res.redirect('/auth/login')
})

module.exports = {
    authRouter,
}
