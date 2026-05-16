const express = require('express');
const csrf = require('csurf');
const path = require('path');

const expressSession = require('express-session');
const createSessionConfig = require('./config/session');



const app = express() ;
const forAddCsrfToken = require('./middlewares/csrf-token');
const checkAuthStatus = require('./middlewares/auth_status');
const protectRoutesMiddleware = require('./middlewares/protectRoutes');
//to protect unauthenticated or unauthorized people from accessing protexted pages

const cartMiddleware = require('./middlewares/cart');
//helps in initializing cart items storen in req.session for displaying

const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const productRoutes = require('./routes/product.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');


const db = require('./data/database');
const errorHandlerMiddleware = require('./middlewares/500_error');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'))
app.use(express.urlencoded({extended : false})); //for parsing request function headers for froms
app.use(express.json() ); // for parsing ajax request 
//normal express.urlencoded just handles form requests not ajax


const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf()) // middleware for cross- security request forgery , to give the function to generate csrf token
app.use(forAddCsrfToken) ; // middleware to add csrf token, actually generates csrf token
app.use(checkAuthStatus);

app.use(cartMiddleware);


app.use(authRoutes);
app.use(baseRoutes);
app.use('/cart', cartRoutes);
app.use(productRoutes);
app.use(protectRoutesMiddleware);
//middleware put just before accessing admin pages routes
app.use( '/admin' ,adminRoutes);


app.use(errorHandlerMiddleware);



db.connectToDatabase().then(
     function(){
          app.listen(3000);
     }
).catch(function(error){
     console.log('Failed to connect to database');
     console.log(error);
})


