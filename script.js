// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Evitar ejecutar la verificación en la página de login
    if (window.location.pathname.includes('login.html')) {
        return;
    }

    // Verificar autenticación solo en las páginas protegidas
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Configurar la interfaz de usuario solo si estamos en una página protegida
    setupUI();

    // AQUÍ EMPIEZA EL CÓDIGO DEL MODAL
    // Código del modal - Solo se ejecuta en la página de inicio
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        const modal = document.getElementById('newsModal');
        const closeButton = document.querySelector('.close-button');
        
        // Mostrar el modal automáticamente después de 1 segundo
        setTimeout(() => {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }, 1000);

        // Cerrar modal con el botón X
        closeButton.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });

        // Cerrar modal haciendo clic fuera
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    }
    // AQUÍ TERMINA EL CÓDIGO DEL MODAL
});

function setupUI() {
    // Agregar botón de cerrar sesión si no existe
    addLogoutButton();
    
    // Configurar navegación responsive
    setupResponsiveNav();
    
    // Configurar fichas técnicas solo si existen en la página
    if (document.querySelector('.ficha-btn')) {
        setupFichasTecnicas();
    }
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