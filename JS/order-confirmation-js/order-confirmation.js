
document.addEventListener('DOMContentLoaded', () => {
    // Build PC button
    const conti_shopping_btn = document.querySelector(".conti-shopping-btn");
    if(conti_shopping_btn){
        conti_shopping_btn.addEventListener("click", () => {
            window.location.href = "./product-filter.html";
            
        });
    }

});


// Select all payment rows
const paymentRows = document.querySelectorAll('.payment-row');

paymentRows.forEach(row => {
    row.addEventListener('click', function(e) {
        // Prevent closing if clicking inside inputs/selects
        if (e.target.closest('.row-content')) return;

        const radioButton = row.querySelector('input[type="radio"]');
        const isAlreadyActive = row.classList.contains('active');

        // 1. Close all other rows first
        paymentRows.forEach(r => {
            if (r !== row) r.classList.remove('active');
        });

        // 2. TOGGLE Logic
        if (isAlreadyActive) {
            // If already open, close it and unfill the radio
            row.classList.remove('active');
            if (radioButton) radioButton.checked = false;
        } else {
            // If closed, open it and fill the radio
            row.classList.add('active');
            if (radioButton) radioButton.checked = true;
        }
    });
});


// --- Dropdown Selection Logic ---
// Automatically enables the PAY button only after an option is selected
const upiSelect = document.querySelector('.payment-dropdown');
const payButtons = document.querySelectorAll('.btn-pay-secure');

if (upiSelect) {
    upiSelect.addEventListener('change', function() {
        // Find the button inside the SAME row as this select
        const parentRow = this.closest('.payment-row');
        const btn = parentRow.querySelector('.btn-pay-secure');
        
        if (btn) {
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
            btn.innerText = `PAY ₹40,000 via ${this.options[this.selectedIndex].text}`;
        }
    });
}

const placeOrderBtn = document.querySelector('.btn-confirm-order');

if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function() {
        // 1. Disable button to prevent multiple clicks
        this.innerText = "Placing Order...";
        this.style.opacity = "0.7";
        this.disabled = true;

        // 2. Logic to redirect to a success page or show a modal
        setTimeout(() => {
            alert("Order Placed Successfully via Cash on Delivery!");
            window.location.href = "order-success.html"; // Redirect to your success page
        }, 1500);
    });
}

