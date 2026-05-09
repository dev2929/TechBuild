
// slider js starts
const openBtn = document.getElementById('viewAllSpecs');
const sidebar = document.getElementById('specSidebar');
const overlay = document.getElementById('specOverlay');
const closeBtn = document.querySelector('.close-spec');

const toggleSidebar = (isOpen) => {
    sidebar.classList.toggle('active', isOpen);
    overlay.classList.toggle('visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
};

openBtn.addEventListener('click', () => toggleSidebar(true));
closeBtn.addEventListener('click', () => toggleSidebar(false));
overlay.addEventListener('click', () => toggleSidebar(false));

// slider js end 

document.addEventListener('DOMContentLoaded', () => {

    // Build PC button
    const build_pc_btn = document.querySelector(".build-pc-btn");
    if(build_pc_btn){
        build_pc_btn.addEventListener("click", () => {
            window.location.href = "./selectpurpose1.html";
            console.log("select purpose");
        });
    }

    // Add to Cart buttons (can be multiple)
    const add_to_cart_buttons = document.querySelectorAll(".add-to-cart-btn");
    add_to_cart_buttons.forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "./shopping-cart.html";
        });
    });

    // User Profile button
    const user_profile_btn = document.querySelector("#user-profile-btn");
    if (user_profile_btn) {
        user_profile_btn.addEventListener("click", () => {
            window.location.href = "./userprofile.html";
        });
    }

});
