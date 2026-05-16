function checkAuthStatus(req, res, next){
     const uid = req.session.userId ;
     if(!uid){
          return next() ;
     }
     //res.locals used to pass data calculated by middleware(here checkAuthStatus )
     // is the middleware and we are passing uid to the response usein
     //res.locals
     //Request → Middleware → Route → Render View → Response

     res.locals.uid = uid ;
     res.locals.isAuth = true ;
     res.locals.isAdmin = req.session.isAdmin ;
     next(); //pass on to the next function
}

module.exports = checkAuthStatus ;