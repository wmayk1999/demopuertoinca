<<<<<<< HEAD

document.addEventListener('DOMContentLoaded1', function() {
    // Código existente

// Verificar autenticación
=======
// Función para verificar autenticación
>>>>>>> 26f559d (Actualización con los links)
function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Función para agregar el botón de cerrar sesión
function addLogoutButton() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
        logoutBtn.style.marginLeft = 'auto';
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
        nav.appendChild(logoutBtn);
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Primero verificamos la autenticación
    if (!checkAuth()) {
        return; // Si no está autenticado, no continuamos
    }

    // Agregamos el botón de cerrar sesión
    addLogoutButton();

    // Toggle para la navegación responsive
    const toggleNavBtn = document.getElementById('toggleNav');
    const mainNav = document.querySelector('.main-nav');
    if (toggleNavBtn && mainNav) {
        toggleNavBtn.addEventListener('click', function() {
            mainNav.classList.toggle('collapsed');
        });
    }

    // Funcionalidad para las fichas técnicas
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
<<<<<<< HEAD
});
// Agregar funcionalidad de contraer/expandir la barra de navegación
const toggleNavBtn = document.getElementById('toggleNav');
const mainNav = document.querySelector('.main-nav');

toggleNavBtn.addEventListener('click', function() {
    mainNav.classList.toggle('collapsed');
});
});
=======
});
>>>>>>> 26f559d (Actualización con los links)
