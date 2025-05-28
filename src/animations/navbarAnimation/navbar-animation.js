import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

// Función para inicializar la animación del navbar
function initNavbarAnimation() {
    // Crea la animación del navbar
    const showNavAnim = gsap.from('#navbar', {
        yPercent: -100,
        paused: true,
        duration: 0.1,
    }).progress(1);

    // Crea el ScrollTrigger
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
            // Si el scroll va hacia arriba, mostrar navbar
            // Si va hacia abajo, ocultar navbar
            self.direction === -1 ? showNavAnim.play() : showNavAnim.reverse();
        }
    });
}

document.addEventListener('DOMContentLoaded', initNavbarAnimation);