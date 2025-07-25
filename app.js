const menuBtn = document.querySelector('.menu-btn');
const navlink = document.querySelector('.nav-link');

menuBtn.addEventListener('click', () => {
  navlink.classList.toggle('mobile-menu');
});

const search = document.querySelector('.search-box');
const searchIcon = document.querySelector('#search-icon');

searchIcon.addEventListener('click', () => {
  search.classList.toggle('active');
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

const aboutImg = document.querySelector('.about-img img'); // select about image

// Function to apply the theme
function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
    icon.classList.replace('bx-moon', 'bx-sun');
    if (aboutImg) {
      aboutImg.src = 'images/about.jpeg'; // show about.jpeg in light mode
    }
  } else {
    body.classList.remove('light');
    icon.classList.replace('bx-sun', 'bx-moon');
    if (aboutImg) {
      aboutImg.src = 'images/aboutlight.jpeg'; // show aboutlight.jpeg in dark mode
    }
  }
}

// Check for saved theme in localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme('dark');
  }

  // Contact form submission success
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      successMessage.style.display = 'block';
      contactForm.reset();

      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 2000);
    });
  }

  // Login form submission success
  const loginForm = document.getElementById('login-form');
  const loginMessage = document.getElementById('login-message');

  if (loginForm && loginMessage) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      loginMessage.style.display = 'block';
      loginMessage.textContent = 'Login Successful!';
      loginForm.reset();

      setTimeout(() => {
        loginMessage.style.display = 'none';
      }, 2000);
    });
  }
});

// Theme toggle click event listener
themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    applyTheme('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    applyTheme('light');
    localStorage.setItem('theme', 'light');
  }
});

// Cart functionality
const cartItems = document.getElementById('cart-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('.bx-cart-alt');
const cartContainer = document.querySelector('.cart-container');

let cart = [];

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const name = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');

    if (name && price) {
      cart.push({ name, price });
      displayCartItems();
    }
  });
});

function displayCartItems() {
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price}`;
    cartItems.appendChild(li);
  });
}

cartIcon.addEventListener('click', () => {
  cartContainer.classList.toggle('active');
});

// Scrollspy for active nav links
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100; 
    const sectionId = section.getAttribute('id');

    const navLink = document.querySelector(`.nav-link li a[href="#${sectionId}"]`);
    if (!navLink) return;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
});
