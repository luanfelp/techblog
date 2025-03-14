// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    updateAuthUI();

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            login(email, password);
        });
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                showMessage('As senhas não coincidem', 'error');
                return;
            }
            
            register(name, email, password);
        });
    }
});

// Function to update UI based on authentication state
function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginWidget = document.getElementById('login-widget');
    const userWidget = document.getElementById('user-widget');
    const loginBtn = document.querySelector('.login-btn');
    const commentForm = document.querySelector('.comment-form');
    
    if (user) {
        // User is logged in
        if (loginWidget) loginWidget.style.display = 'none';
        if (userWidget) {
            userWidget.style.display = 'block';
            const userName = userWidget.querySelector('#user-name');
            if (userName) userName.textContent = user.name;
        }
        
        if (loginBtn) {
            loginBtn.innerHTML = `<a href="perfil.html">Olá, ${user.name}</a>`;
        }
        
        if (commentForm) {
            commentForm.style.display = 'block';
        }
        
        // Show admin panel link if user is admin
        if (user.isAdmin) {
            const adminLink = document.createElement('li');
            adminLink.innerHTML = '<a href="admin/index.html"><i class="fas fa-cog"></i> Painel Admin</a>';
            document.querySelector('.user-menu').appendChild(adminLink);
        }
    } else {
        // User is not logged in
        if (loginWidget) loginWidget.style.display = 'block';
        if (userWidget) userWidget.style.display = 'none';
        
        if (loginBtn) {
            loginBtn.innerHTML = '<a href="login.html">Login / Cadastro</a>';
        }
        
        if (commentForm) {
            commentForm.style.display = 'none';
            const commentLogin = document.createElement('div');
            commentLogin.className = 'comment-login';
            commentLogin.innerHTML = `
                <p>Você precisa estar logado para comentar.</p>
                <a href="login.html" class="btn">Login / Cadastro</a>
            `;
            commentForm.parentNode.insertBefore(commentLogin, commentForm);
        }
    }
}

// Function to register a new user
function register(name, email, password) {
    // Check if user already exists (in a real app, this would be a server-side check)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        showMessage('Este email já está em uso', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, you would hash this password
        isAdmin: false,
        createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    const userInfo = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    
    showMessage('Cadastro realizado com sucesso!', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Function to login
function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showMessage('Email ou senha incorretos', 'error');
        return;
    }
    
    // Save user info to localStorage
    const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    
    showMessage('Login realizado com sucesso!', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Function to logout
function logout() {
    localStorage.removeItem('user');
    showMessage('Logout realizado com sucesso!', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Function to show message
function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 3000);
}