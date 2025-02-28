// ===================== MENU DE NAVEGAÇÃO =====================

// Alternar menu de navegação
function onToggleMenu(e) {
    const navLinks = document.querySelector('.nav-links');
    const headerHeight = document.querySelector('header').offsetHeight;
    const isMenuOpen = e.name === 'menu';

    e.name = isMenuOpen ? 'close' : 'menu';
    navLinks.style.top = isMenuOpen ? `${headerHeight}px` : '-100%';
    navLinks.style.display = isMenuOpen ? 'block' : '';
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
}

// Fechar menu ao clicar em um link
function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('ion-icon[name="close"]');

    if (menuIcon) {
        menuIcon.name = 'menu';
        navLinks.style.top = '-100%';
        navLinks.style.display = 'hidden';
        document.body.style.overflow = 'auto';
    }
}

// Adicionar evento aos links do menu
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ===================== SLIDES =====================

const slides = [
    {
        image: "./images/stephany_vini.jpg",
        text: "“Nossa disposição pro treino é algo surreal, independente de como foi o dia... Eu e o Vini já tentamos essa constância na academia juntos e separados e nuuuunca foi dessa maneira. O jeito q você faz o seu trabalho é muito foda cara.”",
        author: "Stephany e Vini",
    },
    {
        image: "./images/amanda.jpg",
        text: "“A minha composição corporal já mudou demaaaais, minha força, meu condicionamento, o controle da minha ansiedade... Então é isso: reconhecer as conquistas já alcançadas e buscar mais! 💪🏻💪🏻💪🏻”",
        author: "Amanda",
    },
    {
        image: "./images/logo.png",
        text: "“Aliquam in hendrerit urna. Praesent placerat enim ut ex tincidunt vehicula.”",
        author: "Beltrano de Souza",
    },
];

let currentSlide = 0;
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const slideImage = document.getElementById("slide-image");
const paginationDots = document.querySelectorAll(".pagination-dot");

function updateSlide(index) {
    const { image, text, author } = slides[index];
    slideImage.src = image;
    quoteText.textContent = text;
    quoteAuthor.textContent = author;

    paginationDots.forEach((dot, i) => {
        dot.classList.toggle("bg-[#DB0030]", i === index);
        dot.classList.toggle("bg-[#909090]", i !== index);
    });
}

updateSlide(currentSlide);

function navigateSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlide(currentSlide);
}

// Eventos de clique nos botões de navegação
document.getElementById("prev-btn").addEventListener("click", () => navigateSlide(-1));
document.getElementById("next-btn").addEventListener("click", () => navigateSlide(1));

// Eventos de swipe
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
        navigateSlide(-1);
    } else if (diff < -50) {
        isDragging = false;
        navigateSlide(1);
    }
}

function endDrag() {
    isDragging = false;
}

const swipeContainer = document.getElementById("swipe-container");
swipeContainer.addEventListener("mousedown", startDrag);
swipeContainer.addEventListener("mousemove", dragMove);
swipeContainer.addEventListener("mouseup", endDrag);
swipeContainer.addEventListener("mouseleave", endDrag);
swipeContainer.addEventListener("touchstart", startDrag);
swipeContainer.addEventListener("touchmove", dragMove);
swipeContainer.addEventListener("touchend", endDrag);

// ===================== FAQ =====================

function toggleFaq(index) {
    const faqContent = document.getElementById(`faq-${index}`);
    const icon = document.getElementById(`icon-${index}`);

    if (faqContent.classList.contains("hidden")) {
        faqContent.classList.remove("hidden");
        icon.textContent = "-";
    } else {
        faqContent.classList.add("hidden");
        icon.textContent = "+";
    }
}

// Configuração inicial
window.onload = function () {
    const faqs = document.querySelectorAll('[id^="faq-"]');
    const icons = document.querySelectorAll('[id^="icon-"]');

    faqs.forEach((faq, index) => {
        faq.classList.toggle("hidden", index !== 0);
    });

    icons.forEach((icon, index) => {
        icon.textContent = index === 0 ? "-" : "+";
    });
};

// ===================== WHATSAPP =====================

function redirecionarWhatsApp() {
    const numero = '5561996022463'; // Número do WhatsApp
    const mensagem = 'Olá, vim do site e gostaria de fechar minha montagem dos treinos!'; // Mensagem padrão
    const url = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Função para redirecionar para o WhatsApp com o segundo número e mensagem
function redirecionarWhatsApp1() {
    const numero = '5561994149780'; // Número do WhatsApp
    const mensagem = 'Olá, vim do site do Personal Reis e gostaria de mais informações!'; // Mensagem padrão
    const url = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// ===================== AJUSTAR ALTURA DO BANNER =====================

function adjustContainerHeight() {
    const image = document.getElementById("bannerImage");
    const container = document.getElementById("home");

    if (image.complete) {
        container.style.height = `${image.clientHeight}px`;
    } else {
        image.onload = () => {
            container.style.height = `${image.clientHeight}px`;
        };
    }
}

window.addEventListener("load", adjustContainerHeight);
window.addEventListener("resize", adjustContainerHeight);
