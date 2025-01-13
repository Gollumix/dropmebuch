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
      }, 300); // Możesz dostosować czas opóźnienia
    };
  });
  