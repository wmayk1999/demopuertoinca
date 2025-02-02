// auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Solo configurar el formulario de login si estamos en la página de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    } else {
        // Si no estamos en la página de login, verificar autenticación
        checkAuthAndRedirect();
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
            nonce: Math.random().toString(36).substring(7)
        }));
        
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('loginTimestamp', Date.now().toString());
        
        window.location.href = 'index.html';
    } else {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

function checkAuthAndRedirect() {
    // Solo hacer la redirección si no estamos ya en la página correcta
    const isLoginPage = window.location.pathname.includes('login.html');
    const isAuthenticated = checkAuthentication();

    if (isLoginPage && isAuthenticated) {
        window.location.href = 'index.html';
    } else if (!isLoginPage && !isAuthenticated) {
        window.location.href = 'login.html';
    }
}

function checkAuthentication() {
    const token = sessionStorage.getItem('authToken');
    const timestamp = sessionStorage.getItem('loginTimestamp');
    
    if (!token || !timestamp) {
        return false;
    }

    try {
        const tokenData = JSON.parse(atob(token));
        
        if (tokenData.timestamp.toString() !== timestamp) {
            return false;
        }
        
        if (Date.now() - parseInt(timestamp) > 7200000) {
            logout();
            return false;
        }
        
        return true;
    } catch (e) {
        return false;
    }
}

function isAuthenticated() {
    return checkAuthentication();
}

function logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('loginTimestamp');
    window.location.href = 'login.html';
}