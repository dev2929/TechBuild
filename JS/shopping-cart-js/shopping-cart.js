
document.addEventListener('DOMContentLoaded', () => {
    // Build PC button
    const build_pc_btn = document.querySelector(".build-pc-btn");
    if(build_pc_btn){
        build_pc_btn.addEventListener("click", () => {
            window.location.href = "./selectpurpose1.html";
            console.log("select purpose");
        });
    }


    const checkout_btn = document.querySelector(".btn-checkout");
    if (checkout_btn) {
        checkout_btn.addEventListener("click", ()=>{
             window.location.href = "./checkout.html";
            console.log("select purpose");
        })
    }

});

// Select all the quantity containers in the cart
const quantityContainers = document.querySelectorAll('.item-quantity');

quantityContainers.forEach(container => {
    const minusBtn = container.querySelector('.minus');
    const plusBtn = container.querySelector('.plus');
    const qtyInput = container.querySelector('.qty-input');

    // Handle Plus button click
    plusBtn.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });

    // Handle Minus button click
    minusBtn.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        // Prevent quantity from going below 1
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
        }
    });
});
