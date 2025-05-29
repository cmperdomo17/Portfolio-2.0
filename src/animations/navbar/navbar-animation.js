import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function initNavbarAnimation() {
    let lastScrollTop = 0;
    let isNavVisible = true;
    const scrollThreshold = 100; // Mínimo scroll antes de ocultar
    
    // Animaciones para mostrar
    const showNavAnim = gsap.timeline({ paused: true })
        .to("#navbar", { 
            yPercent: 0, 
            duration: 0.3, 
            ease: "power2.out" 
        }, 0)
        .to(".hamburger", { 
            y: 0, 
            autoAlpha: 1, 
            duration: 0.3, 
            ease: "power2.out" 
        }, 0);

    // Animaciones para ocultar
    const hideNavAnim = gsap.timeline({ paused: true })
        .to("#navbar", { 
            yPercent: -100, 
            duration: 0.3, 
            ease: "power2.out" 
        }, 0)
        .to(".hamburger", { 
            y: -100, 
            autoAlpha: 0, 
            duration: 0.3, 
            ease: "power2.out" 
        }, 0);

    // Función para mostrar navbar
    function showNavbar() {
        if (!isNavVisible) {
            hideNavAnim.pause();
            showNavAnim.restart();
            isNavVisible = true;
        }
    }

    // Función para ocultar navbar
    function hideNavbar() {
        if (isNavVisible) {
            showNavAnim.pause();
            hideNavAnim.restart();
            isNavVisible = false;
        }
    }

    // ScrollTrigger principal
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            const currentScroll = self.scroll();
            const direction = self.direction;
            
            // Si estamos en el top, siempre mostrar
            if (currentScroll < scrollThreshold) {
                showNavbar();
                return;
            }
            
            // Lógica basada en dirección del scroll
            if (direction === -1) {
                // Scrolling up - mostrar navbar
                showNavbar();
            } else if (direction === 1 && currentScroll > scrollThreshold) {
                // Scrolling down y hemos pasado el threshold - ocultar navbar
                hideNavbar();
            }
            
            lastScrollTop = currentScroll;
        }
    });

    // Estado inicial - siempre visible al cargar
    gsap.set("#navbar", { yPercent: 0 });
    gsap.set(".hamburger", { y: 0, autoAlpha: 1 });
    
    // Asegurar que esté visible en el top de la página
    if (window.scrollY < scrollThreshold) {
        showNavbar();
    }
}

// Alternativa más robusta con evento de scroll manual
function initNavbarAnimationAlternative() {
    let lastScrollTop = 0;
    let isNavVisible = true;
    let ticking = false;
    const scrollThreshold = 50;
    const scrollDelta = 5; // Mínimo cambio para activar animación

    // Timelines de animación
    const showTl = gsap.timeline({ paused: true })
        .to("#navbar", { yPercent: 0, duration: 0.4, ease: "power2.out" }, 0)
        .to(".hamburger", { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0);

    const hideTl = gsap.timeline({ paused: true })
        .to("#navbar", { yPercent: -100, duration: 0.4, ease: "power2.out" }, 0)
        .to(".hamburger", { y: -100, autoAlpha: 0, duration: 0.4, ease: "power2.out" }, 0);

    function updateNavbar() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Si estamos cerca del top, siempre mostrar
        if (currentScrollTop < scrollThreshold) {
            if (!isNavVisible) {
                hideTl.pause();
                showTl.restart();
                isNavVisible = true;
            }
            lastScrollTop = currentScrollTop;
            return;
        }

        // Verificar si el scroll ha cambiado lo suficiente
        if (Math.abs(lastScrollTop - currentScrollTop) < scrollDelta) {
            return;
        }

        if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
            // Scrolling Down & past threshold
            if (isNavVisible) {
                showTl.pause();
                hideTl.restart();
                isNavVisible = false;
            }
        } else if (currentScrollTop < lastScrollTop) {
            // Scrolling Up
            if (!isNavVisible) {
                hideTl.pause();
                showTl.restart();
                isNavVisible = true;
            }
        }

        lastScrollTop = currentScrollTop;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    // Event listener para scroll
    window.addEventListener('scroll', requestTick, { passive: true });

    // Estado inicial
    gsap.set("#navbar", { yPercent: 0 });
    gsap.set(".hamburger", { y: 0, autoAlpha: 1 });
}

// Usar la función principal
document.addEventListener("DOMContentLoaded", () => {
    // Puedes elegir entre las dos implementaciones:
    initNavbarAnimation(); // Versión con ScrollTrigger
    // initNavbarAnimationAlternative(); // Versión con evento scroll manual
});

// Función adicional para manejar resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});