class Menu {
    constructor() {
        this.navItems = [
            { title: "Home", href: "#hero" },
            { title: "About", href: "#about" },
            { title: "Projects", href: "#projects" },
            { title: "Experience", href: "#experience" },
            { title: "Contact", href: "#contact" }
        ];

        this.isMenuOpen = false;
        this.selectedIndicator = window.location.hash || '#hero';

        this.initElements();
        this.createNavLinks();
        this.bindEvents();
    }

    initElements() {
        this.menuBtn = document.getElementById('menu-btn');
        this.menu = document.getElementById('curved-menu');
        this.hamburgerInput = document.querySelector('.hamburger input');
        this.navLinksContainer = document.getElementById('nav-links');
    }

    createNavLinks() {
        if (!this.navLinksContainer) return;

        this.navLinksContainer.innerHTML = '';

        this.navItems.forEach((item, index) => {
            const linkWrapper = document.createElement('div');
            linkWrapper.className = 'nav-link-wrapper';
            linkWrapper.setAttribute('data-index', index);

            const link = document.createElement('a');
            link.href = item.href;
            link.className = `nav-link ${this.selectedIndicator === item.href ? 'active' : ''}`;
            link.textContent = item.title;

            this.addLinkEvents(linkWrapper, link, item);

            linkWrapper.appendChild(link);
            this.navLinksContainer.appendChild(linkWrapper);
        });
    }

    addLinkEvents(wrapper, link, item) {
        wrapper.addEventListener('mouseenter', () => {
            this.setSelectedIndicator(item.href);
        });

        wrapper.addEventListener('mouseleave', () => {
            this.setSelectedIndicator(window.location.hash || '#hero');
        });

        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToSection(item.href);
            this.closeMenu();
        });
    }

    navigateToSection(href) {
        this.setSelectedIndicator(href);

        const targetSection = document.querySelector(href);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        window.history.pushState({}, '', href);
    }

    setSelectedIndicator(href) {
        this.selectedIndicator = href;
        this.updateIndicators();
    }

    updateIndicators() {
        const links = document.querySelectorAll('.nav-link');

        links.forEach((link, index) => {
            const item = this.navItems[index];
            if (item.href === this.selectedIndicator) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    openMenu() {
        this.isMenuOpen = true;

        // Activar el checkbox del hamburger para la animación SVG
        if (this.hamburgerInput) {
            this.hamburgerInput.checked = true;
        }

        this.menu?.classList.add('active');
        this.menu?.classList.remove('exiting');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.isMenuOpen = false;

        // Desactivar el checkbox del hamburger
        if (this.hamburgerInput) {
            this.hamburgerInput.checked = false;
        }

        this.menu?.classList.add('exiting');

        setTimeout(() => {
            this.menu?.classList.remove('active', 'exiting');
            document.body.style.overflow = '';
        }, 800);
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    handleScroll() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '#hero';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = `#${section.id}`;
            }
        });

        if (currentSection !== this.selectedIndicator && !this.isMenuOpen) {
            this.setSelectedIndicator(currentSection);
            window.history.replaceState({}, '', currentSection);
        }
    }

    bindEvents() {
        // Menu toggle
        this.menuBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        // Scroll tracking
        window.addEventListener('scroll', () => this.handleScroll());

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen &&
                !this.menu?.contains(e.target) &&
                !this.menuBtn?.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Menu();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Menu;
}