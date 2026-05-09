// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    hamburger.querySelector('i').classList.toggle('ri-close-line');
    hamburger.querySelector('i').classList.toggle('ri-menu-line');
});



// Slider elements
const slider = document.querySelector('.slider');
const navlink = document.querySelector('.navlink'); // button/link to open slider
const cross = slider.querySelector('.title-cross-container button'); // cross inside slider
const floatingCross = document.getElementById('floatingCross');
let overlay = null;

// ---------------- Open slider ----------------
navlink.addEventListener('click', () => {
    slider.classList.add('active');
    floatingCross.classList.remove('visible');

    // Scroll lock
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');

    // Add overlay to block background clicks
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeSlider);
});

// ---------------- Close slider ----------------
function closeSlider() {
    slider.classList.remove('active');
    floatingCross.classList.remove('visible');

    // Remove scroll lock
    document.body.classList.remove('no-scroll', 'hide-cursor');
    document.documentElement.classList.remove('no-scroll');

    // Remove overlay
    if (overlay) {
        overlay.remove();
        overlay = null;
    }
}

cross.addEventListener('click', closeSlider);
floatingCross.addEventListener('click', closeSlider);

// ---------------- Floating cross follows cursor ----------------
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Detect if cursor is outside slider
    const sliderRect = slider.getBoundingClientRect();
    const outsideSlider = (
        e.clientX < sliderRect.left ||
        e.clientX > sliderRect.right ||
        e.clientY < sliderRect.top ||
        e.clientY > sliderRect.bottom
    );

    if (slider.classList.contains('active') && outsideSlider) {
        floatingCross.classList.add('visible');
        document.body.classList.add('hide-cursor');
    } else {
        floatingCross.classList.remove('visible');
        document.body.classList.remove('hide-cursor');
    }
});

function animateCursor() {
    posX += (mouseX - posX) * 0.2;
    posY += (mouseY - posY) * 0.2;

    floatingCross.style.left = posX + 'px';
    floatingCross.style.top = posY + 'px';
    floatingCross.style.transform = 'translate(-50%, -50%)';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// ---------------- Hide cross when leaving window ----------------
document.addEventListener('mouseleave', () => {
    floatingCross.classList.remove('visible');
    document.body.classList.remove('hide-cursor');
});
document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement) {
        floatingCross.classList.remove('visible');
        document.body.classList.remove('hide-cursor');
    }
});







