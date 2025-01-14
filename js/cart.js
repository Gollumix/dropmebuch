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
    <div class="cart-container" style="max-width: 600px; margin: 0 auto;">
      <table class="cart-table" style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr>
            <th style="padding: 10px; border-bottom: 1px solid #ddd;">Product Name</th>
            <th style="padding: 10px; border-bottom: 1px solid #ddd;">Size</th>
            <th style="padding: 10px; border-bottom: 1px solid #ddd;">Price (EUR)</th>
            <th style="padding: 10px; border-bottom: 1px solid #ddd;">Quantity</th>
          </tr>
        </thead>
        <tbody>
  `;

  cart.forEach(item => {
    total += item.price * item.quantity;
    tableHTML += `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.size}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
    </div>
    <br>
    <p id="total" style="text-align: center; font-size: 18px;">Your Total: ${total} EUR</p>
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
