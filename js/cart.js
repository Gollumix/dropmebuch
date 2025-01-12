// Funkcja do dodawania produktu do koszyka
function addToCart(productName, price, size) {
  // Pobieramy koszyk z localStorage (jeśli istnieje) lub tworzymy nowy pusty koszyk
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Tworzymy obiekt produktu
  const product = {
    name: productName,
    price: price,
    size: size, // Dodajemy rozmiar produktu
    quantity: 1,
  };

  // Sprawdzamy, czy produkt już jest w koszyku
  const existingProduct = cart.find(item => item.name === productName && item.size === size);
  if (existingProduct) {
    existingProduct.quantity += 1;  // Zwiększamy ilość, jeśli produkt o tym samym rozmiarze już jest w koszyku
  } else {
    cart.push(product);  // Dodajemy nowy produkt, jeśli nie ma go w koszyku
  }

  // Zapisujemy zaktualizowany koszyk do localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Wyświetlanie powiadomienia
  showNotification("Product added to cart!");

  // Zaktualizowanie widoku koszyka oraz licznika produktów w ikonie
  loadCart();  // Zaktualizowanie koszyka na stronie
  updateCartCount();  // Zaktualizowanie liczby produktów w ikonie
}

// Funkcja wyświetlania powiadomienia
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

// Funkcja do aktualizacji liczby produktów w koszyku
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalItems = 0;

  // Sumujemy ilość wszystkich produktów w koszyku
  cart.forEach(item => {
    totalItems += item.quantity;
  });

  // Aktualizujemy liczbę produktów w ikonie koszyka
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.innerText = totalItems;
  }
}

// Funkcja do ładowania koszyka na stronie koszyka
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');
  let total = 0;

  // Tworzymy tabelę HTML
  let tableHTML = `
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

  // Generowanie zawartości koszyka w tabeli
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
    <br>
    <p id="total">Your Total: ${total} EUR</p>
  `;

  // Wstawiamy tabelę do kontenera
  cartContainer.innerHTML = tableHTML;
}

// Funkcja do czyszczenia koszyka
function clearCart() {
  // Usuń koszyk z localStorage
  localStorage.removeItem("cart");

  // Zaktualizowanie widoku koszyka po czyszczeniu
  loadCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", function () {
  // Zaktualizowanie licznika koszyka przy ładowaniu strony
  updateCartCount();

  // Funkcja do czyszczenia koszyka
  const clearCartButton = document.getElementById("clear-cart-btn");

  if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
      clearCart();
    });
  }
});
