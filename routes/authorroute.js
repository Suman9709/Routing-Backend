const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();


authRouter.get('/login', (res, req) => {
    res.render('login')
})

authRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/blog',
    failureRedirect: '/auth/signup',
    failureFlash: true,
})
);

authRouter.get('/signup', (res, req) => {
    res.render('signup')
});


authRouter.post('/login', passport.authenticate('local-signup', {
    successRedirect: '/blog',
    failureRedirect: '/auth/signup',
    failureFlash: true,
})
);

authRouter.get('/logout', (res, req) => {
    req.logout();
    req.flash('success_msg', 'you are logged out')
    res.redirect('/auth/login')
})

module.exports = {
    authRouter,
}
