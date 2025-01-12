// Funkcja do dodawania produktu do koszyka
function addToCart(productName, price,) {
  // Pobieramy koszyk z localStorage (jeśli istnieje) lub tworzymy nowy pusty koszyk
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Tworzymy obiekt produktu
  const product = {
    name: productName,
    price: price,
    quantity: 1,
  };

  // Sprawdzamy, czy produkt już jest w koszyku
  const existingProduct = cart.find(item => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;  // Zwiększamy ilość, jeśli produkt już jest w koszyku
  } else {
    cart.push(product);  // Dodajemy nowy produkt, jeśli nie ma go w koszyku
  }

  // Zapisujemy zaktualizowany koszyk do localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification("Product added to cart!");
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
  }, 5000);
}


  // Zaktualizuj liczbę produktów w koszyku na stronie
  updateCartCount();
}

// Funkcja do aktualizacji liczby produktów w koszyku
function updateCartCount() {
  // Pobierz koszyk z localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalItems = 0;

  // Sumujemy ilość wszystkich produktów w koszyku
  cart.forEach(item => {
    totalItems += item.quantity;
  });

  // Aktualizujemy liczbę produktów w ikonie koszyka
  document.getElementById('cart-count').innerText = totalItems;
}

// Funkcja do ładowania koszyka na stronie koszyka
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');
  let total = 0;

  // Generowanie zawartości koszyka
  cart.forEach(item => {
    total += item.price * item.quantity;
    cartContainer.innerHTML += `
    <div class="koszyczek">
      <div class="cart-item">
        <p>${item.name}</p>
        <p>Price: ${item.price} EUR</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      </div>
      <br>
      <br>
    `;
  });

  // Wyświetlenie całkowitej kwoty
  document.getElementById('total').innerText = `Your Total: ${total} EUR`;
  
}

document.addEventListener("DOMContentLoaded", function () {
  // Funkcja do czyszczenia koszyka
  const clearCartButton = document.getElementById("clear-cart-btn");

  clearCartButton.addEventListener("click", function () {
      // Usuń koszyk z localStorage
      localStorage.removeItem("cart");
      
      // Automatycznie odśwież stronę po usunięciu koszyka
      location.reload();
  });
});

// Funkcja do zaktualizowania liczby produktów w koszyku
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Zaktualizowanie liczby produktów w ikonie koszyka
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cartCount;
}

// Wywołujemy funkcję, aby liczba była zaktualizowana na każdej stronie
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount(); // Zaktualizowanie licznika koszyka przy ładowaniu strony
});





