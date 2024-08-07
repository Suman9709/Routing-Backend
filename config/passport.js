const LocalStrategy = require("passport-local").Strategy;
const Author = require("../models/author.model");

module.exports = function (passport) {
    passport.serializeUser((author, done) => {
        done(null, author.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const author = await Author.findById(id);
            done(null, author);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {
                    const existingAuthor = await Author.findOne({ email });
                    if (existingAuthor) {
                        return done(null, false, req.flash('signupMessage', 'The email is already taken'));
                    }
                    const newAuthor = new Author({
                        name: req.body.name,
                        email,
                        password,
                    });
                    await newAuthor.save();
                    return done(null, newAuthor);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.use(
        'local-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {
                    const author = await Author.findOne({ email });
                    if (!author) {
                        return done(null, false, req.flash('loginMessage', 'No user found'));
                    }
                    const isMatch = await author.comparePassword(password);
                    if (!isMatch) {
                        return done(null, false, req.flash('loginMessage', 'Email and password did not match'));
                    }
                    return done(null, author);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );
};
