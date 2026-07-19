// js/global.js

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    function addCursorEvents(el) {
        if (!el) return;
        if (el.hasAttribute('data-cursor-listener')) return;
        el.setAttribute('data-cursor-listener', 'true');
        el.addEventListener('mouseenter', () => {
            console.log('Hover su:', el);
            cursor.classList.add('hover-effect');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-effect');
        });
    }
    
    // Seleziona TUTTI i fiori possibili
    const allFlowers = document.querySelectorAll('#flowerToggle, .navbar-logo, .logo-btn');
    allFlowers.forEach(flower => {
        addCursorEvents(flower);
        console.log('✅ Fiore configurato:', flower);
    });
    
    // Seleziona tutti gli elementi cliccabili
    const allClickable = document.querySelectorAll('a, button, [href], .navbar-link, .service-link, .explore-link, .footer-link, .project-link-wrapper, .project-see-more');
    allClickable.forEach(addCursorEvents);
    
    console.log('✅ Totale elementi con hover-effect:', document.querySelectorAll('[data-cursor-listener]').length);
});


//menu hamburger
// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // chiudi cliccando un link
    mobileMenu.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
}