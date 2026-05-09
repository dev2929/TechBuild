/**
 * 1. PRODUCT DATABASE & STATE
 */
const productData = {
    cpu: [
        { id: 'c1', brand: 'intel', name: "Intel Core i9-9900KS", price: 59000, img: "./images/custom-pc-images/intel-core-processor.jpg", desc: "24 cores (8 P-cores + 16 E-cores)" },
        { id: 'c2', brand: 'amd', name: "AMD Ryzen™ 9000X3D", price: 61500, img: "./images/custom-pc-images/amd-ryzen-processor.jpg", desc: "12 cores 24 Threads 128MB Cache" }
    ],
    gpu: [
        { id: 'g1', brand: 'nvidia', name: "NVIDIA RTX 4070 Ti", price: 78000, img: "./images/custom-pc-images/nvidia-gpu.jpg", desc: "12GB GDDR6X, DLSS 3.0 Support" },
        { id: 'g2', brand: 'amd', name: "Radeon RX 7900 XT", price: 82000, img: "./images/custom-pc-images/radeon-rx-gpu.jpg", desc: "20GB GDDR6, Ray Tracing Enabled" }
    ],
    motherboard: [
        { id: 'm1', brand: 'asus', name: "ASUS ROG Strix Z790-E", price: 45000, img: "./images/custom-pc-images/ausu-rog-motherboard.jpg", desc: "LGA 1700, DDR5, PCIe 5.0" }
    ],
    ram: [
        { id: 'r1', brand: 'corsair', name: "Corsair Vengeance 32GB", price: 12000, img: "./images/custom-pc-images/corsair-32gb-ram.jpg", desc: "DDR5 6000MHz CL36 Dual Channel" }
    ],
    storage: [
        { id: 's1', brand: 'samsung', name: "Samsung 990 Pro 1TB", price: 14000, img: "./images/custom-pc-images/samsung-storage.jpg", desc: "NVMe M.2 Gen4 - 7450MB/s Read" }
    ],
    psu: [
        { id: 'p1', name: "Corsair RM850e Gold", price: 12000, img: "./images/custom-pc-images/corsair-psu.jpg", desc: "850W, 80+ Gold, Fully Modular" }
    ],
    cabinet: [
        { id: 'cb1', brand: 'lianli', name: "Lian Li PC-O11 Dynamic", price: 18000, img: "./images/custom-pc-images/lianli-case.jpg", desc: "Dual Chamber Tempered Glass" }
    ],
    rgb: [
        { id: 'l1', name: "Corsair iCUE Lighting Node", price: 4500, img: "./images/custom-pc-images/corsair-rgb-lights.jpg", desc: "Smart RGB Lighting Controller" }
    ]
};

let selectedBuild = {
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    psu: null,
    cabinet: null,
    rgb: null
};

/**
 * 2. RENDER PRODUCTS
 */
function loadCategory(cat, element) {
    // Visual feedback for banners
    document.querySelectorAll('.cat-banner').forEach(banner => banner.classList.remove('active'));
    if(element) element.classList.add('active');

    const titles = { 
        cpu: "Processor", gpu: "Graphics Card", ram: "Memory", 
        storage: "Storage", motherboard: "Motherboard", 
        psu: "Power Supply", cabinet: "Cabinet", rgb: "RGB Lighting" 
    };
    
    document.getElementById('category-title').innerText = `Select ${titles[cat]}`;

    const container = document.getElementById('product-list-container');
    container.innerHTML = ""; 

    if (productData[cat]) {
        productData[cat].forEach(product => {
            const isSelected = selectedBuild[cat] && selectedBuild[cat].id === product.id;
            const btnClass = isSelected ? "btn-added" : "btn-add-item";
            const btnText = isSelected ? "Added ✓" : "Add";

            container.innerHTML += `
                <div class="wide-product-card ${isSelected ? 'selected-border' : ''}">
                    <div class="product-img-box">
                        <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/100'">
                    </div>
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <p>${product.desc}</p>
                        <a href="#" class="view-details">view details</a>
                    </div>
                    <div class="product-action">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <button class="${btnClass}" onclick="addToBuild('${cat}', '${product.id}', this)">${btnText}</button>
                    </div>
                </div>
            `;
        });
    }
}

/**
 * 3. ADD / REMOVE LOGIC
 */
function addToBuild(category, productId) {
    const item = productData[category].find(p => p.id === productId);
    if (!item) return;

    selectedBuild[category] = item;
    
    // Sync UI
    loadCategory(category, document.querySelector('.cat-banner.active'));
    updateSummaryUI();
}

function removeFromBuild(category) {
    selectedBuild[category] = null;
    
    // Check if we need to reset the "Add" button in the middle
    const currentTitle = document.getElementById('category-title').innerText.toLowerCase();
    const matchMap = {
        'cpu': 'processor', 'gpu': 'graphics', 'ram': 'memory',
        'storage': 'storage', 'motherboard': 'motherboard',
        'psu': 'power', 'cabinet': 'cabinet'
    };

    if (currentTitle.includes(matchMap[category])) {
        loadCategory(category, document.querySelector('.cat-banner.active'));
    }

    updateSummaryUI();
}

/**
 * 4. UPDATE SIDEBAR SUMMARY
 */
function updateSummaryUI() {
    const listContainer = document.getElementById('selected-items-list');
    const totalDisplay = document.getElementById('build-total');
    const reviewBtn = document.getElementById('review-build');
    const counterDisplay = document.getElementById('items-picked');
    
    listContainer.innerHTML = "";
    let grandTotal = 0;
    let itemsCount = 0;

    for (const cat in selectedBuild) {
        const part = selectedBuild[cat];
        if (part) {
            itemsCount++;
            grandTotal += part.price;
            
            listContainer.innerHTML += `
                <li class="selected-item-row">
                    <div class="item-meta">
                        <span class="item-cat">${cat.toUpperCase()}</span>
                        <span class="item-name">${part.name}</span>
                    </div>
                    <div class="item-price-group">
                        <span class="item-price">₹${part.price.toLocaleString('en-IN')}</span>
                        <button class="remove-item-btn" onclick="removeFromBuild('${cat}')">
                            <i class="ri-close-large-fill"></i>
                        </button>
                    </div>
                </li>
            `;
        }
    }

    if (counterDisplay) counterDisplay.innerText = itemsCount;

    if (itemsCount === 0) {
        listContainer.innerHTML = '<li class="empty-msg">No components selected yet</li>';
    }

    totalDisplay.innerText = `₹${grandTotal.toLocaleString('en-IN')}`;
    
    // REQUIRED: All core components must be picked to enable Review
    const isComplete = selectedBuild.cpu && 
                       selectedBuild.gpu && 
                       selectedBuild.ram && 
                       selectedBuild.motherboard && 
                       selectedBuild.storage && 
                       selectedBuild.psu &&
                       selectedBuild.cabinet;

    reviewBtn.disabled = !isComplete;
    reviewBtn.innerText = isComplete ? "Review Build" : `Picked ${itemsCount}/7 Core Parts`;
}

// Initialize
window.onload = () => {
    loadCategory('cpu', document.querySelector('.cat-banner.active'));
};
/**
 * 5. NAVIGATION TO CHECKOUT
 */
document.getElementById('review-build').addEventListener('click', () => {
    // Save the final build object so the checkout page can read it
    localStorage.setItem('finalPCBuild', JSON.stringify(selectedBuild));

    // Navigate to your checkout page
    window.location.href = 'custom-pc-checkout.html';
});
