const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage or initialize as an empty array
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear existing cart list
  
  if (cart.length === 0) {
    cartList.innerHTML = "Your cart is empty.";
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} 
                      <button class="remove-from-cart-btn" data-id="${item.id}" data-index="${index}">Remove</button>`;
      cartList.appendChild(li);
    });
  }
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  
  if (product) {
    // Check if product already exists in the cart
    const cartItemIndex = cart.findIndex((item) => item.id === product.id);
    
    if (cartItemIndex === -1) {
      cart.push(product);  // Add to cart if not already present
    }

    // Save cart to sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();  // Re-render the cart list
  }
}

// Remove item from cart
function removeFromCart(productId, index) {
  cart.splice(index, 1);  // Remove the item by index
  sessionStorage.setItem("cart", JSON.stringify(cart));  // Update session storage
  renderCart();  // Re-render the cart list
}

// Clear cart
function clearCart() {
  cart = [];  // Clear the cart array
  sessionStorage.removeItem("cart");  // Remove cart data from sessionStorage
  renderCart();  // Re-render the cart list
}

// Event listener for "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();





