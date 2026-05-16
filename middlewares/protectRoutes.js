
function protectRoutes(req, res, next){

     //why res and not req 
     //Express intentionally gives: res.locals
     // to store temporary data for this request-response cycle

     if(!res.locals.isAuth){
          return res.redirect('/401');
     }

     if(req.path.startsWith('/admin') && !res.locals.isAdmin){
          return res.redirect('/403');
     }

     //if everything is fine next() calls the next middleware
     //or router in line 

     next() ;
}

module.exports = protectRoutes ;