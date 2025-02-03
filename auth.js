// ESTA VERSION MEJORADA

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

async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        // Verificación temporal de credenciales mientras se implementa el backend
        if (username === 'puertoinca' && password === 'puertoinca') {
            // Generar un token JWT simulado con expiración de 2 horas
            const token = generateTemporaryJWT(username);
            handleSuccessfulLogin(token);
            window.location.href = 'index.html';
            return;
        }
        
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Credenciales inválidas';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Error en el inicio de sesión';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

function generateTemporaryJWT(username) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const now = Math.floor(Date.now() / 1000);
    const payload = btoa(JSON.stringify({
        sub: username,
        iat: now,
        exp: now + (2 * 60 * 60), // 2 horas de expiración
        nonce: crypto.getRandomValues(new Uint8Array(16)).join('')
    }));
    
    // En una implementación real, esto debería estar firmado con una clave secreta
    const signature = btoa('temporary-signature');
    
    return `${header}.${payload}.${signature}`;
}

function handleSuccessfulLogin(token) {
    // Almacenar token en sessionStorage
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('loginTimestamp', Date.now().toString());
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
        // Decodificar token JWT
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Verificar timestamp
        if (Date.now() - parseInt(timestamp) > 7200000) { // 2 horas
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