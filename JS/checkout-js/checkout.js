/**
 * 1. INITIALIZATION
 */
window.onload = () => {
    updateGrandTotals();
};

/**
 * 2. QUANTITY & TOTALS LOGIC
 * Calculates everything based on current DOM state (Source of Truth)
 */
function changeQty(btn, delta) {
    const container = btn.parentElement;
    const qtyText = container.querySelector('.qty-val');
    const itemInfo = container.closest('.sidebar-item-info');
    const priceText = itemInfo.querySelector('.sidebar-price');
    
    let currentQty = parseInt(qtyText.innerText);
    const unitPrice = parseInt(qtyText.getAttribute('data-unit-price'));

    currentQty += delta;
    if (currentQty < 1) return; 

    qtyText.innerText = currentQty;

    // Update individual item price display
    const itemTotal = currentQty * unitPrice;
    priceText.innerText = `₹${itemTotal.toLocaleString('en-IN')}`;

    // 🔥 Recalculate the entire sidebar bill
    updateGrandTotals();
}

function updateGrandTotals() {
    let subtotal = 0;
    const discount = 1300; // Fixed discount
    const taxRate = 0.085; // 8.5%

    // A. Sum up products based on quantity spans
    document.querySelectorAll('.qty-val').forEach(qtySpan => {
        const qty = parseInt(qtySpan.innerText);
        const unitPrice = parseInt(qtySpan.getAttribute('data-unit-price'));
        subtotal += (qty * unitPrice);
    });

    // B. Get SELECTED Shipping Cost (0 or 1650)
    const selectedShipping = document.querySelector('input[name="shipping-speed"]:checked');
    const shippingCost = selectedShipping ? parseInt(selectedShipping.value) : 0;

    // C. Perform Calculations
    const taxAmount = Math.round(subtotal * taxRate);
    const grandTotal = (subtotal + taxAmount + shippingCost) - discount;

    // D. Update Sidebar UI Labels
    document.getElementById('sidebar-subtotal').innerText = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('sidebar-tax').innerText = `₹${taxAmount.toLocaleString('en-IN')}`;
    document.getElementById('sidebar-total').innerText = `₹${grandTotal.toLocaleString('en-IN')}`;
    
    // Update Shipping Display Labels in Sidebar
    const sidebarShippingCost = document.getElementById('sidebar-shipping-cost');
    const sidebarShippingType = document.getElementById('sidebar-shipping-type');
    
    if (shippingCost === 0) {
        sidebarShippingType.innerText = "Standard";
        sidebarShippingCost.innerText = "Free";
        sidebarShippingCost.classList.add('text-green');
    } else {
        sidebarShippingType.innerText = "Express";
        sidebarShippingCost.innerText = `₹${shippingCost.toLocaleString('en-IN')}`;
        sidebarShippingCost.classList.remove('text-green');
    }

    // E. Sync "PAY" buttons in the payment accordion
    document.querySelectorAll('.btn-pay-secure').forEach(btn => {
        btn.innerText = `PAY ₹${grandTotal.toLocaleString('en-IN')}`;
    });
}

/**
 * 3. SHIPPING & PAYMENT INTERACTION
 */
// Listen for shipping speed changes
document.querySelectorAll('input[name="shipping-speed"]').forEach(radio => {
    radio.addEventListener('change', updateGrandTotals);
});

// Payment Accordion Toggle Logic
const paymentRows = document.querySelectorAll('.payment-row');
paymentRows.forEach(row => {
    row.addEventListener('click', function(e) {
        if (e.target.closest('.row-content')) return;

        const radioButton = row.querySelector('input[type="radio"]');
        const isAlreadyActive = row.classList.contains('active');

        paymentRows.forEach(r => r.classList.remove('active'));

        if (!isAlreadyActive) {
            row.classList.add('active');
            if (radioButton) radioButton.checked = true;
        } else {
            if (radioButton) radioButton.checked = false;
        }
    });
});

/**
 * 4. FINAL ACTIONS (UPI & CONFIRM)
 */
const upiSelect = document.querySelector('.payment-dropdown');
if (upiSelect) {
    upiSelect.addEventListener('change', function() {
        const parentRow = this.closest('.payment-row');
        const btn = parentRow.querySelector('.btn-pay-secure');
        const currentTotal = document.getElementById('sidebar-total').innerText;
        
        if (btn) {
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
            btn.innerText = `${currentTotal} via ${this.options[this.selectedIndex].text}`;
        }
    });
}

const placeOrderBtn = document.querySelector('.btn-confirm-order');
if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function() {
        this.innerText = "Placing Order...";
        this.disabled = true;
        this.style.opacity = "0.7";

        setTimeout(() => {
            window.location.href = "order-success.html";
        }, 1500);
    });
}


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
