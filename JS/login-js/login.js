        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            // Optional: toggle hamburger to X
            hamburger.querySelector('i').classList.toggle('ri-close-line');
            hamburger.querySelector('i').classList.toggle('ri-menu-line');
        });
