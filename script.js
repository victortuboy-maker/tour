// PRODUCT DATA
const products = {
    paris: {
        image: "paris2.jpg",
        title: "Paris Romantic Getaway",
        description: "Experience 5 amazing days in Paris with hotel accommodation, daily breakfast, and guided city tours included.",
        price: 1200
    },
    dubai: {
        image: "dubia2.jpg",
        title: "Dubai Adventure",
        description: "Enjoy 4 days of desert safari, luxury hotels, and unforgettable experiences in Dubai.",
        price: 1000
    }
};

// GET URL PARAM
const urlParams = new URLSearchParams(window.location.search);
const destination = urlParams.get("destination") || "paris";

// SELECT ELEMENTS
const productImage = document.getElementById("productImage");
const productTitle = document.getElementById("productTitle");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const totalPrice = document.getElementById("totalPrice");

let pricePerPerson = 1200; // default

// SET PRODUCT DATA
if(products[destination]) {
    const product = products[destination];
    productImage.src = product.image;
    productImage.alt = product.title;
    productTitle.textContent = product.title;
    productDescription.textContent = product.description;
    productPrice.textContent = "$" + product.price + " per person";
    totalPrice.textContent = product.price;
    pricePerPerson = product.price;
}

// QUANTITY COUNTER
let count = 1;
const countDisplay = document.getElementById("count");

function increase() {
    count++;
    updateDisplay();
}

function decrease() {
    if(count > 1) {
        count--;
        updateDisplay();
    }
}

function updateDisplay() {
    countDisplay.textContent = count;
    totalPrice.textContent = pricePerPerson * count;
}

// PAYMENT FORM
const form = document.getElementById("paymentForm");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const fullname = document.getElementById("fullname").value;
    if(fullname){
        alert(`Payment Successful! 🎉\nThank you, ${fullname}.\nTotal Paid: $${pricePerPerson * count}`);
        form.reset();
        count = 1;
        updateDisplay();
    }
});

// CARD NUMBER FORMATTING
const cardInput = document.getElementById("cardnumber");
cardInput.addEventListener("input", function(e){
    let value = e.target.value.replace(/\D/g, '').substring(0,16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = formatted;
});