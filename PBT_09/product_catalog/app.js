const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 22990000, category: "phone", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 3, name: "Google Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 4, name: "MacBook Air M3", price: 27990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 5, name: "Dell XPS 13", price: 34990000, category: "laptop", image: "https://placehold.co/200", rating: 4.7, inStock: false },
    { id: 6, name: "Lenovo ThinkPad X1 Carbon", price: 39990000, category: "laptop", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 9, name: "Xiaomi Pad 6", price: 8490000, category: "tablet", image: "https://placehold.co/200", rating: 4.2, inStock: true },
    { id: 10, name: "AirPods Pro 2", price: 5990000, category: "accessory", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 11, name: "Sony WH-1000XM5", price: 8490000, category: "accessory", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 12, name: "Logitech MX Master 3S", price: 2490000, category: "accessory", image: "https://placehold.co/200", rating: 4.8, inStock: true }
];

let cartCount = 0;
let currentCategory = "all";
let searchKeyword = "";
let currentSort = "default";

const app = document.getElementById("app");
app.className = "container py-4";

// Render header
const header = document.createElement("header");
header.className = "d-flex justify-content-between align-items-center border-bottom pb-3 mb-4";

const title = document.createElement("h2");
title.className = "m-0 text-primary";
title.textContent = "TLU Shop";

const headerRight = document.createElement("div");
headerRight.className = "d-flex align-items-center gap-3";

const cartIcon = document.createElement("div");
cartIcon.className = "fs-5 fw-bold";
cartIcon.style.cursor = "pointer";
cartIcon.innerHTML = `🛒 <span id="cartBadge" class="badge bg-danger rounded-pill">0</span>`;

const toggleModeBtn = document.createElement("button");
toggleModeBtn.id = "toggleModeBtn";
toggleModeBtn.className = "btn btn-outline-secondary btn-sm";
toggleModeBtn.textContent = "Dark Mode";

headerRight.appendChild(cartIcon);
headerRight.appendChild(toggleModeBtn);
header.appendChild(title);
header.appendChild(headerRight);
app.appendChild(header);

// Render controls
const controls = document.createElement("div");
controls.className = "row g-3 align-items-center mb-4";

const searchCol = document.createElement("div");
searchCol.className = "col-12 col-md-4";
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.id = "searchInput";
searchInput.className = "form-control";
searchInput.placeholder = "Tìm kiếm sản phẩm...";
searchCol.appendChild(searchInput);

const filterCol = document.createElement("div");
filterCol.className = "col-12 col-md-5";
const filterContainer = document.createElement("div");
filterContainer.className = "btn-group w-100";
filterContainer.role = "group";

const categories = ["all", "phone", "laptop", "tablet", "accessory"];
categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary btn-sm";
    if (cat === "all") btn.classList.add("active");
    btn.dataset.category = cat;
    btn.textContent = cat === "all" ? "Tất cả" : cat.charAt(0).toUpperCase() + cat.slice(1);
    filterContainer.appendChild(btn);
});
filterCol.appendChild(filterContainer);

const sortCol = document.createElement("div");
sortCol.className = "col-12 col-md-3";
const sortSelect = document.createElement("select");
sortSelect.id = "sortSelect";
sortSelect.className = "form-select form-select-sm";

const sortOptions = [
    { value: "default", text: "Sắp xếp theo" },
    { value: "price-asc", text: "Giá tăng dần" },
    { value: "price-desc", text: "Giá giảm dần" },
    { value: "name-asc", text: "Tên A-Z" },
    { value: "rating-desc", text: "Đánh giá cao nhất" }
];
sortOptions.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    sortSelect.appendChild(option);
});
sortCol.appendChild(sortSelect);

controls.appendChild(searchCol);
controls.appendChild(filterCol);
controls.appendChild(sortCol);
app.appendChild(controls);

const grid = document.createElement("div");
grid.id = "productGrid";
grid.className = "row g-4";
app.appendChild(grid);

const modal = document.createElement("div");
modal.id = "productModal";
modal.className = "modal";
modal.style.cssText = "background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1050;";
app.appendChild(modal);

// Render danh sach card san pham
function renderProducts(itemsToRender) {
    grid.innerHTML = "";
    itemsToRender.forEach(p => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        
        const card = document.createElement("div");
        card.className = "card h-100 shadow-sm";
        card.style.cursor = "pointer";
        card.dataset.id = p.id;
        
        const img = document.createElement("img");
        img.src = p.image;
        img.className = "card-img-top p-3";
        img.alt = p.name;
        img.style.cssText = "max-height: 180px; object-fit: contain;";
        
        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";
        
        const name = document.createElement("h5");
        name.className = "card-title text-truncate h6";
        name.textContent = p.name;
        
        const price = document.createElement("p");
        price.className = "card-text text-danger fw-bold mb-1";
        price.textContent = p.price.toLocaleString('vi-VN') + "đ";
        
        const rating = document.createElement("p");
        rating.className = "card-text text-warning small mb-3";
        rating.textContent = `⭐ ${p.rating}`;
        
        const btn = document.createElement("button");
        btn.className = "btn btn-primary btn-sm mt-auto add-btn";
        btn.textContent = "Thêm giỏ";
        if (!p.inStock) {
            btn.disabled = true;
            btn.className = "btn btn-secondary btn-sm mt-auto add-btn";
            btn.textContent = "Hết hàng";
        }
        
        cardBody.appendChild(name);
        cardBody.appendChild(price);
        cardBody.appendChild(rating);
        cardBody.appendChild(btn);
        
        card.appendChild(img);
        card.appendChild(cardBody);
        
        card.addEventListener("click", (e) => {
            if (e.target !== btn) {
                showModal(p);
            }
        });
        
        col.appendChild(card);
        grid.appendChild(col);
    });
}

// Show modal
function showModal(p) {
    modal.innerHTML = "";
    
    const dialog = document.createElement("div");
    dialog.className = "modal-dialog";
    dialog.style.cssText = "max-width: 500px; width: 90%; margin: auto;";
    
    const content = document.createElement("div");
    content.className = "modal-content";
    
    const header = document.createElement("div");
    header.className = "modal-header";
    const name = document.createElement("h5");
    name.className = "modal-title text-primary";
    name.textContent = p.name;
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "btn-close";
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    header.appendChild(name);
    header.appendChild(closeBtn);
    
    const body = document.createElement("div");
    body.className = "modal-body text-center";
    
    const img = document.createElement("img");
    img.src = p.image;
    img.className = "img-fluid mb-3 rounded";
    img.style.maxHeight = "200px";
    
    const cat = document.createElement("p");
    cat.className = "text-muted mb-1";
    cat.textContent = `Danh mục: ${p.category}`;
    
    const price = document.createElement("p");
    price.className = "text-danger fw-bold fs-5 mb-1";
    price.textContent = `Giá: ${p.price.toLocaleString('vi-VN')}đ`;
    
    const rating = document.createElement("p");
    rating.className = "text-warning small mb-1";
    rating.textContent = `Đánh giá: ⭐ ${p.rating}`;
    
    const stock = document.createElement("p");
    stock.className = "small";
    stock.textContent = `Tình trạng: ${p.inStock ? "Còn hàng" : "Hết hàng"}`;
    
    body.appendChild(img);
    body.appendChild(cat);
    body.appendChild(price);
    body.appendChild(rating);
    body.appendChild(stock);
    
    content.appendChild(header);
    content.appendChild(body);
    dialog.appendChild(content);
    modal.appendChild(dialog);
    
    modal.style.display = "flex";
}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Update lists filter/sort
function updateCatalog() {
    let filtered = products;
    
    if (currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    if (searchKeyword) {
        const kw = searchKeyword.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(kw));
    }
    
    if (currentSort === "price-asc") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-asc") {
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "rating-desc") {
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }
    
    renderProducts(filtered);
}

// Event delegation them vao gio hang
grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn") && !e.target.disabled) {
        cartCount++;
        document.getElementById("cartBadge").textContent = cartCount;
    }
});

searchInput.addEventListener("input", (e) => {
    searchKeyword = e.target.value.trim();
    updateCatalog();
});

filterContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
        filterContainer.querySelectorAll(".btn").forEach(btn => {
            btn.classList.remove("active");
        });
        e.target.classList.add("active");
        
        currentCategory = e.target.dataset.category;
        updateCatalog();
    }
});

sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    updateCatalog();
});

toggleModeBtn.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-bs-theme") === "dark";
    if (isDark) {
        document.body.removeAttribute("data-bs-theme");
        toggleModeBtn.textContent = "Dark Mode";
        toggleModeBtn.className = "btn btn-outline-secondary btn-sm";
    } else {
        document.body.setAttribute("data-bs-theme", "dark");
        toggleModeBtn.textContent = "Light Mode";
        toggleModeBtn.className = "btn btn-outline-light btn-sm";
    }
});

updateCatalog();
