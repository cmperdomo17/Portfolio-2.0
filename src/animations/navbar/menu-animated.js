class Menu {
    constructor() {
        // Define navigation items and initial state
        this.navItems = [
            { title: "Home", href: "#hero" },
            { title: "About", href: "#about" },
            { title: "Projects", href: "#projects" },
            { title: "Experience", href: "#experience" },
            { title: "Contact", href: "#contact" }
        ];

        this.isMenuOpen = false;
        this.selectedIndicator = window.location.hash || "#hero";

        this.initElements();
        this.createNavLinks();
        this.bindEvents();
    }

    // Cache all required DOM elements
    initElements() {
        this.menuBtn = document.getElementById("menu-btn");
        this.menu = document.getElementById("menu");
        this.hamburgerInput = document.querySelector(".hamburger input");
        this.navLinksContainer = document.getElementById("nav-links");
    }

    // Create and inject navigation links dynamically
    createNavLinks() {
        if (!this.navLinksContainer) return;

        this.navLinksContainer.innerHTML = "";

        this.navItems.forEach((item, index) => {
            const wrapper = document.createElement("div");
            wrapper.className = "nav-link-wrapper";
            wrapper.dataset.index = index;

            const link = document.createElement("a");
            link.href = item.href;
            link.className = `nav-link ${this.selectedIndicator === item.href ? "active" : ""}`;
            link.textContent = item.title;

            this.addLinkEvents(wrapper, link, item);

            wrapper.appendChild(link);
            this.navLinksContainer.appendChild(wrapper);
        });
    }

    // Bind hover and click events for each link
    addLinkEvents(wrapper, link, item) {
        wrapper.addEventListener("mouseenter", () => {
            this.setSelectedIndicator(item.href);
        });

        wrapper.addEventListener("mouseleave", () => {
            this.setSelectedIndicator(window.location.hash || "#hero");
        });

        link.addEventListener("click", (e) => {
            e.preventDefault();
            this.navigateToSection(item.href);
            this.closeMenu();
        });
    }

    // Smoothly scroll to the section and update the URL
    navigateToSection(href) {
        this.setSelectedIndicator(href);

        const section = document.querySelector(href);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }

        window.history.pushState({}, "", href);
    }

    // Update the selected indicator state
    setSelectedIndicator(href) {
        this.selectedIndicator = href;
        this.updateIndicators();
    }

    // Reflect active indicator in the DOM
    updateIndicators() {
        const links = document.querySelectorAll(".nav-link");

        links.forEach((link, index) => {
            const item = this.navItems[index];
            link.classList.toggle("active", item.href === this.selectedIndicator);
        });
    }

    // Open the hamburger menu
    openMenu() {
        this.isMenuOpen = true;

        if (this.hamburgerInput) this.hamburgerInput.checked = true;

        this.menu?.classList.add("active");
        this.menu?.classList.remove("exiting");
        document.body.style.overflow = "hidden";
    }

    // Close the hamburger menu
    closeMenu() {
        this.isMenuOpen = false;

        if (this.hamburgerInput) this.hamburgerInput.checked = false;

        this.menu?.classList.add("exiting");

        setTimeout(() => {
            this.menu?.classList.remove("active", "exiting");
            document.body.style.overflow = "";
        }, 800); // Match exit animation duration
    }

    // Toggle menu open/close state
    toggleMenu() {
        this.isMenuOpen ? this.closeMenu() : this.openMenu();
    }

    // Update active indicator based on scroll position
    handleScroll() {
        const sections = document.querySelectorAll("section[id]");
        let currentSection = "#hero";

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = `#${section.id}`;
            }
        });

        if (currentSection !== this.selectedIndicator && !this.isMenuOpen) {
            this.setSelectedIndicator(currentSection);
            window.history.replaceState({}, "", currentSection);
        }
    }

    // Bind UI and keyboard events
    bindEvents() {
        this.menuBtn?.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        window.addEventListener("scroll", () => this.handleScroll());

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        document.addEventListener("click", (e) => {
            if (
                this.isMenuOpen &&
                !this.menu?.contains(e.target) &&
                !this.menuBtn?.contains(e.target)
            ) {
                this.closeMenu();
            }
        });
    }
}

// Initialize menu when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new Menu();
});

// Export for CommonJS environments
if (typeof module !== "undefined" && module.exports) {
    module.exports = Menu;
}
