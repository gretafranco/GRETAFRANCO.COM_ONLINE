// js/theme-manager.js

(function() {
    // Applica il tema salvato ALL'ISTANTE per evitare il flash bianco/nero al caricamento
    const savedTheme = localStorage.getItem('gg-theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('inverted');
        // Applichiamo al body non appena disponibile
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('inverted');
        });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' || 
                       window.location.pathname.endsWith('index.html') ||
                       window.location.pathname === '' ||
                       window.location.pathname.endsWith('/');

    /**
     * Funzione universale per cambiare tema
     */
    function toggleTheme(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const isLight = document.body.classList.toggle('inverted');
        
        // Sincronizza anche l'elemento root per sicurezza
        if (isLight) {
            document.documentElement.classList.add('inverted');
            localStorage.setItem('gg-theme', 'light');
        } else {
            document.documentElement.classList.remove('inverted');
            localStorage.setItem('gg-theme', 'dark');
        }
    }

    // ==========================================
    // GESTIONE LOGO / FIORE
    // ==========================================
    
    if (isHomePage) {
        // In Home: il fiore (flowerToggle) cambia il tema
        const flowerToggle = document.getElementById('flowerToggle');
        if (flowerToggle) {
            // Rimuoviamo eventuali listener duplicati clonando il nodo
            const newFlowerToggle = flowerToggle.cloneNode(true);
            flowerToggle.parentNode.replaceChild(newFlowerToggle, flowerToggle);
            newFlowerToggle.addEventListener('click', toggleTheme);
        }
    } else {
        // Nelle altre pagine: il logo della navbar porta alla Home
        const navbarLogo = document.querySelector('.navbar-logo');
        if (navbarLogo) {
            const newNavbarLogo = navbarLogo.cloneNode(true);
            navbarLogo.parentNode.replaceChild(newNavbarLogo, navbarLogo);
            newNavbarLogo.addEventListener('click', (e) => {
                e.preventDefault();
                // Assicurati che il percorso sia corretto rispetto alla struttura cartelle
                window.location.href = '../index.html';
            });
        }
    }
});