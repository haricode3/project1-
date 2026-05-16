const hamburgerButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

function toggleButton(){
     mobileMenu.classList.toggle('open');
}

hamburgerButton.addEventListener('click', toggleButton )