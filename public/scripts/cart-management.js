
const addToCartButtonElement = document.querySelector('#product-details button');
const cartQuantityBadge = document.querySelector('#nav-items .badge');
const productId = addToCartButtonElement.dataset.productid ;
const csrf = addToCartButtonElement.dataset.csrf ;

async function addToCart(){
     let response ;

     try{
          response = await fetch('/cart/items' , {
           method : 'POST',
           body : JSON.stringify({
               productId : productId,
               _csrf : csrf 

           }),
           headers : {
               'Content-Type' : 'application/json'
           }
           //header tells backend the type of data
          });
     }catch(error){
          alert('Something went wrong')
          return ;

     }

     if(!response.ok){
          alert('Something went wrong');
          return ;
     }

     const responseData = await response.json() ;

     const newTotalItems = responseData.newTotalItems ;

     cartQuantityBadge.textContent = newTotalItems ;


}

addToCartButtonElement.addEventListener('click', addToCart);