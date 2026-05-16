const mongoDb = require('mongodb');
const db = require('../data/database');

class Product{
     constructor(productData){
          this.title = productData.title ;
          this.image = productData.image ; //filename
          this.summary = productData.summary ;
          this.description = productData.description ;
          this.price = +productData.price ;
          this.updateImageData();

          if(productData._id){
               this._id = productData._id.toString() ;
          }

     }
     

     static async findById(productId){
          let prodId ;
          try{
               prodId = new mongoDb.ObjectId(productId);

          } catch(error){
               error.code = 404 ;
               throw error ;
          }
          const product = await db.getDb().collection('products').findOne({_id : prodId});

          if(!product){
               const error = new Error('Could not find product with the given id');
               error.code = 404 ;
               throw error ;
          }

          return new Product(product) ; 

     }

     updateImageData(){
          this.imagePath = `product-data/images/${this.image}`;
          this.imageUrl = `/products/assets/images/${this.image}`;
     }

     async save(){ 

          const productData = {
               title : this.title ,
               summary : this.summary ,
               description : this.description ,
               image : this.image ,
               price : this.price
          }
          if(!this.image){
               delete productData.image ;
          }


          if(this._id){
               const prodId = new mongoDb.ObjectId(this._id);
               await db.getDb().collection('products').updateOne( {_id : prodId},{
                    $set : productData,
               } );

          }


          else {
               await db.getDb().collection('products').insertOne(productData);
          }


     }
     // static function can be called without creating instance of class

     static async findAll(){
          const products = await db.getDb().collection('products').find().toArray();

          return products.map(function(productDocument){
               const product = new Product(productDocument);
               return product; 
          })
     }

     replaceImage(newImage){
          this.image = newImage;
          this.updateImageData();
     }

     remove(){
          const prodId = new mongoDb.ObjectId(this._id) ;
          return db.getDb().collection('products').deleteOne({_id : prodId});
     }


}

module.exports = Product ;