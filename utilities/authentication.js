function createUserSession(req, user, action){
     //just creating a session for the user logged in successfully
     req.session.userId = user._id.toString();
     req.session.isAdmin = user.isAdmin ;
     req.session.save(action) ;

}

function destroyUserSession(req){
     req.session.userId = null;
}

module.exports = {
     createUserSession : createUserSession ,
     destroyUserSession : destroyUserSession
}

