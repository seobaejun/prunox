// Admin Dashboard JavaScript - Basic UI functionality only

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const toggleMenuBtn = document.querySelector('.button-toggle-menu');
    const sidebar = document.querySelector('.app-sidebar-menu');
    
    if (toggleMenuBtn && sidebar) {
        toggleMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Fullscreen Toggle
    const fullscreenBtn = document.querySelector('[data-toggle="fullscreen"]');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    }
    
    // Light/Dark Mode Toggle
    const lightDarkBtn = document.getElementById('light-dark-mode');
    if (lightDarkBtn) {
        lightDarkBtn.addEventListener('click', function() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-bs-theme');
            
            if (currentTheme === 'dark') {
                html.setAttribute('data-bs-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                html.setAttribute('data-bs-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }
    
    // Dropdown Toggle
    const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown-menu')) {
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    if (menu !== dropdown) {
                        menu.classList.remove('show');
                    }
                });
                dropdown.classList.toggle('show');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
    
    // Collapse Menu Items
    const collapseLinks = document.querySelectorAll('[data-bs-toggle="collapse"]');
    collapseLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                target.classList.toggle('show');
            }
        });
    });
    
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Initialize Simplebar
    if (typeof SimpleBar !== 'undefined') {
        const simplebarElements = document.querySelectorAll('[data-simplebar]');
        simplebarElements.forEach(el => {
            new SimpleBar(el);
        });
    }
});
