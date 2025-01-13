function addToCart(productName, price, size) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const product = {
    name: productName,
    price: price,
    size: size,
    quantity: 1,
  };

  const existingProduct = cart.find(item => item.name === productName && item.size === size);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification("Product added to cart!");
  loadCart();
  updateCartCount();
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.border = '1px dashed wheat';
  notification.style.backgroundColor = 'black';
  notification.style.color = "wheat";
  notification.style.padding = "10px 15px";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "3000";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
  });

  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.innerText = totalItems;
  }
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');
  let total = 0;

  let tableHTML = `
    <div class="cart-container">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Size</th>
            <th>Price (EUR)</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
  `;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    tableHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${itemTotal} EUR</td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
    </div>
    <br>
    <p id="total">Your Total: ${total} EUR</p>
  `;

  cartContainer.innerHTML = tableHTML;
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();

  const clearCartButton = document.getElementById("clear-cart-btn");

  if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
      clearCart();
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const loadingContainer = document.getElementById("loading-container");

  // Ukryj kontener ładowania po załadowaniu strony
  window.onload = () => {
    setTimeout(() => {
      loadingContainer.style.opacity = "0";
      loadingContainer.style.transition = "opacity 0.5s ease-out";

      // Usuń całkowicie z DOM po animacji
      setTimeout(() => {
        loadingContainer.remove();
      }, 500);
    }, 300); // Możesz zwiększyć czas, jeśli strona ładuje się szybko
  };
});
