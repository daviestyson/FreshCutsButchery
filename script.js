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


// dropdown for products
// document.addEventListener('DOMContentLoaded', function() {
//     const dropBtn = document.querySelector('.dropbtn');
//     const dropdownMenu = document.querySelector('.dropdown-menu');

//     dropBtn.addEventListener('click', function(event) {
//         event.preventDefault(); // Prevent the default anchor action
//         dropdownMenu.classList.toggle('show'); // Toggle the 'show' class on click
//     });

//     // Close the dropdown if the user clicks outside of it
//     window.addEventListener('click', function(event) {
//         if (!dropBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
//             dropdownMenu.classList.remove('show');
//         }
//     });
// });

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

    // Find the closest parent element that contains the product's HTML structure
    const productElement = quantityElement.closest('.product');

    // Automatically find the first image inside the product element
    // const productImageElement = productElement.querySelector('img');
    // const productImg = productImageElement ? productImageElement.src : '';
    // console.log(`${productImg} picked`);

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
    if (isNaN(quantityValue) || quantityValue <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    //Getting the total price   
    let totalPrice = pricePerKg * quantityValue;

    // checking whether the item was prior on the array
    let product = cart.find(item => item.name === productName);

    if (product){
        product.quantity += quantityValue;
        product.price += totalPrice;
    }
    else{
        //adding to the cart array
        cart.push({
            itemName: productName,
            quantity: quantityValue,
            price: totalPrice,
        });
    }

    // //adding to the cart array
    // cart.push({
    //     itemName: productName,
    //     quantity: quantityValue,
    //     price: totalPrice,
    //     // image: productImg,
    // });


    // Update the cart display / the cart overlay
    updateCartDisplay();  

    // Display alert with appropriate units
    const unit = isKg ? 'kg' : 'piece(s)';
    alert(`Added to Cart____Name: ${productName} Quantity: ${quantityValue}${unit} Total Price: ${totalPrice}`);

    //reseting the field values to prevent duplicate items in the cart
    quantityElement.value=""; // For number input field

}

function removeItem(index, event){
    event.stopPropagation();//prevents the cart from closing when you remove an item from cart
    try {
        if(confirm(`Are you sure you want to remove this item from the cart?`)){
        cart.splice(index, 1);//Remove 1 item of the selected index from the array
        console.log(`${index} is removed`);
        updateCartDisplay();// Update the cart display    
        };  
    } catch (error) {
        
    }

    
};


function updateCartDisplay(){
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear previous items before rendering the new ones
    var grandTotal = 0;

    // const emptyCart = document.getElementsById('cart-is-empty');
    // const notEmptyCart = document.getElementsByClassName('cart-not-empty');
    // if (cart.length === 0){
    //     emptyCart.style.display = 'block';
    // }
    // else{
    //     emptyCart.style.display = 'none';
    //     notEmptyCart.style.display = 'block';
    // }
        cart.forEach((item, index) => {
            //creating a new div with class cart-item for each cart item
            const cartItem = document.createElement('tr');
            cartItem.classList.add('cart-item');
    
            // Insert the product image, name, quantity, and price into the cart item
            cartItem.innerHTML = `              
                
                <td class="tdname">${item.itemName}</td>
                <td class="tdquantity">${item.quantity}</td>
                <td class="tdprice">Sh${item.price}</td> 
                <td class="tdbtn"><button class="removeBtn" onclick="removeItem(${index}, event)"><i class="fas fa-times"></i></button></td>             
            `;
            grandTotal += item.price;
            console.log(`total:${grandTotal}`);
            // Append the cart item to the cart container
            cartItemsContainer.appendChild(cartItem);
        });

        document.getElementsByClassName('grand-total')[0].innerHTML = 'Sh'+grandTotal;


    

}


//Opening and closing the cart page functionalities)
const cartLink = document.getElementById('cartlink');
const cartOverlay = document.getElementById('cartOverlay');


cartLink.addEventListener('click', function(e){
    e.preventDefault();
    // cartOverlay.style.display = (cartOverlay.style.display === 'flex') ? 'none' : 'flex';
    if (cartOverlay.style.transform === 'translateX(-200%)'){
        cartOverlay.style.transform = 'translateX(0)';
      } else {
        cartOverlay.style.transform = 'translateX(-200%)';
      }
});

// close cart page
const closeBtn = document.querySelector ('#close-cart');

closeBtn.addEventListener('click', () => {
  cartOverlay.style.transform = 'translateX(-200%)';
});

document.addEventListener('click', e => {
    const cartContent = document.querySelector('#cartContent');
    
    if(!cartContent.contains(e.target) && !cartLink.contains(e.target)){
        cartOverlay.style.transform = 'translateX(-200%)';
    }
})
            // <div class="cart-img-holder">
            // <img src="${item.image} alt="pic of ${item.itemName} class="cart-item-img">
            // </div>
            // <div class="cart-product-info">
            //     <p class="cart-item-name">${item.itemName}</p>
            //     <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
            //     <p class="cart-item-price">Price: Sh${item.price}</p>
            // </div>


