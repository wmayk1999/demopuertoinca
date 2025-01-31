
document.addEventListener('DOMContentLoaded', function() {
    // Código existente

// Verificar autenticación
function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    checkAuth();

    // Agregar botón de cerrar sesión
    const nav = document.querySelector('.main-nav');
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
    logoutBtn.style.marginLeft = 'auto';
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
    nav.appendChild(logoutBtn);

    // Highlight active link
    highlightActiveLink();
    
    // Mejorar toggle de ficha técnica
    const fichaBtns = document.querySelectorAll('.ficha-btn');
    fichaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fichaDiv = this.nextElementSibling;
            const isVisible = fichaDiv.style.display === "block";
            
            if (isVisible) {
                fichaDiv.style.opacity = '0';
                setTimeout(() => {
                    fichaDiv.style.display = 'none';
                    this.textContent = "Ver Ficha Técnica";
                }, 300);
            } else {
                fichaDiv.style.display = 'block';
                setTimeout(() => {
                    fichaDiv.style.opacity = '1';
                }, 10);
                this.textContent = "Ocultar Ficha Técnica";
            }
        });
    });
});
// Agregar funcionalidad de contraer/expandir la barra de navegación
const toggleNavBtn = document.getElementById('toggleNav');
const mainNav = document.querySelector('.main-nav');

toggleNavBtn.addEventListener('click', function() {
    mainNav.classList.toggle('collapsed');
});
});