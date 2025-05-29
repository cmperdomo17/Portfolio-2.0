import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize the animation for the navbar visibility on scroll
function initNavbarAnimation() {
    // Define the animation to show the navbar (initially paused)
    const showNavAnim = gsap.from("#navbar", {
        yPercent: -100,
        paused: true,
        duration: 0.1,
    }).progress(1);

    // Create the scroll trigger to toggle the navbar visibility
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: 99999, // Run throughout the entire page
        onUpdate: (self) => {
            // Show navbar when scrolling up, hide when scrolling down
            self.direction === -1 ? showNavAnim.play() : showNavAnim.reverse();
        },
    });
}

// Initialize animation once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initNavbarAnimation);
