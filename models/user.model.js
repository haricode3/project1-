const bcrypt = require('bcryptjs');
const db = require('../data/database');
class User {
     constructor(email, password, fullname, street, postalCode){
          //first two parameters of constructor by default necessary
          //other not necessary everytime constructor is called
          this.email = email ;
          this.name = fullname ;
          this.password = password;
          this.address = {
               street : street,
               postalCode : postalCode
          };
     }

     async signup(){
          const password =await bcrypt.hash(this.password, 12);
          await db.getDb().collection('users').insertOne({
               name : this.name ,
               email : this.email,
               password : password,
               address : this.address

          })
     }

     isExistingUser(){
          return db.getDb().collection('users').findOne({email : this.email});
     }

     async alreadyExisiting(){
          const existingUser = await this.isExistingUser() ;
          if(existingUser){
               return true;
          }
          return false ;
     }

     isValid(hashedPassword){
         return bcrypt.compare(this.password, hashedPassword);
          
     }

}

module.exports = User ;

