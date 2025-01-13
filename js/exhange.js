// Obiekt na kursy walut
const exchangeRates = {
    EUR: 1, // baza
    PLN: null // zostanie pobrany z API
};

// Funkcja pobierania kursów walut z API
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();
        exchangeRates.PLN = data.rates.PLN; // przypisanie kursu PLN
        console.log('Kursy zaktualizowane:', exchangeRates);
        
        // Zaktualizowanie cen po załadowaniu kursów
        const savedCurrency = localStorage.getItem('selectedCurrency') || 'EUR';
        updatePrices(savedCurrency);
    } catch (error) {
        console.error('Nie udało się pobrać kursów walut:', error);
    }
}

// Funkcja przeliczania cen
function updatePrices(currency) {
    const prices = document.querySelectorAll('.price');
    prices.forEach(priceElement => {
        const originalPrice = parseFloat(priceElement.getAttribute('data-original-price'));
        const convertedPrice = (originalPrice * exchangeRates[currency]).toFixed(2);
        priceElement.textContent = `${convertedPrice} ${currency}`;
    });
}

// Ustawienie waluty na podstawie wyboru
function handleCurrencyChange() {
    const currency = document.getElementById('currency-selector').value;
    localStorage.setItem('selectedCurrency', currency);
    updatePrices(currency);
}

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    const currencySelector = document.getElementById('currency-selector');
    const savedCurrency = localStorage.getItem('selectedCurrency') || 'EUR';
    currencySelector.value = savedCurrency;

    // Przypisanie zdarzenia zmiany
    currencySelector.addEventListener('change', handleCurrencyChange);

    // Pobranie kursów walut i ustawienie początkowej waluty
    fetchExchangeRates();
});
