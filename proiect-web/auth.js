// Login/Logout System
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav .menu');
    if (!nav) return;

    const isLoggedIn = () => localStorage.getItem('currentUser') !== null;
    const getUser = () => JSON.parse(localStorage.getItem('currentUser') || 'null');
    const showMsg = (text, bg) => {
        const msg = document.createElement('div');
        msg.textContent = text;
        msg.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${bg}; color: white; padding: 15px 25px; border-radius: 8px; z-index: 10001; box-shadow: 0 4px 15px rgba(0,0,0,0.3);`;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    };

    function createAuthButton() {
        const existing = document.getElementById('auth-button-container');
        if (existing) existing.remove();

        const container = document.createElement('li');
        container.id = 'auth-button-container';
        container.style.marginLeft = 'auto';

        const btn = document.createElement('a');
        btn.href = '#';
        btn.style.cursor = 'pointer';
        
        if (isLoggedIn()) {
            btn.textContent = `Logout (${getUser().username})`;
            btn.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                sessionStorage.clear();
                createAuthButton();
                showMsg('Te-ai deconectat cu succes', '#4CAF50');
            };
        } else {
            btn.textContent = 'Login';
            btn.onclick = showLoginModal;
        }
        
        container.appendChild(btn);
        nav.appendChild(container);
    }

    function showLoginModal(e) {
        e.preventDefault();
        const overlay = document.createElement('div');
        overlay.id = 'login-overlay';
        overlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 10000; display: flex; justify-content: center; align-items: center;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background: white; padding: 40px; border-radius: 12px; max-width: 400px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);';
        modal.innerHTML = `
            <h2 style="margin:0 0 20px; text-align:center;">Login</h2>
            <form id="login-form">
                <label style="display:block; margin-bottom:8px; font-weight:bold;">Username:</label>
                <input type="text" id="login-username" required style="width:100%; padding:12px; margin-bottom:20px; border:2px solid #ddd; border-radius:8px; box-sizing:border-box;">
                <label style="display:block; margin-bottom:8px; font-weight:bold;">Password:</label>
                <input type="password" id="login-password" required style="width:100%; padding:12px; margin-bottom:20px; border:2px solid #ddd; border-radius:8px; box-sizing:border-box;">
                <button type="submit" style="width:100%; padding:15px; background:linear-gradient(135deg, #f3aacD, #ff8c00); color:white; border:none; border-radius:8px; font-size:18px; font-weight:bold; cursor:pointer;">Login</button>
                <button type="button" id="close-login" style="width:100%; padding:10px; margin-top:10px; background:#ccc; border:none; border-radius:8px; cursor:pointer;">Anulează</button>
            </form>
            <div id="login-error" style="color:red; margin-top:10px; text-align:center; display:none;"></div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const close = () => overlay.remove();
        document.getElementById('close-login').onclick = close;
        overlay.onclick = (e) => { if (e.target === overlay) close(); };
        document.getElementById('login-form').onsubmit = async (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;
            const errorDiv = document.getElementById('login-error');

            try {
                let users = [];
                try {
                    const response = await fetch('users.json');
                    if (response.ok) {
                        users = await response.json();
                    }
                } catch (e) {
                    users = [];
                }
                
                // if (!Array.isArray(users)) {
                //     users = [];
                // }
                
                const user = users.find(u => u.username === username && u.password === password) || 
                           (username === 'demo' && password === 'demo123' ? { username: 'demo', email: 'demo@goldfitgym.ro' } : null);

                if (user) {
                    user.loginTime = new Date().toISOString();
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    sessionStorage.setItem('sessionActive', 'true');
                    close();
                    createAuthButton();
                    showMsg(`Bun venit, ${user.username}!`, 'linear-gradient(135deg, #f3aacD, #ff8c00)');
                } else {
                    errorDiv.textContent = 'Username sau parolă incorectă';
                    errorDiv.style.display = 'block';
                }
            } catch {
                errorDiv.textContent = 'Eroare la conectare. Încearcă: demo / demo123';
                errorDiv.style.display = 'block';
            }
        };
    }

    createAuthButton();
});
