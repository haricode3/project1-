const deleteProductButtonElements = document.querySelectorAll('.product-item button[data-prodid]');

async function deleteProduct(event){
     const deleteButton = event.target ;
     const prodId = deleteButton.dataset.prodid ;
     const csrfToken = deleteButton.dataset.csrf ; 

     const response = await fetch("/admin/products/"+ prodId + "?_csrf="+ csrfToken,{
          method : "DELETE"
     } ); 
     
     if(!response.ok){
          alert("Something went Wrong!");
          return;
     }

     deleteButton.closest('.product-item').remove();


}


for(const deleteProductButtonElement of deleteProductButtonElements){
     deleteProductButtonElement.addEventListener('click', deleteProduct);
}

