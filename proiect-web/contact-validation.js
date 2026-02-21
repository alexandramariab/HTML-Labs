// Contact Form Validation with Regex
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const fields = {
        name: { input: document.getElementById('name'), regex: /^[a-zA-ZăâîșțĂÂÎȘȚ\s]{2,50}$/, min: 2, msg: 'Numele trebuie să aibă minim 2 caractere (doar litere și spații)' },
        email: { input: document.getElementById('email'), regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, required: true, msg: 'Format email invalid (ex: nume@exemplu.com)' },
        title: { input: document.getElementById('title'), min: 3, msg: 'Titlul trebuie să aibă minim 3 caractere' },
        description: { input: document.getElementById('description'), min: 10, msg: 'Descrierea trebuie să aibă minim 10 caractere' }
    };

    function showError(input, message) {
        const existing = input.parentElement.querySelector('.error-message');
        if (existing) existing.remove();
        
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = 'color: #ff0000; font-size: 14px; display: block; margin-top: 5px;';
        input.parentElement.appendChild(error);
        input.classList.add('error-input');
    }

    function removeError(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) error.remove();
        input.classList.remove('error-input');
    }

    function validateField(fieldName) {
        const field = fields[fieldName];
        if (!field.input) return true;
        
        const value = field.input.value.trim();
        
        if (field.required && !value) {
            showError(field.input, 'Acest câmp este obligatoriu');
            return false;
        }
        
        if (field.min && value.length > 0 && value.length < field.min) {
            showError(field.input, field.msg);
            return false;
        }
        
        if (field.regex && value && !field.regex.test(value)) {
            showError(field.input, field.msg);
            return false;
        }
        
        removeError(field.input);
        return true;
    }

    // Real-time validation
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field.input) {
            field.input.addEventListener('blur', () => validateField(fieldName));
            field.input.addEventListener('input', function() {
                if (this.classList.contains('error-input')) {
                    validateField(fieldName);
                }
            });
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isValid = Object.keys(fields).every(fieldName => validateField(fieldName));
        
        if (isValid) {
            const formData = {
                name: fields.name.input.value.trim(),
                email: fields.email.input.value.trim(),
                title: fields.title.input.value.trim(),
                description: fields.description.input.value.trim(),
                timestamp: new Date().toISOString()
            };

            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            const success = document.createElement('div');
            success.textContent = 'Mesajul a fost trimis cu succes!';
            success.style.cssText = 'background: #4CAF50; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;';
            form.appendChild(success);
            form.reset();
            setTimeout(() => success.remove(), 5000);
        } else {
            const error = document.createElement('div');
            error.textContent = 'Vă rugăm să corectați erorile din formular';
            error.style.cssText = 'background: #f44336; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;';
            form.appendChild(error);
            setTimeout(() => error.remove(), 5000);
        }
    });
});

