// script.js

// JavaScript to hide the loader and show the content once the page is fully loaded
window.addEventListener("load", function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "block";
});

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


document.addEventListener('DOMContentLoaded', function() {
    const dropBtn = document.querySelector('.dropbtn');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor action
        dropdownMenu.classList.toggle('show'); // Toggle the 'show' class on click
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (!dropBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});