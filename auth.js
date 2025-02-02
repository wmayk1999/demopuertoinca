// auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar token y timestamp al cargar la página
    checkAuthAndRedirect();

    // Configurar el manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (username === 'puertoinca' && password === 'puertoinca') {
        // Crear un token simple con timestamp
        const token = btoa(JSON.stringify({
            user: username,
            timestamp: Date.now(),
            // Añadir un valor aleatorio para hacer el token más único
            nonce: Math.random().toString(36).substring(7)
        }));
        
        // Guardar token y timestamp
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('loginTimestamp', Date.now().toString());
        
        // Redirigir a la página principal
        window.location.href = 'index.html';
    } else {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

function checkAuthAndRedirect() {
    // Si estamos en login.html y el usuario está autenticado, redirigir a index
    if (window.location.pathname.includes('login.html')) {
        if (isAuthenticated()) {
            window.location.href = 'index.html';
        }
        return;
    }
    
    // Si no estamos en login.html y el usuario no está autenticado, redirigir a login
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

function isAuthenticated() {
    const token = sessionStorage.getItem('authToken');
    const timestamp = sessionStorage.getItem('loginTimestamp');
    
    if (!token || !timestamp) {
        return false;
    }

    try {
        // Decodificar el token
        const tokenData = JSON.parse(atob(token));
        
        // Verificar que el token corresponde al timestamp almacenado
        if (tokenData.timestamp.toString() !== timestamp) {
            return false;
        }
        
        // Verificar si han pasado más de 2 horas (7200000 ms)
        if (Date.now() - parseInt(timestamp) > 7200000) {
            logout();
            return false;
        }
        
        return true;
    } catch (e) {
        return false;
    }
}

function logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('loginTimestamp');
    window.location.href = 'login.html';
}