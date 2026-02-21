// Rotating Motivational Messages for gym.html
// Uses: setInterval, DOM manipulation, Array methods, String methods, classList, getComputedStyle

document.addEventListener('DOMContentLoaded', function() {
    const heroPanel = document.querySelector('.hero-panel p');
    if (!heroPanel) return;

    // Array of motivational messages using Array methods
    const messages = [
        'Motivație și fitness la cel mai înalt nivel',
        'Transformă-ți viața prin sport și disciplină',
        'Fiecare antrenament te aduce mai aproape de obiectivele tale',
        'Puterea vine din consecvență și dedicare',
        'Azi e ziua perfectă pentru a începe',
        'Rezultatele vin la cei care nu renunță',
        'Corpul tău poate orice - mintea ta trebuie să fie convinsă',
        'Nu e despre perfecțiune, e despre progres',
        'Fiecare repetare contează, fiecare zi contează',
        'Devino versiunea ta cea mai puternică'
    ];

    let currentIndex = 0;

    // Function to change message with fade effect
    function changeMessage() {
        // Use getComputedStyle to check current opacity
        const currentStyle = window.getComputedStyle(heroPanel);
        const currentOpacity = parseFloat(currentStyle.opacity) || 1;

        // Fade out
        heroPanel.style.transition = 'opacity 0.5s ease';
        heroPanel.style.opacity = '0';

        setTimeout(() => {
            // Use Array method to get next message
            currentIndex = (currentIndex + 1) % messages.length;
            const newMessage = messages[currentIndex];
            
            // Use String method to capitalize first letter
            const capitalizedMessage = newMessage.charAt(0).toUpperCase() + newMessage.slice(1);
            
            heroPanel.textContent = capitalizedMessage;
            
            // Fade in
            heroPanel.style.opacity = '1';
        }, 500);
    }

    // Change message every 3 seconds using setInterval
    setInterval(changeMessage, 3000);

    // Randomly change text color every 5 seconds using Math.random
    setInterval(function() {
        const colors = ['#ffffff', '#f3aacD', '#ffbe0b', '#ff69b4', '#ff8c00'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        heroPanel.style.color = randomColor;
        heroPanel.style.transition = 'color 0.8s ease';
    }, 5000);
});

