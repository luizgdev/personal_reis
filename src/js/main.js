/**
 * Main JavaScript file for Personal Reis
 */

// --- Menu Navigation ---

function initMenu() {
    const menuBtn = document.querySelector('ion-icon[name="menu"]');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const links = document.querySelectorAll('.nav-links a');

    if (!menuBtn || !navLinks || !header) return;

    function toggleMenu() {
        const isMenuOpen = menuBtn.getAttribute('name') === 'close';
        const headerHeight = header.offsetHeight;

        if (isMenuOpen) {
            // Close menu
            menuBtn.setAttribute('name', 'menu');
            navLinks.style.top = '-100%';
            document.body.style.overflow = 'auto';
        } else {
            // Open menu
            menuBtn.setAttribute('name', 'close');
            navLinks.style.top = `${headerHeight}px`;
            navLinks.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMenu() {
        if (menuBtn.getAttribute('name') === 'close') {
            menuBtn.setAttribute('name', 'menu');
            navLinks.style.top = '-100%';
            document.body.style.overflow = 'auto';
        }
    }

    menuBtn.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

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

// --- WhatsApp Redirection ---

function initWhatsApp() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(btn => {
        // Check if it's a whatsapp button based on text or onclick attribute (before cleanup)
        // We will add a data-attribute or class in HTML to identify these buttons more robustly.
        // For now, let's look for the specific function calls in the onclick or text content.

        // Strategy: We will add a class .btn-whatsapp to these buttons in the HTML refactor.
        // But since I am writing JS first, I will assume the class exists or try to match by text/onclick.

        // Let's assume we will add 'js-whatsapp-join' and 'js-whatsapp-info' classes.
    });
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

// --- Container Height Adjustment ---

function initContainerHeight() {
    const image = document.getElementById("bannerImage");
    const container = document.getElementById("home");

    if (!image || !container) return;

    function adjust() {
        if (image.complete) {
            container.style.height = `${image.clientHeight}px`;
        } else {
            image.onload = () => {
                container.style.height = `${image.clientHeight}px`;
            };
        }
    }

    window.addEventListener("load", adjust);
    window.addEventListener("resize", adjust);
    adjust(); // Call immediately in case already loaded
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initSlider();
    initFAQ();
    initContainerHeight();

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
    });

    // Initialize WhatsApp buttons
    // We will attach listeners to elements with specific classes
    document.querySelectorAll('.js-whatsapp-join').forEach(btn => {
        btn.addEventListener('click', () => redirectToWhatsApp('join'));
    });

    // There was a second function redirecionarWhatsApp1 used? 
    // Searching HTML... I don't see redirecionarWhatsApp1 used in the HTML provided in the view_file output.
    // Wait, I see:
    // 658: function redirecionarWhatsApp1() { ... }
    // But is it called?
    // I'll check the HTML content again.
    // Line 57: onclick="redirecionarWhatsApp()"
    // Line 87: onclick="redirecionarWhatsApp()"
    // Line 242: onclick="redirecionarWhatsApp()"
    // Line 415: onclick="redirecionarWhatsApp()"
    // I don't see usage of redirecionarWhatsApp1 in the HTML provided.
    // I will assume only the main one is used for now.
});
