function toggleFicha(button) {
    const fichaDiv = button.nextElementSibling;
    if (fichaDiv.style.display === "none") {
        fichaDiv.style.display = "block";
        button.textContent = "Ocultar Ficha Técnica";
    } else {
        fichaDiv.style.display = "none";
        button.textContent = "Ver Ficha Técnica";
    }
}