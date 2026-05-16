
function getSessionData(req){
     const data = req.session.flashedData ;

     req.session.flashedData = null ;
     return data ;

}

function flashSessionData(req, data, action){
     req.session.flashedData = data ;
     req.session.save(action);
     //action should be performed only after data save
     //to avoid page loading before data properly saved

}

module.exports = {
     getSessionData : getSessionData ,
     flashSessionData : flashSessionData
}