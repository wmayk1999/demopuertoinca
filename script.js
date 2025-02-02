// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación usando el nuevo sistema de auth.js
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Configurar la interfaz de usuario
    setupUI();
});

function setupUI() {
    // Agregar botón de cerrar sesión si no existe
    addLogoutButton();
    
    // Configurar navegación responsive
    setupResponsiveNav();
    
    // Configurar fichas técnicas
    setupFichasTecnicas();
}

function addLogoutButton() {
    const nav = document.querySelector('.main-nav');
    // Verificar si ya existe un botón de cerrar sesión
    const existingLogoutBtn = nav.querySelector('.logout-btn');
    if (nav && !existingLogoutBtn) {
        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.className = 'logout-btn'; // Añadimos una clase para identificarlo
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
        logoutBtn.style.marginLeft = 'auto';
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout(); // Función definida en auth.js
        });
        nav.appendChild(logoutBtn);
    }
}

function setupResponsiveNav() {
    const toggleNavBtn = document.getElementById('toggleNav');
    const mainNav = document.querySelector('.main-nav');
    
    if (toggleNavBtn && mainNav) {
        toggleNavBtn.addEventListener('click', function() {
            mainNav.classList.toggle('collapsed');
        });
    }
}

function setupFichasTecnicas() {
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
}