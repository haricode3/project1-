const User = require('../models/user.model');
const authUtil = require('../utilities/authentication');
const checkCredentials = require('../utilities/validation');
const flashSession = require('../utilities/flash_session');

function getSignUp(req, res) {
     let sessionData = flashSession.getSessionData(req);
     if (!sessionData) {
          sessionData = {
               email: '',
               name: '',
               password: '',
               confirmPassword: '',
               street: '',
               postal: '' 
          }



     }
     res.render('customer/auth/signup', {inputData : sessionData});

}

async function signup(req, res, next) {
     const enteredData = {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          confirmPassword: req.body['confirm-password'],
          street: req.body.street,
          postal: req.body.postal
     }

     if (!checkCredentials.checkUserIsValid(
          req.body.email,
          req.body.password,
          req.body.name,
          req.body.street,
          req.body.postal) ||
          !checkCredentials.checkValidPassword(
               req.body.password,
               req.body['confirm-password'])

     ) {
          flashSession.flashSessionData(req, {
               errormessage: "email is required and postal code must be 5 characters long password must be 6 characters long",
               ...enteredData
          }, function () {
               res.redirect('/signup');
               

          })
          return;


     }





     const user = new User(req.body.email, req.body.password, req.body.name, req.body.street, req.body.postal);

     const isExisting = await user.alreadyExisiting();

     if (isExisting) {
          flashSession.flashSessionData(req, {
               errormessage: "account already existing try logging in instead",
               ...enteredData
          }, function () {
               res.redirect('/signup');

          })
          return;

     }
     try {
          await user.signup();
     }
     catch (error) {
          next(error);
          return;
     }


     res.redirect('/login');

}

function getLogin(req, res) {
     let sessionData = flashSession.getSessionData(req);

     if(!sessionData){
          sessionData = {
               email : '',
               password : ''
          }
     }
     res.render('customer/auth/login', {inputData : sessionData});

}

async function login(req, res, next) {
     const user = new User(req.body.email, req.body.password);
     const enteredData = {
          errormessage: "invalid credentials , recheck email and password entered",
          email: req.body.email,
          password: req.body.password
     }

     let existingUser;
     try {
          existingUser = await user.isExistingUser();

     }
     catch (error) {
          next(error);
          return;
     }


     if (!existingUser) {
          flashSession.flashSessionData(req, enteredData, function () {
               res.redirect('/login');

          })
          return;

     }

     const validUser = await user.isValid(existingUser.password);
     if (!validUser) {
          flashSession.flashSessionData(req, enteredData, function () {
               res.redirect('/login');

          })
          return;
     }

     authUtil.createUserSession(req, existingUser, function () {
          res.redirect('/');

     });

}

function logout(req, res) {
     authUtil.destroyUserSession(req);
     res.redirect('/login');

}



module.exports = {
     getSignUp: getSignUp,
     getLogin: getLogin,
     signup: signup,
     login: login,
     logout: logout
};