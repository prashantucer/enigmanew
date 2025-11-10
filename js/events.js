// ============================================
// Events Page - Filter Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    // Get category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Set active filter based on URL parameter
    if (categoryParam) {
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === categoryParam) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        filterEvents(categoryParam);
    }
    
    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.dataset.filter;
            
            // Filter events
            filterEvents(filter);
        });
    });
    
    function filterEvents(category) {
        eventCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.add('visible');
                card.style.display = 'block';
            } else {
                card.classList.remove('visible');
                card.style.display = 'none';
            }
        });
    }
    
    // Advanced lazy loading for event images with priority loading
    const eventImages = document.querySelectorAll('.event-image img[data-src]');
    
    // Preload first 3 visible images immediately (above the fold)
    const preloadCount = Math.min(3, eventImages.length);
    for (let i = 0; i < preloadCount; i++) {
        const img = eventImages[i];
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
            const newImg = new Image();
            newImg.onload = function() {
                img.src = dataSrc;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                img.closest('.event-image')?.classList.add('image-loaded');
            };
            newImg.onerror = function() {
                img.removeAttribute('data-src');
                img.style.display = 'none';
            };
            newImg.src = dataSrc;
        }
    }
    
    // Lazy load remaining images with IntersectionObserver
    if ('IntersectionObserver' in window && eventImages.length > preloadCount) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.getAttribute('data-src');
                    
                    if (dataSrc) {
                        // Create new image to preload with decoding
                        const newImg = new Image();
                        newImg.decoding = 'async';
                        
                        newImg.onload = function() {
                            // Smooth fade-in transition
                            img.src = dataSrc;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                            img.closest('.event-image')?.classList.add('image-loaded');
                            
                            // Remove loading state
                            const eventImage = img.closest('.event-image');
                            if (eventImage) {
                                eventImage.classList.remove('image-loading');
                            }
                        };
                        
                        newImg.onerror = function() {
                            img.removeAttribute('data-src');
                            img.style.display = 'none';
                            const eventImage = img.closest('.event-image');
                            if (eventImage) {
                                eventImage.classList.remove('image-loading');
                                eventImage.classList.add('image-error');
                            }
                        };
                        
                        // Mark as loading
                        const eventImage = img.closest('.event-image');
                        if (eventImage) {
                            eventImage.classList.add('image-loading');
                        }
                        
                        newImg.src = dataSrc;
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '100px', // Start loading 100px before image is visible (increased for smoother experience)
            threshold: 0.01 // Trigger when 1% of image is visible
        });
        
        // Observe remaining images (skip first 3)
        for (let i = preloadCount; i < eventImages.length; i++) {
            const img = eventImages[i];
            if (img.hasAttribute('data-src')) {
                imageObserver.observe(img);
            }
        }
    } else {
        // Fallback: Load all remaining images immediately
        for (let i = preloadCount; i < eventImages.length; i++) {
            const img = eventImages[i];
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
                img.src = dataSrc;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                img.closest('.event-image')?.classList.add('image-loaded');
            }
        }
    }
});




