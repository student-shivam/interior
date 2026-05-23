document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Injection of Services Lightbox HTML
    const lightboxHTML = `
        <div id="services-lightbox" class="lightbox">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-content" id="servicesLightboxImage" alt="Service Gallery Image">
            <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
            <button class="lightbox-next" aria-label="Next image">&#10095;</button>
            <div class="lightbox-caption">
                <h3 class="lightbox-title"></h3>
                <p class="lightbox-desc"></p>
                <div class="lightbox-counter" style="margin-top: 10px; font-size: 0.85rem; color: rgba(255, 255, 255, 0.6); font-weight: 500;"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('services-lightbox');
    const lightboxImage = document.getElementById('servicesLightboxImage');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-desc');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');

    let currentImagesList = [];
    let currentImgIndex = 0;
    let currentTitleText = "";
    let currentDescText = "";

    // Function to open the lightbox
    function openServicesLightbox(imagesList, index, title, desc) {
        currentImagesList = imagesList;
        currentImgIndex = index;
        currentTitleText = title;
        currentDescText = desc;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to update content in the lightbox
    function updateLightboxContent() {
        if (currentImagesList.length > 0) {
            lightboxImage.src = currentImagesList[currentImgIndex];
            lightboxTitle.textContent = currentTitleText;
            lightboxDesc.textContent = currentDescText;
            lightboxCounter.textContent = `Image ${currentImgIndex + 1} of ${currentImagesList.length}`;
        }
    }

    // Function to close the lightbox
    function closeServicesLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navigate to next image
    function showNextImage() {
        if (currentImagesList.length > 0) {
            currentImgIndex = (currentImgIndex + 1) % currentImagesList.length;
            updateLightboxContent();
        }
    }

    // Navigate to previous image
    function showPrevImage() {
        if (currentImagesList.length > 0) {
            currentImgIndex = (currentImgIndex - 1 + currentImagesList.length) % currentImagesList.length;
            updateLightboxContent();
        }
    }

    // Bind event listeners to controls
    lightboxClose.addEventListener('click', closeServicesLightbox);
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
    
    // Close lightbox on clicking dark background
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox')) {
            closeServicesLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeServicesLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });

    // ==================== Page-specific Card Setup ====================

    // A. Homepage Grid Setup (.services-grid)
    const homepageCards = document.querySelectorAll('.services-grid .service-card');
    homepageCards.forEach(card => {
        const id = card.id;
        const images = SERVICE_IMAGES[id];
        if (!images || images.length === 0) return;

        // Replace icon with service image container
        const iconContainer = card.querySelector('.service-icon');
        if (iconContainer) {
            const imgContainerHTML = `
                <div class="service-card-image service-image">
                    <img src="${images[0]}" alt="${card.querySelector('h3').textContent}">
                </div>
            `;
            iconContainer.outerHTML = imgContainerHTML;
        }

        const imgContainer = card.querySelector('.service-image');
        if (!imgContainer) return;

        // Inject details hover overlay
        const overlayHTML = `
            <div class="service-gallery-overlay">
                <div class="service-gallery-btn">
                    <i class="fas fa-arrow-right"></i> View Details
                </div>
            </div>
        `;
        imgContainer.insertAdjacentHTML('beforeend', overlayHTML);

        // Click to view details page
        imgContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = ``${id}.html``;
        });
    });

    // B. Services Page Card Setup (.services-grid-full)
    const servicePageCards = document.querySelectorAll('.services-grid-full .service-card-full');
    servicePageCards.forEach(card => {
        const id = card.id;
        const images = SERVICE_IMAGES[id];
        if (!images || images.length === 0) return;

        const imgContainer = card.querySelector('.service-image');
        if (!imgContainer) return;

        // Replace main image source with first asset image
        const mainImg = imgContainer.querySelector('img');
        if (mainImg) {
            mainImg.src = images[0];
        }

        // Inject details hover overlay
        const overlayHTML = `
            <div class="service-gallery-overlay">
                <div class="service-gallery-btn">
                    <i class="fas fa-arrow-right"></i> View Details
                </div>
            </div>
        `;
        imgContainer.insertAdjacentHTML('beforeend', overlayHTML);

        // Click to view details page
        imgContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = ``${id}.html``;
        });
    });
});

