function addCsrfToken(req, res, next){
     res.locals.csrfToken = req.csrfToken(); //generates csrf toekn attached to response
     next();
}

module.exports = addCsrfToken ;