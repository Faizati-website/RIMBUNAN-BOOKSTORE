/* ------------------------------------------------------------------
   GLOBAL CART  (shared by every page via localStorage)
------------------------------------------------------------------ */
const cartKey = 'cart';
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

/* === add item =================================================== */
function addToCart(title, price) {
  cart.push({ title, price });
  localStorage.setItem(cartKey, JSON.stringify(cart));   // save
  updateCounters();
}

/* === update small counters (header / nav) ======================= */
function updateCounters() {
  const count = cart.length;
  document.querySelectorAll('#cart-count, #cart-count-nav').forEach(el =>
    el.textContent = count
  );
}

/* === render big cart list (on cart.html) ======================== */
function renderCart() {
  const list      = document.getElementById('cart-items');
  const totalSpan = document.getElementById('total-price');
  if (!list || !totalSpan) return;           // page has no cart section

  list.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    list.innerHTML = '<p class="empty">Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <span>${item.title}</span>
        <span>RM ${item.price.toFixed(2)}</span>
        <button onclick="removeItem(${index})">Remove</button>
      `;
      list.appendChild(row);
    });
  }
  totalSpan.textContent = total.toFixed(2);
}

/* === remove individual item ===================================== */
function removeItem(index) {
  cart.splice(index, 1);  // remove item at index
  localStorage.setItem(cartKey, JSON.stringify(cart));  // update storage
  renderCart();
  updateCounters();
}

/* === clear entire cart ========================================= */
function clearCart() {
  cart = [];
  localStorage.removeItem(cartKey);
  renderCart();
  updateCounters();
}

/* === toggle pop‑up cart panel (only on pages that have it) ====== */
function toggleCart() {
  const cartSection = document.getElementById('cart-section');
  if (!cartSection) return;                 // no panel on this page
  cartSection.style.display =
    (cartSection.style.display === 'none' || cartSection.style.display === '')
      ? 'block'
      : 'none';
  renderCart();
}

/* ------------------------------------------------------------------
   CAROUSEL SCROLL
------------------------------------------------------------------ */
function scrollCarousel(id, dir) {
  const el = document.getElementById('carousel-' + id);
  if (el) el.scrollBy({ left: 300 * dir, behavior: 'smooth' });
}

/* ------------------------------------------------------------------
   HERO SLIDESHOW  (optional – only if .mySlides / .dot exist)
------------------------------------------------------------------ */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n)  { showSlides(slideIndex += n); }
function currentSlide(n){ showSlides(slideIndex = n); }

function showSlides(n) {
  const slides = document.getElementsByClassName('mySlides');
  const dots   = document.getElementsByClassName('dot');
  if (slides.length === 0) return;          // page has no slideshow

  if (n > slides.length) slideIndex = 1;
  if (n < 1)             slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) slides[i].style.display = 'none';
  for (let i = 0; i < dots.length;   i++) dots[i].classList.remove('active');

  slides[slideIndex - 1].style.display = 'block';
  if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
}

/* auto‑advance hero every 5 s */
if (document.getElementsByClassName('mySlides').length)
  setInterval(() => plusSlides(1), 5000);

/* ------------------------------------------------------------------
   INITIALISE COUNTERS / CART LIST ON PAGE LOAD
------------------------------------------------------------------ */
updateCounters();
renderCart();

function renderCart() {
  const list = document.getElementById('cart-items');
  const totalSpan = document.getElementById('total-price');
  const receiptTotal = document.getElementById('receipt-total');
  const receiptCount = document.getElementById('receipt-count');

  if (!list || !totalSpan) return;

  list.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    list.innerHTML = '<p class="empty">Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <span>${item.title}</span>
        <span>RM ${item.price.toFixed(2)}</span>
        <button onclick="removeItem(${index})">Remove</button>
      `;
      list.appendChild(row);
    });
  }

  totalSpan.textContent = total.toFixed(2);
  if (receiptTotal) receiptTotal.textContent = total.toFixed(2);
  if (receiptCount) receiptCount.textContent = cart.length;
}

function proceedCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for shopping with us! Your total is RM " + 
    cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
  clearCart(); // optional: empty the cart after checkout
}

function clearCart() {
  const confirmed = confirm("Are you sure you want to clear the cart?");
  if (confirmed) {
    // Clear from localStorage
    localStorage.removeItem('cart');

    // Reset visual cart
    document.getElementById("cart-items").innerHTML = '<p class="empty">Your cart is empty.</p>';
    document.getElementById("total-price").textContent = '0.00';
    document.getElementById("receipt-count").textContent = '0';
    document.getElementById("receipt-total").textContent = '0.00';
    document.getElementById("cart-count").textContent = '0';
    document.getElementById("cart-count-nav").textContent = '0';
  }
}

function myFunction() {
  alert("🎉 Thank you for visiting our store :3 Have a nice day!");
}

