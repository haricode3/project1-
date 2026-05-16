function errorMiddlewareFunction(err, req, res, next){
     console.log(err);

     if(err.code === 404){
          return res.status(404).render('shared/400_error');
     }
     res.status(500).render('shared/500_error');
}

module.exports = errorMiddlewareFunction ;