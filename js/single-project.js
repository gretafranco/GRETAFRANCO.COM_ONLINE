document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const counter = lightbox.querySelector('.lightbox-counter');
    const galleryImages = document.querySelectorAll('.images-scroll .image-item img');
    
    let currentIndex = 0;

    if (galleryImages.length === 0) return;
    if (galleryImages.length === 1) lightbox.classList.add('single-image');

    function openLightbox(index) {
        currentIndex = index;
        updateImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Blocca lo scroll della pagina
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Ripristina lo scroll
    }

    function updateImage() {
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateImage();
    }

    // Event Listeners
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
});