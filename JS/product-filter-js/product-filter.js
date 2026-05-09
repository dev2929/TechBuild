document.addEventListener("DOMContentLoaded", () => {

    const headers = document.querySelectorAll(".filter-header");

    headers.forEach(header => {

        header.addEventListener("click", () => {

            const content = header.nextElementSibling;
            const icon = header.querySelector(".icon");

            const isOpen = content.style.maxHeight;

            if(isOpen){
                content.style.maxHeight = null;
                icon.style.transform = "rotate(0deg)";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = "rotate(180deg)";
            }

        });

    });

});



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
