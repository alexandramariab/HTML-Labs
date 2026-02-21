// Random color change on hover (simple WOW effect)
// Uses: Math.random, DOM manipulation, event listeners

document.addEventListener('DOMContentLoaded', function() {
    // Function to generate random color
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 60 + Math.floor(Math.random() * 40); // 60-100%
        const lightness = 40 + Math.floor(Math.random() * 30); // 40-70%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    
    // Apply random color hover to service links
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            const randomColor = getRandomColor();
            this.style.color = randomColor;
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
});

