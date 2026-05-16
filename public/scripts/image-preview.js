const imagePickerElement = document.querySelector('#image-upload-control input');
const imagePreviewElement = document.querySelector('#image-upload-control img');

function imageUpdate(){
     const files = imagePickerElement.files ;

     if(!files || files.length === 0){
          imagePreviewElement.style.display = 'none' ;
     }

     const file = files[0];

     imagePreviewElement.src =  URL.createObjectURL(file);
     imagePreviewElement.style.display = 'block';

}

imagePickerElement.addEventListener('change', imageUpdate);