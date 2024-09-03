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

//Go up button
let myUpButton = document.getElementById("goUpBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {scrollFunction()};

function scrollFunction(){
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myUpButton.style.display = "block";
    }else{
        myUpButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction(){
    window.scrollTo({top: 0, behavior: 'smooth'});
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome,
}

//cart js
let cart = []; //creating an array/list of cart items

function addToCart(productName, pricePerKg) {
    let quantityElement = document.getElementById(`quantity-${productName.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '')}`);
    let isKg = false; // Flag to track if the unit should be "kg"
    // let quantityValue = parseFloat(quantityElement.value);

    // //handling no quantity selected
    // if (!quantityValue) {
    //     alert("Select quantity!");
    //     return;
    // }

    // Check if the element exists and determine its type (input or select)
    let quantityValue;
    if (quantityElement && quantityElement.tagName.toLowerCase() === 'input') {
        quantityValue = parseFloat(quantityElement.value); // For number input field
        console.log(`Value picked is ${quantityValue}`);
    } else if (quantityElement && quantityElement.tagName.toLowerCase() === 'select') {
        quantityValue = parseFloat(quantityElement.value); // For dropdown select
        isKg = true;
        console.log(`Value picked is ${quantityValue}`);
    } 

    // Validate quantity (ensure it's a positive number)
    // if (isNaN(quantity) || quantity <= 0) {
    //     alert('Please enter a valid quantity.');
    //     return;
    // }

    //Getting the total price
    
    let totalPrice = pricePerKg * quantityValue;

    //checking whether the item was prior on the array
    // let product = cart.find(item => item.name === productName);

    // if (product){
    //     product.quantity += quantityValue;
    // }
    // else{
    //     //adding to the cart array
    //     cart.push({
    //         itemName: productName,
    //         quantity: quantityValue,
    //         price: totalPrice,
    //     });
    // }

    //adding to the cart array
    cart.push({
        itemName: productName,
        quantity: quantityValue,
        price: totalPrice,
    });

    // Display alert with appropriate units
    const unit = isKg ? 'kg' : 'piece(s)';
    alert(`Added to Cart____Name: ${productName} Quantity: ${quantityValue}${unit} Total Price: ${totalPrice}`);
    
    
    // if (quantityElement && quantityElement.tagName.toLowerCase() === 'input') {
    //     alert(`Added to Cart<br> Name: ${productName} Quantity: ${quantityValue} Total Price: ${totalPrice}`); // For number input field
    // } else if (quantityElement && quantityElement.tagName.toLowerCase() === 'select') {
    //     alert(`Added to Cart<br> Name: ${productName} Quantity: ${quantityValue}kg Total Price: ${totalPrice}`); // For dropdown select
    // } 


}

//cart js
// Function to toggle the cart overlay
function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.style.display = (cartOverlay.style.display === 'flex') ? 'none' : 'flex';
}

// Add event listener to the cart link
document.getElementById('cartlink').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    toggleCart();

});
