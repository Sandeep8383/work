const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');

//Requiring user model
const User = require('../models/usermodel');

// Checks if user is authenticated
function isAuthenticatedUser(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please Login first to access this page.')
    res.redirect('/login');
}

//Get routes
router.get('/login', (req,res)=> {
    res.render('login');
});

router.get('/signup', (req,res)=> {
    res.render('signup');
});

router.get('/dashboard', isAuthenticatedUser,(req,res)=> {
    res.render('dashboard');
});

router.get('/logout', isAuthenticatedUser,(req, res)=> {
    req.logOut();
    req.flash('success_msg', 'You have been logged out.');
    res.redirect('/login');
});

router.get('/forgot', (req, res)=> {
    res.render('forgot');
});

router.get('/reset/:token', (req, res)=> {
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires : {$gt : Date.now() } })
        .then(user => {
            if(!user) {
                req.flash('error_msg', 'Password reset token in invalid or has been expired.');
                res.redirect('/forgot');
            }

            res.render('newpassword', {token : req.params.token});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err);
            res.redirect('/forgot');
        });
});

router.get('/password/change', isAuthenticatedUser, (req, res)=> {
    res.render('changepassword');
});

//POST routes
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password. Try Again!!!' });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
});




router.post('/signup', (req, res)=> {
    let {name, email, password} = req.body;

    let userData = {
        name : name,
        email :email
    };

    User.register(userData, password, (err, user)=> {
        if(err) {
            req.flash('error_msg', 'ERROR: '+err);
            res.status(400).json({error:"Failed to signup" , message:err.message});
        }
        passport.authenticate('local') (req, res, ()=> {
            req.flash('success_msg', 'Account created successfully');
            res.status(200).json("Account Created Successfully");
        });
    });

});

router.post('/password/change', (req, res)=> {
    if(req.body.password !== req.body.confirmpassword) {
        req.flash('error_msg', "Password don't match. Type again!");
        return res.redirect('/password/change');
    }

    User.findOne({email : req.user.email})
        .then(user => {
            user.setPassword(req.body.password, err=>{
                user.save()
                    .then(user => {
                        req.flash('success_msg', 'Password changed successfully.');
                        res.redirect('/dashboard');
                    })
                    .catch(err => {
                        req.flash('error_msg', 'ERROR: '+err);
                        res.redirect('/password/change');
                    });
            });
        });
});
// Routes to handle forgot password
router.post('/forgot', (req, res, next)=> {
    let recoveryPassword = '';
    async.waterfall([
        (done) => {
            crypto.randomBytes(20, (err , buf) => {
                let token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            User.findOne({email : req.body.email})
                .then(user => {
                    if(!user) {
                        req.flash('error_msg', 'User does not exist with this email.');
                        // return res.redirect('/forgot');
                        res.status(200).json("User does not exist with this email.");

                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 1800000; //   1/2 hours

                    user.save(err => {
                        done(err, token, user);
                    });
                })
                .catch(err => {
                    req.flash('error_msg', 'ERROR: '+err);
                    // res.redirect('/forgot');
                    res.status(400).json({error:"Failed to send email" , message:err.message});
                    
                })
        },
        (token, user) => {
            let smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user : process.env.GMAIL_EMAIL,
                    pass: process.env.GMAIL_PASSWORD
                }
            });

            let mailOptions = {
                to: user.email,
                from : 'Eventure eventure3@gmail.com',
                subject : 'Recovery Email from Auth Project',
                text : 'Please click the following link to recover your passoword: \n\n'+
                        'http://'+ req.headers.host +'/reset/'+token+'\n\n'+
                        'If you did not request this, please ignore this email.'
            };
            smtpTransport.sendMail(mailOptions, err=> {
                req.flash('success_msg', 'Email send with further instructions. Please check that.');
                // res.redirect('/forgot');
                res.status(200).json("Email send with  instructions. Please check that.");
            });
        }

    ], err => {
        if(err) res.redirect('/forgot');
    });
});

router.post('/reset/:token', (req, res)=>{
    async.waterfall([
        (done) => {
            User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires : {$gt : Date.now() } })
                .then(user => {
                    if(!user) {
                        req.flash('error_msg', 'Password reset token in invalid or has been expired.');
                        res.redirect('/forgot');
                    }

                    if(req.body.password !== req.body.confirmpassword) {
                        req.flash('error_msg', "Password don't match.");
                        return res.redirect('/forgot');
                    }

                    user.setPassword(req.body.password, err => {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(err => {
                            req.logIn(user, err => {
                                done(err, user);
                            })
                        });
                    });
                })
                .catch(err => {
                    req.flash('error_msg', 'ERROR: '+err);
                    res.redirect('/forgot');
                });
        },
        (user) => {
            let smtpTransport = nodemailer.createTransport({
                service : 'Gmail',
                auth:{
                    user : process.env.GMAIL_EMAIL,
                    pass : process.env.GMAIL_PASSWORD
                }
            });

            let mailOptions = {
                to : user.email,
                from : 'Eventure eventure365@gmail.com',
                subject : 'Your password is changed',
                text: 'Hello, '+user.name+'\n\n'+
                      'This is the confirmation that the password for your account '+ user.email+' has been changed.'
                    };
                    smtpTransport.sendMail(mailOptions, err=>{
                                    req.flash('success_msg', 'Your password has been changed successfully.');
                                    res.redirect('/login');
                                });
                            }
                    
                        ], err => {
                            res.redirect('/login');
                        });
                    });
                    
                    module.exports = router;