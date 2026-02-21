// Subscription Calculator
document.addEventListener('DOMContentLoaded', function() {
    const prices = {
        'silver-basic': 200, 'silver-cardio': 150, 'silver-strength': 180,
        'gold-complete': 350, 'gold-group': 400, 'gold-trainer': 450, 'gold-all': 380,
        'diamond-premium': 550, 'diamond-trainer4': 650, 'diamond-group': 600, 'diamond-nutrition': 700
    };

    const type = document.getElementById('subscription-type');
    const duration = document.getElementById('duration');
    const display = document.getElementById('duration-display');
    const price = document.getElementById('calculated-price');
    const result = document.getElementById('calculator-result');

    if (!type || !duration || !price) return;

    function calculate() {
        const monthly = prices[type.value] || 0;
        const months = parseInt(duration.value) || 1;
        const total = monthly * months;
        const discount = months >= 6 ? Math.floor(total * 0.1) : 0;
        const final = total - discount;

        price.textContent = final + ' RON';
        
        if (result && monthly > 0) {
            result.innerHTML = `
                <p class="price-breakdown">
                    Preț lunar: ${monthly} RON<br>
                    Durată: ${months} luni<br>
                    ${discount > 0 ? `<strong>Reducere: -${discount} RON (10%)</strong><br>` : ''}
                    <span class="final-price">Preț final: ${final} RON</span>
                </p>
            `;
        }
    }

    if (display) {
        display.textContent = duration.value + ' luni';
        duration.addEventListener('input', function() {
            display.textContent = this.value + ' luni';
            calculate();
        });
    }

    type.addEventListener('change', calculate);
    calculate();
});