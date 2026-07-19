// ==========================================
// 1. CURSORE PERSONALIZZATO
// ==========================================
const cursor = document.querySelector('.custom-cursor');
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

// Funzione per aggiungere eventi a un elemento
function addCursorEvents(el) {
    if (el.hasAttribute('data-cursor-listener')) return;
    el.setAttribute('data-cursor-listener', 'true');
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover-effect');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover-effect');
    });
}

// Seleziona TUTTI gli elementi interattivi
const interactiveSelectors = [
    'a', '.service-link', '.explore-link', '.footer-link', 
    '.logo-btn', '.big-title span', '.footer-content a',
    '.footer-link.regular', '.big-title'
];

// Aggiungi eventi a tutti gli elementi esistenti
document.querySelectorAll(interactiveSelectors.join(',')).forEach(addCursorEvents);

// ==========================================
// 2. INVERSIONE COLORI (FIORE) + LOCALSTORAGE
// ==========================================
const flowerToggle = document.getElementById('flowerToggle');

// Recupera il tema salvato
const savedTheme = localStorage.getItem('gg-theme');
if (savedTheme === 'light') {
    document.body.classList.add('inverted');
}

// Evento click sul fiore
if (flowerToggle) {
    flowerToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('inverted');
        
        // Salva la preferenza
        if (document.body.classList.contains('inverted')) {
            localStorage.setItem('gg-theme', 'light');
        } else {
            localStorage.setItem('gg-theme', 'dark');
        }
    });
}

// ==========================================
// 3. MUTATION OBSERVER PER NUOVI ELEMENTI
// ==========================================
const observer = new MutationObserver(() => {
    document.querySelectorAll(interactiveSelectors.join(',')).forEach(addCursorEvents);
});

observer.observe(document.body, { childList: true, subtree: true });

console.log('Script caricato - Home page senza image trail');