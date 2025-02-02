// Verificar si ya está logueado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Si ya está logueado, redirigir al index
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Configurar el manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            if (username === 'puertoinca' && password === 'puertoinca') {
                // Guardar el estado de login
                localStorage.setItem('isLoggedIn', 'true');
                // Redirigir a la página principal
                window.location.href = 'index.html';
            } else {
                errorMessage.style.display = 'block';
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 3000);
            }
        });
    }
});