// Simple decorative canvas animation
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 200;
    
    let angle = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        angle += 0.05;
        
        const x = canvas.width / 2 + Math.cos(angle) * 80;
        const y = canvas.height / 2 + Math.sin(angle) * 40;
        
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#f3aacD';
        ctx.fill();
        
        requestAnimationFrame(animate);
    }
    animate();
});
