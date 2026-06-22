// Actualizar año en el copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ============================================
// FORMULARIO DE CONTACTO CON EMAILJS
// ============================================

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
        console.error('Formulario de contacto no encontrado');
        return;
    }

    // Verificar que EmailJS esté disponible
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS no está cargado. Verifica que el script esté incluido en el HTML.');
        return;
    }

    // Inicializar EmailJS con tu Public Key
    emailjs.init("WbZJkQyxs3HslGBAe");

    // Elemento para mostrar mensajes
    const formMessage = document.createElement('div');
    formMessage.id = 'formMessage';
    formMessage.style.cssText = `
        display: none;
        margin: 15px 0;
        padding: 12px;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
    `;
    contactForm.appendChild(formMessage);

    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Mostrar mensajes
    function showFormMessage(text, type = 'success') {
        formMessage.textContent = text;
        formMessage.style.display = 'block';

        if (type === 'success') {
            formMessage.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
            formMessage.style.color = '#22c55e';
            formMessage.style.border = '1px solid #22c55e';
        } else {
            formMessage.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            formMessage.style.color = '#ef4444';
            formMessage.style.border = '1px solid #ef4444';
        }

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Validación de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Estado para prevenir múltiples envíos
    let isSubmitting = false;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (isSubmitting) return;
        isSubmitting = true;

        // Obtener valores
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validaciones
        if (!name || !email || !message) {
            showFormMessage('Por favor, completa todos los campos obligatorios.', 'error');
            isSubmitting = false;
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
            isSubmitting = false;
            return;
        }

        // Actualizar botón
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';

        try {

            // Combinar toda la información
            const fullMessage = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
            // Parámetros para EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                message: fullMessage,
                to_email: 'compendiocircular8@gmail.com'
            };

            console.log('Enviando email con parámetros:', templateParams);

            // Enviar con EmailJS
            const response = await emailjs.send(
                'service_z3psntg',   // Service ID
                'template_tba06be',  // Template ID
                templateParams
            );

            console.log('Email enviado exitosamente:', response);

            // Mostrar éxito
            showFormMessage('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');

            // Resetear formulario
            contactForm.reset();

        } catch (error) {
            console.error('Error al enviar email:', error);

            let errorMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';

            if (error.status === 0) {
                errorMessage = 'Error de conexión. Verifica tu internet.';
            } else if (error.text) {
                errorMessage = `Error: ${error.text}`;
            }

            showFormMessage(errorMessage, 'error');

        } finally {
            // Restaurar botón
            isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Smooth scrolling para los enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Cerrar navbar en móviles después de hacer clic en un enlace
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de navbar al hacer scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animación para las tarjetas al hacer scroll
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.card');
    const windowHeight = window.innerHeight;

    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;

        if (cardPosition < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Inicializar animaciones de las tarjetas
window.addEventListener('scroll', animateCardsOnScroll);
window.addEventListener('load', animateCardsOnScroll);

// Inicializar las tarjetas con opacidad 0 para la animación
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el formulario de contacto
    setupContactForm();

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Llamar a la animación después de un pequeño delay
    setTimeout(animateCardsOnScroll, 300);

    // Prevenir desbordamiento horizontal
    function preventHorizontalScroll() {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
    }

    preventHorizontalScroll();
    window.addEventListener('resize', preventHorizontalScroll);

    // Modal functionality
    setupModal();
});

// Mejorar comportamiento responsive en redimensionamiento
window.addEventListener('resize', function () {
    // Forzar recálculo de algunas propiedades para evitar desbordamiento
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.maxWidth = '100%';
    });
});

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const cursorTrail = document.createElement('img');
    cursorTrail.src = 'images/geometria-cursor.png';
    cursorTrail.classList.add('cursor-trail');
    // Ensure it doesn't interfere with clicks
    cursorTrail.style.pointerEvents = 'none';
    document.body.appendChild(cursorTrail);

    document.addEventListener('mousemove', function (e) {
        // Update position
        // Using direct style manipulation combined with CSS transition for smooth following
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    });

    // Hide cursor trail on interactive elements
    document.addEventListener('mouseover', function (e) {
        const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .btn, .card, .navbar';
        if (e.target.closest(interactiveSelectors)) {
            cursorTrail.classList.add('cursor-trail-hidden');
        } else {
            cursorTrail.classList.remove('cursor-trail-hidden');
        }
    });
});

// Modal setup
function setupModal() {
    const modalElement = document.getElementById('contentModal');
    const modal = new bootstrap.Modal(modalElement);
    const modalTitle = document.getElementById('contentModalLabel');
    const modalBody = document.getElementById('modalContentBody');
    const buttons = document.querySelectorAll('.btn-card-modal');
    let lastFocusedButton = null;

    buttons.forEach(button => {
        button.addEventListener('click', async function () {
            lastFocusedButton = this;
            const fileName = this.getAttribute('data-file');
            await loadMarkdownContent(fileName, modalTitle, modalBody);
            modal.show();
        });
    });

    // Manejar foco cuando el modal se cierra
    modalElement.addEventListener('hidden.bs.modal', function () {
        if (lastFocusedButton) {
            lastFocusedButton.focus();
        }
    });

    // Enfocar el primer botón del modal cuando se abre
    modalElement.addEventListener('shown.bs.modal', function () {
        const firstFocusable = modalElement.querySelector('.btn-close, .btn-send');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    });
}

// Load and parse markdown file
async function loadMarkdownContent(fileName, titleElement, bodyElement) {
    try {
        // Usar contenido embebido primero, intentar fetch si no está disponible
        let markdown;
        if (typeof markdownContent !== 'undefined' && markdownContent[fileName]) {
            markdown = markdownContent[fileName];
        } else {
            const response = await fetch(`content/${fileName}`);
            if (!response.ok) {
                throw new Error('Error al cargar el contenido');
            }
            markdown = await response.text();
        }
        
        // Parse markdown to HTML
        const html = marked.parse(markdown);
        bodyElement.innerHTML = html;

        // Extract title from first heading
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const firstHeading = tempDiv.querySelector('h1, h2, h3');
        if (firstHeading) {
            titleElement.textContent = firstHeading.textContent;
        } else {
            titleElement.textContent = 'Contenido';
        }
    } catch (error) {
        console.error('Error loading markdown:', error);
        bodyElement.innerHTML = '<p class="text-danger">Error al cargar el contenido. Por favor, intenta nuevamente.</p>';
        titleElement.textContent = 'Error';
    }
}