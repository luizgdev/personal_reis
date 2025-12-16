/**
 * Main JavaScript file for Personal Reis
 */



// --- Slider / Reviews ---



function initSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const paginationDots = document.querySelectorAll(".pagination-dot");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const carouselContainer = document.getElementById("carousel-container");

    if (slides.length === 0) return;

    function updateSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove("opacity-0", "pointer-events-none");
                slide.classList.add("opacity-100");
            } else {
                slide.classList.remove("opacity-100");
                slide.classList.add("opacity-0", "pointer-events-none");
            }
        });

        paginationDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove("bg-white/20");
                dot.classList.add("bg-brand-primary");
            } else {
                dot.classList.remove("bg-brand-primary");
                dot.classList.add("bg-white/20");
            }
        });
    }

    function navigateSlide(direction) {
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        updateSlide(currentSlide);
    }

    if (prevBtn) prevBtn.addEventListener("click", () => navigateSlide(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => navigateSlide(1));

    // Pagination click
    paginationDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });

    // Swipe functionality
    let startX = 0;
    let isDragging = false;

    function startDrag(e) {
        isDragging = true;
        startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;

        if (diff > 50) {
            isDragging = false;
            navigateSlide(-1); // Swipe right (prev)
        } else if (diff < -50) {
            isDragging = false;
            navigateSlide(1); // Swipe left (next)
        }
    }

    function endDrag() {
        isDragging = false;
    }

    if (carouselContainer) {
        carouselContainer.addEventListener("mousedown", startDrag);
        carouselContainer.addEventListener("mousemove", dragMove);
        carouselContainer.addEventListener("mouseup", endDrag);
        carouselContainer.addEventListener("mouseleave", endDrag);

        carouselContainer.addEventListener("touchstart", startDrag, { passive: true });
        carouselContainer.addEventListener("touchmove", dragMove, { passive: true });
        carouselContainer.addEventListener("touchend", endDrag);
    }

    // Initialize
    updateSlide(currentSlide);
}

// --- FAQ ---

function initFAQ() {
    window.toggleFAQ = function (button) {
        const content = button.nextElementSibling;
        const icon = button.querySelector('.icon');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Close all other FAQs
        document.querySelectorAll('#perguntas .content').forEach(c => {
            if (c !== content) {
                c.style.maxHeight = '0px';
                c.style.opacity = '0';
                c.previousElementSibling.setAttribute('aria-expanded', 'false');
                c.previousElementSibling.querySelector('.icon').classList.remove('rotate-45');
            }
        });

        // Toggle current
        if (isExpanded) {
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            button.setAttribute('aria-expanded', 'false');
            icon.classList.remove('rotate-45');
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            button.setAttribute('aria-expanded', 'true');
            icon.classList.add('rotate-45');
        }
    };
}



function redirectToWhatsApp(type = 'join') {
    let numero = '5561998605658';
    let mensagem = 'Olá, vim do site e gostaria de fechar minha montagem dos treinos!';

    if (type === 'info') {
        numero = '5561994149780';
        mensagem = 'Olá, vim do site do Personal Reis e gostaria de mais informações!';
    }

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}



// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {

    initSlider();
    initFAQ();

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
    });

    // Initialize WhatsApp buttons
    document.querySelectorAll('.js-whatsapp-join').forEach(btn => {
        btn.addEventListener('click', () => redirectToWhatsApp('join'));
    });
});
