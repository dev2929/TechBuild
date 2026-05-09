document.addEventListener('DOMContentLoaded', () => {
    // 1. Retrieve the Build Data
    const rawBuildData = localStorage.getItem('finalPCBuild');
    const buildList = document.getElementById('checkout-component-list');

    if (!rawBuildData) {
        buildList.innerHTML = '<li class="empty-msg">Error: No build data found. Please return to the configurator.</li>';
        return;
    }

    const selectedBuild = JSON.parse(rawBuildData);
    buildList.innerHTML = ''; 

    let subtotal = 0;

    // 2. Loop through and Render Components
    for (const cat in selectedBuild) {
        const part = selectedBuild[cat];
        
        if (part) {
            subtotal += part.price;
            
            buildList.innerHTML += `
                <li class="summary-item-row">
                    <img src="${part.img}" alt="${part.name}" onerror="this.src='https://via.placeholder.com/100'">
                    <div class="summary-item-details">
                        <span class="item-cat">${cat.toUpperCase()}</span>
                        <div class="summary-item-name">${part.name}</div>
                    </div>
                    <span class="summary-item-price">₹${part.price.toLocaleString('en-IN')}</span>
                </li>
            `;
        }
    }

    // ... (rest of your calculation logic remains the same)
});

// --- Payment Accordion Toggle Logic ---
const paymentRows = document.querySelectorAll('.payment-row');

paymentRows.forEach(row => {
    // We listen to the header click
    const header = row.querySelector('.row-header');
    
    header.addEventListener('click', function(e) {
        // Prevent event bubbling if clicking inside the content
        if (e.target.closest('.row-content')) return;

        const radioButton = row.querySelector('input[type="radio"]');
        const isActive = row.classList.contains('active');

        // 1. Close all other rows
        paymentRows.forEach(r => r.classList.remove('active'));

        // 2. Open this row if it wasn't already active
        if (!isActive) {
            row.classList.add('active');
            if (radioButton) radioButton.checked = true;
        } else {
            // Optional: allow closing by clicking again
            row.classList.remove('active');
            if (radioButton) radioButton.checked = false;
        }
    });
});

// --- Dynamic Price Update for Buttons ---
function updatePayButtons(finalTotalText) {
    const payButtons = document.querySelectorAll('.btn-pay-secure');
    payButtons.forEach(btn => {
        btn.innerText = `PAY ${finalTotalText}`;
    });
}

// Call this inside your DOMContentLoaded after calculating finalTotal
// Example: updatePayButtons(`₹${finalTotal.toLocaleString('en-IN')}`);

// navigation to order confirmation page 
const btn_confirm_order_btn = document.querySelector(".btn-confirm-order");
if (btn_confirm_order_btn) {
    btn_confirm_order_btn.addEventListener("click", () => {
        // 1. Visual feedback: Disable button & show loading state
        btn_confirm_order_btn.innerText = "Processing Order...";
        btn_confirm_order_btn.style.opacity = "0.7";
        btn_confirm_order_btn.style.cursor = "not-allowed";
        btn_confirm_order_btn.disabled = true;

        // 2. Optional: Add a slight delay (1.5 seconds) for a premium "processing" feel
        setTimeout(() => {
            window.location.href = "./order-confirmation.html";
        }, 1500);
    });
}
