// script.js
//function that displays the dropdown menu when the screen is reduced
function toggleMenu() {
    const navMenu = document.querySelector('.navmenu');
    // navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.classList.toggle('active');
}

function hideMenu(){
    const navMenu = document.querySelector('.navmenu');
    navMenu.classList.remove('active');
}

function setActiveLink(event) {
    // Hide the navmenu
    hideMenu();
}

// function setActiveLink(event) {
//      // Remove 'active' class from all links
//      document.querySelectorAll('.navmenu ul li a').forEach(link => {
//         link.classList.remove('active');
//      });

//      // Add 'active' class to the clicked link
//      event.currentTarget.classList.add('active');

//      // Hide the navmenu
//      document.querySelector('.navmenu').classList.remove('active');
// }

// Attach event listeners to navmenu links
document.querySelectorAll('.navmenu ul li a').forEach(link =>{
    link.addEventListener('click', hideMenu);
});

// Hide menu when clicking outside of it
document.addEventListener('click', function(event){
    const navMenu = document.querySelector('.navmenu');
    const hamburger = document.querySelector('.hamburger');
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hideMenu();
    }
});