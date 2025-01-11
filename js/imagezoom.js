const image = document.getElementById("product-main-image");
const lens = document.querySelector(".zoom-lens");
const zoomFactor = 1.55; // Wielkość powiększenia

// Obsługa najechania na obraz
image.addEventListener("mousemove", zoom);

// Obsługa opuszczenia obrazu
image.addEventListener("mouseleave", () => {
    lens.style.display = "none"; // Ukryj lupę
    image.style.transform = "scale(1)"; // Przywróć pierwotny rozmiar obrazu
});

function zoom(event) {
    lens.style.display = "block"; // Pokaż lupę

    const bounds = image.getBoundingClientRect();
    const x = event.pageX - bounds.left - window.scrollX;
    const y = event.pageY - bounds.top - window.scrollY;

    // Pozycjonowanie lupy
    lens.style.left = `${x - lens.offsetWidth / 2}px`;
    lens.style.top = `${y - lens.offsetHeight / 2}px`;

    // Ograniczenie ruchu lupy do granic obrazu
    const lensX = Math.max(0, Math.min(x, bounds.width));
    const lensY = Math.max(0, Math.min(y, bounds.height));

    lens.style.left = `${lensX - lens.offsetWidth / 2}px`;
    lens.style.top = `${lensY - lens.offsetHeight / 2}px`;

    // Powiększanie obrazu
    const bgX = -(lensX * zoomFactor - lens.offsetWidth / 2);
    const bgY = -(lensY * zoomFactor - lens.offsetHeight / 2);

    image.style.transformOrigin = `${lensX}px ${lensY}px`;
    image.style.transform = `scale(${zoomFactor})`;
}