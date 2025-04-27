// script.js

// DOM Elements
const profileIcon = document.getElementById('profile-icon');
const authModal = document.getElementById('auth-modal');
const closeModalBtn = document.querySelector('.close');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('login-form-element');
const registerForm = document.getElementById('register-form-element');
const cartCountDisplay = document.getElementById('cart-count');
const toast = document.getElementById('toast');
const toastMessage = document.querySelector('.toast-message');

// Menu items data
const menuItems = [
  // Sailor's Meal (Sauces)
  {
    id: 1,
    name: 'Ahoy! — Original',
    price: 99,
    image: '1.png',
    category: 'sailors-meals'
  },
  {
    id: 2,
    name: 'Konnichiwa! — Capt. Teriyaki',
    price: 79,
    image: '2.png',
    category: 'sailors-meals'
  },
  {
    id: 3,
    name: 'Annyeong! 🌶 — Yang Yeom',
    price: 99,
    image: '3.png',
    category: 'sailors-meals'
  },
  {
    id: 4,
    name: 'Hello! — Kentucky Gravy',
    price: 89,
    image: '4.png',
    category: 'sailors-meals'
  },
  {
    id: 5,
    name: 'Howdy! 🌶 — Texas Barbeque',
    price: 99,
    image: '5.png',
    category: 'sailors-meals'
  },
  {
    id: 6,
    name: 'Bonjour! — White Sauce',
    price: 99,
    image: '6.png',
    category: 'sailors-meals'
  },
  {
    id: 7,
    name: 'Ni Hao! — Salted Egg',
    price: 110,
    image: '7.png',
    category: 'sailors-meals'
  },

  // Viking's Box (Sauces)
  {
    id: 8,
    name: 'Ahoy! — Original',
    price: 99,
    image: '8.png',
    category: 'vikings-meal'
  },
  {
    id: 9,
    name: 'Konnichiwa! — Capt. Teriyaki',
    price: 99,
    image: '9.png',
    category: 'vikings-meal'
  },
  {
    id: 10,
    name: 'Annyeong! 🌶 — Yang Yeom',
    price: 89,
    image: '10.png',
    category: 'vikings-meal'
  },
  {
    id: 11,
    name: 'Hello! — Kentucky Gravy',
    price: 89,
    image: '11.png',
    category: 'vikings-meal'
  },

  // Others (Burger and Fries)
  {
    id: 16,
    name: 'Chicken Burger: Dynamite! — with special garlic sauce',
    price: 120,
    image: 'c.burger.png',
    category: 'extras'
  },
  {
    id: 17,
    name: 'Chicken Burger: Dynamite Bbq!',
    price: 130,
    image: 'c.burger.png',
    category: 'extras'
  },
  {
    id: 18,
    name: 'Chicken Burger: Spicy Dynamite! 🌶🌶',
    price: 140,
    image: 'c.burger.png',
    category: 'extras'
  },
  {
    id: 19,
    name: 'Fries in a Cup: Cheese',
    price: 50,
    image: 'c.fries.png',
    category: 'extras'
  },
  {
    id: 20,
    name: 'Fries in a Cup: Garlic Parmesan',
    price: 60,
    image: 'c.fries.png',
    category: 'extras'
  },
  {
    id: 21,
    name: 'Fries in a Cup: BBQ',
    price: 55,
    image: 'c.fries.png',
    category: 'extras'
  },

  // Popular Items
  {
    id: 22,
    name: '2 Pieces Boneless Chicken With Rice',
    price: 108,
    image: '1.png',
    category: 'popular'
  },
  {
    id: 23,
    name: '3 Pieces Boneless Chicken With Rice',
    price: 148,
    image: '2.png',
    category: 'popular'
  },
  {
    id: 24,
    name: '4 Pieces Boneless Chicken With Rice',
    price: 188,
    image: '3.png',
    category: 'popular'
  },
  {
    id: 25,
    name: '5 Pieces Boneless Chicken With Rice',
    price: 228,
    image: '4.png',
    category: 'popular'
  },
  {
    id: 26,
    name: 'Chicken Burger: Dynamite!',
    price: 120,
    image: 'c.burger.png',
    category: 'popular'
  },
  {
    id: 27,
    name: 'Chicken Burger: Dynamite Bbq!',
    price: 130,
    image: 'c.burger.png',
    category: 'popular'
  },
  {
    id: 28,
    name: 'Fries in a Cup: Cheese',
    price: 50,
    image: 'c.fries.png',
    category: 'popular'
  },
  {
    id: 29,
    name: 'Fries in a Cup: Garlic Parmesan',
    price: 60,
    image: 'c.fries.png',
    category: 'popular'
  }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('chicksAhoyCart')) || [];
let currentUser = JSON.parse(localStorage.getItem('chicksAhoyCurrentUser')) || null;

// Update cart count display
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountDisplay.textContent = totalItems;
  cartCountDisplay.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Show toast notification
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Add item to cart
function addToCart(itemId) {
  const item = menuItems.find(item => item.id === itemId);
  
  if (!item) return;
  
  const existingItem = cart.find(cartItem => cartItem.id === itemId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  }
  
  // Save to localStorage
  localStorage.setItem('chicksAhoyCart', JSON.stringify(cart));
  
  // Update display
  updateCartCount();
  
  // Show toast
  showToast(`${item.name} has been added to cart`);
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  
  // Save to localStorage
  localStorage.setItem('chicksAhoyCart', JSON.stringify(cart));
  
  // Update display
  updateCartCount();
  updateCartDisplay();
}

// Update item quantity in cart
function updateQuantity(itemId, change) {
  const item = cart.find(item => item.id === itemId);
  
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    // Remove item if quantity is zero or less
    removeFromCart(itemId);
    return;
  }
  
  // Save to localStorage
  localStorage.setItem('chicksAhoyCart', JSON.stringify(cart));
  
  // Update display
  updateCartCount();
  updateCartDisplay();
}

// Update cart display (if on cart page)
function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const emptyCart = document.getElementById('empty-cart');
  const cartSummary = document.getElementById('cart-summary');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  
  if (!cartItems || !emptyCart || !cartSummary) return; // Not on cart page
  
  // Clear cart items
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    // Show empty cart message
    emptyCart.style.display = 'flex';
    cartSummary.style.display = 'none';
    return;
  }
  
  // Hide empty cart message
  emptyCart.style.display = 'none';
  cartSummary.style.display = 'block';
  
  // Add cart items
  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₱${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-control">
          <div class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</div>
          <div class="quantity-display">${item.quantity}</div>
          <div class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</div>
        </div>
        <div class="remove-btn" onclick="removeFromCart(${item.id})">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    `;
    
    cartItems.appendChild(cartItemElement);
  });
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + 40; // Adding delivery fee
  
  // Update summary
  subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
  totalElement.textContent = `₱${total.toFixed(2)}`;
}

// Render menu items (if on menu page)
function renderMenuItems(category = 'popular') {
  const menuGrid = document.getElementById('menu-grid');
  
  if (!menuGrid) return; // Not on menu page
  
  // Clear menu grid
  menuGrid.innerHTML = '';
  
  // Filter items by category
  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);
  
  // Add menu items
  filteredItems.forEach(item => {
    const menuItemElement = document.createElement('div');
    menuItemElement.className = 'menu-item';
    menuItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <div class="price">₱${item.price.toFixed(2)}</div>
      <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    
    menuGrid.appendChild(menuItemElement);
  });
}

// Handle menu category buttons (if on menu page)
function setupCategoryButtons() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  if (categoryButtons.length === 0) return; // Not on menu page
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Render menu items for the selected category
      renderMenuItems(this.dataset.category);
    });
  });
}

// Auth Functions
function showModal() {
  authModal.classList.add('show');
}

function hideModal() {
  authModal.classList.remove('show');
}

function switchTab(tabName) {
  // Hide all forms
  authForms.forEach(form => form.classList.remove('active'));
  
  // Remove active class from all tabs
  authTabs.forEach(tab => tab.classList.remove('active'));
  
  // Show selected form
  document.getElementById(`${tabName}-form`).classList.add('active');
  
  // Add active class to selected tab
  document.querySelector(`.auth-tab[data-tab="${tabName}"]`).classList.add('active');
}

function login(email, password) {
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('chicksAhoyUsers')) || [];
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    alert('Invalid email or password');
    return false;
  }
  
  // Set current user
  currentUser = {
    name: user.name,
    email: user.email
  };
  
  localStorage.setItem('chicksAhoyCurrentUser', JSON.stringify(currentUser));
  
  // Check if on profile page
  updateProfileDisplay();
  
  return true;
}

function register(name, email, password) {
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('chicksAhoyUsers')) || [];
  
  // Check if email already exists
  if (users.find(u => u.email === email)) {
    alert('Email already registered');
    return false;
  }
  
  // Add new user
  users.push({ name, email, password });
  
  // Save to localStorage
  localStorage.setItem('chicksAhoyUsers', JSON.stringify(users));
  
  // Set current user
  currentUser = {
    name,
    email
  };
  
  localStorage.setItem('chicksAhoyCurrentUser', JSON.stringify(currentUser));
  
  // Check if on profile page
  updateProfileDisplay();
  
  return true;
}

function logout() {
  // Clear current user
  currentUser = null;
  localStorage.removeItem('chicksAhoyCurrentUser');
  
  // Redirect to home page if on profile page
  if (window.location.pathname.includes('profile.html')) {
    window.location.href = 'index.html';
  }
}

// Update profile display (if on profile page)
function updateProfileDisplay() {
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  
  if (!profileName || !profileEmail) return; // Not on profile page
  
  if (currentUser) {
    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;
  } else {
    // Redirect to home if not logged in
    window.location.href = 'index.html';
  }
}

// Function to handle checkout
function proceedToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before proceeding to checkout.");
    return;
  }

  // Retrieve existing order history from localStorage
  const orderHistory = JSON.parse(localStorage.getItem('chicksAhoyOrderHistory')) || [];

  // Create a new order
  const newOrder = {
    id: Date.now(), // Unique order ID
    items: [...cart], // Copy of the current cart
    total: cart.reduce((total, item) => total + item.price * item.quantity, 0) + 40, // Subtotal + delivery fee
    date: new Date().toLocaleString() // Current date and time
  };

  // Add the new order to the order history
  orderHistory.push(newOrder);

  // Save the updated order history to localStorage
  localStorage.setItem('chicksAhoyOrderHistory', JSON.stringify(orderHistory));

  // Clear the cart
  cart = [];
  localStorage.setItem('chicksAhoyCart', JSON.stringify(cart));

  // Redirect to Order Success page
  window.location.href = 'order-success.html';
}

// Function to render order history
function renderOrderHistory() {
  const orderHistoryContainer = document.getElementById('order-history');
  const orderHistory = JSON.parse(localStorage.getItem('chicksAhoyOrderHistory')) || [];

  if (!orderHistoryContainer) return; // Not on order history page

  if (orderHistory.length === 0) {
    orderHistoryContainer.innerHTML = '<p>No orders found. Start ordering now!</p>';
    return;
  }

  orderHistory.forEach(order => {
    const orderElement = document.createElement('div');
    orderElement.className = 'order';

    orderElement.innerHTML = `
      <h3>Order ID: ${order.id}</h3>
      <p>Date: ${order.date}</p>
      <ul>
        ${order.items.map(item => `
          <li>${item.quantity}x ${item.name} - ₱${(item.price * item.quantity).toFixed(2)}</li>
        `).join('')}
      </ul>
      <p><strong>Total: ₱${order.total.toFixed(2)}</strong></p>
    `;

    orderHistoryContainer.appendChild(orderElement);
  });
}

// Initialize page
function init() {
  // Update cart count
  updateCartCount();
  
  // Setup event listeners
  if (profileIcon) {
    profileIcon.addEventListener('click', () => {
      if (currentUser) {
        window.location.href = 'profile.html';
      } else {
        showModal();
      }
    });
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideModal);
  }
  
  // Setup auth tabs
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });
  
  // Setup auth forms
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      if (login(email, password)) {
        hideModal();
        showToast('Successfully logged in!');
      }
    });
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (register(name, email, password)) {
        hideModal();
        showToast('Successfully registered!');
      }
    });
  }
  
  // Setup logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
    });
  }
  
  // Setup category buttons
  setupCategoryButtons();
  
  // Render menu items (if on menu page)
  renderMenuItems();
  
  // Update cart display (if on cart page)
  updateCartDisplay();
  
  // Update profile display (if on profile page)
  updateProfileDisplay();
}

// When document is loaded
document.addEventListener('DOMContentLoaded', init);

// Call renderOrderHistory if on the order history page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('order-history')) {
    renderOrderHistory();
  }
});

