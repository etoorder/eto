let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">₹${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">₹${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '₹' + totalPrice;
}
// Load the Razorpay script
const razorpayScript = document.createElement('script');
razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
document.head.appendChild(razorpayScript);

// Initialize Razorpay when the script is loaded
razorpayScript.onload = function() {
    const options = {
        key: 'rzp_test_t0xoZoVt9V4OG8', // Replace with your Razorpay API key
        amount: 90000, // Amount in paise (example: ₹900)
        currency: 'INR',
        name: 'ETO',
        description: 'Purchase Description',
        image: 'T logo.png',
        order_id: 'order_12345', // Replace with your order ID
        handler: function(response) {
            // Handle the response after payment completion
            console.log(response);
            if (response.razorpay_payment_id) {
                // Payment successful, update UI or redirect to success page
            } else {
                // Payment failed or cancelled
            }
        },
        prefill: {
            name: 'John Doe',
            email: 'john@example.com',
            contact: '9876543210',
        },
        theme: {
            color: '#F37254',
        },
    };

    const rzpButton = new Razorpay(options);
    rzpButton.open();
};
