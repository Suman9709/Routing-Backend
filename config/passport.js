const { LocalStrategy } = require("passport-local").Strategy;
const Auhtor = require("../models/author.model");
const Author = require("../models/author.model");

module.exports = function (passport) {
    passport.serializeUser((author, done) => {
        done(null, author.id);
    })

    passport.deserializeUser((id, done) => {
        Auhtor.findById(id, (err, author) => {
            done(err, author);
        })
    })
    passport.use(
        'local-signup',
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },

        (req, email, password, done) => {
            Author.findOne({ email }, async (err, author) => {
                if (err) done(err);
                if (author) return done(null, false, req.flash('signup message', 'The email is already in taken'));
                const newAuthor = new Author({
                    name: req.body.name,
                    email,
                    password,
                });
                await newAuthor.save();
                return done(null, author)
            });

        }
    )



    passport.use(
        'local-login',
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },

        (req, email, password, done) => {
            Author.findOne({ email }, async (err, author) => {
                if (err) done(err);
                if (!author) return done(null, false, req.flash('Login message', 'No user found'));
                author.comparePassword(password, (err, isMatch) => {
                    if (err) return done(err);
                    if (isMatch)
                        return done(null, false, req.flash('Login message', 'Email and Password did not match'));
                    return done(null, author)
                });

            });

        }
    )
}
