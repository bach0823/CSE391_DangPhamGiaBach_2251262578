const images = [
    { id: 1, url: "https://picsum.photos/id/10/800/500", title: "Rừng thông" },
    { id: 2, url: "https://picsum.photos/id/15/800/500", title: "Đá và suối" },
    { id: 3, url: "https://picsum.photos/id/25/800/500", title: "Cánh đồng hoa" },
    { id: 4, url: "https://picsum.photos/id/28/800/500", title: "Rừng mùa thu" },
    { id: 5, url: "https://picsum.photos/id/29/800/500", title: "Bóng cây xanh" },
    { id: 6, url: "https://picsum.photos/id/48/800/500", title: "Mũi đất biển" },
    { id: 7, url: "https://picsum.photos/id/56/800/500", title: "Bóng người đi" },
    { id: 8, url: "https://picsum.photos/id/57/800/500", title: "Đô thị đêm" },
    { id: 9, url: "https://picsum.photos/id/58/800/500", title: "Kiến trúc cổ" }
];

let currentIndex = 0;
let slideshowInterval = null;

const mainImage = document.getElementById("mainImage");
const slideshowStatus = document.getElementById("slideshowStatus");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const thumbnailsContainer = document.getElementById("thumbnailsContainer");

const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModalBtn = document.getElementById("closeModalBtn");

const cmdPalette = document.getElementById("cmdPalette");
const cmdInput = document.getElementById("cmdInput");
const cmdList = document.getElementById("cmdList");

// cac lenh dieu khien trong he thong
const commands = [
    { id: "next", name: "Chuyển ảnh tiếp theo (Next)", action: nextImage },
    { id: "prev", name: "Quay lại ảnh trước (Prev)", action: prevImage },
    { id: "play", name: "Phát slideshow", action: startSlideshow },
    { id: "pause", name: "Dừng slideshow", action: stopSlideshow }
];

// load them cac lenh xem tung anh
images.forEach((img, index) => {
    commands.push({
        id: `show-${index}`,
        name: `Xem ảnh ${index + 1}: ${img.title}`,
        action: () => showImage(index)
    });
});

let filteredCmds = [...commands];
let activeCmdIndex = 0;

// function hien thi anh chinh
function showImage(index) {
    if (index < 0) {
        currentIndex = images.length - 1;
    } else if (index >= images.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    
    mainImage.src = images[currentIndex].url;
    mainImage.alt = images[currentIndex].title;
    mainImage.setAttribute("aria-label", `Ảnh ${currentIndex + 1}`);
    
    // highlight anh nho dang chon
    const buttons = thumbnailsContainer.querySelectorAll("button");
    buttons.forEach((btn, idx) => {
        if (idx === currentIndex) {
            btn.style.border = "3px solid #198754";
            btn.setAttribute("aria-selected", "true");
        } else {
            btn.style.border = "1px solid #ccc";
            btn.setAttribute("aria-selected", "false");
        }
    });
}

function nextImage() {
    showImage(currentIndex + 1);
}

function prevImage() {
    showImage(currentIndex - 1);
}

// slideshow control
function startSlideshow() {
    if (slideshowInterval) return;
    slideshowInterval = setInterval(nextImage, 3000);
    slideshowStatus.textContent = "Trạng thái: Đang chạy";
    playPauseBtn.textContent = "Dừng Slideshow";
}

// stop slideshow
function stopSlideshow() {
    if (!slideshowInterval) return;
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    slideshowStatus.textContent = "Trạng thái: Dừng";
    playPauseBtn.textContent = "Phát Slideshow";
}

function toggleSlideshow() {
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
}

// open close modal
function openModal() {
    modalImg.src = images[currentIndex].url;
    imgModal.style.display = "flex";
    closeModalBtn.focus();
}

function closeModal() {
    imgModal.style.display = "none";
    mainImage.focus();
}

// open close command palette
function openCmdPalette() {
    cmdPalette.style.display = "flex";
    cmdInput.value = "";
    filterCommands("");
    cmdInput.focus();
}

function closeCmdPalette() {
    cmdPalette.style.display = "none";
}

// filter commands
function filterCommands(keyword) {
    const kw = keyword.toLowerCase().trim();
    filteredCmds = commands.filter(c => c.name.toLowerCase().includes(kw));
    activeCmdIndex = 0;
    renderCmdList();
}

// render list commands trong palette
function renderCmdList() {
    cmdList.innerHTML = "";
    if (filteredCmds.length === 0) {
        const item = document.createElement("div");
        item.className = "list-group-item text-muted text-center";
        item.textContent = "Không tìm thấy lệnh nào";
        cmdList.appendChild(item);
        return;
    }
    
    filteredCmds.forEach((cmd, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "list-group-item list-group-item-action py-2";
        btn.textContent = cmd.name;
        btn.setAttribute("aria-label", cmd.name);
        
        if (idx === activeCmdIndex) {
            btn.classList.add("active");
        }
        
        btn.addEventListener("click", () => {
            cmd.action();
            closeCmdPalette();
        });
        
        cmdList.appendChild(btn);
    });
}

// lang nghe ban phim
document.addEventListener("keydown", (e) => {
    // mo command palette Ctrl + K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (cmdPalette.style.display === "flex") {
            closeCmdPalette();
        } else {
            openCmdPalette();
        }
        return;
    }
    
    // phim tat khi mo command palette
    if (cmdPalette.style.display === "flex") {
        if (e.key === "Escape") {
            closeCmdPalette();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            activeCmdIndex = (activeCmdIndex + 1) % filteredCmds.length;
            renderCmdList();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeCmdIndex = (activeCmdIndex - 1 + filteredCmds.length) % filteredCmds.length;
            renderCmdList();
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredCmds[activeCmdIndex]) {
                filteredCmds[activeCmdIndex].action();
                closeCmdPalette();
            }
        }
        return;
    }
    
    // phim tat khi mo modal anh
    if (imgModal.style.display === "flex") {
        if (e.key === "Escape") {
            closeModal();
        }
        return;
    }
    
    // dieu huong gallery anh bang phim mui ten
    if (e.key === "ArrowRight") {
        nextImage();
    } else if (e.key === "ArrowLeft") {
        prevImage();
    } else if (e.key === " ") {
        e.preventDefault();
        toggleSlideshow();
    } else if (e.key >= "1" && e.key <= "9") {
        const num = parseInt(e.key) - 1;
        if (num < images.length) {
            showImage(num);
        }
    }
});

// su kien go input o bang lenh
cmdInput.addEventListener("input", (e) => {
    filterCommands(e.target.value);
});

// gan su kien cho cac nut bam tren UI
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
playPauseBtn.addEventListener("click", toggleSlideshow);
mainImage.addEventListener("click", openModal);

mainImage.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        openModal();
    }
});

closeModalBtn.addEventListener("click", closeModal);
imgModal.addEventListener("click", (e) => {
    if (e.target === imgModal) {
        closeModal();
    }
});

// tao danh sach anh nho (thumbnails)
function createThumbnails() {
    thumbnailsContainer.innerHTML = "";
    images.forEach((img, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn p-0";
        btn.setAttribute("aria-label", `Ảnh nhỏ ${idx + 1}`);
        btn.setAttribute("aria-selected", idx === 0 ? "true" : "false");
        btn.style.border = "1px solid #ccc";
        btn.style.borderRadius = "4px";
        btn.style.overflow = "hidden";
        
        const thumb = document.createElement("img");
        thumb.src = img.url.replace("800/500", "80/50");
        thumb.alt = `Ảnh nhỏ ${idx + 1}`;
        thumb.style.width = "80px";
        thumb.style.height = "50px";
        thumb.style.objectFit = "cover";
        thumb.style.display = "block";
        
        btn.appendChild(thumb);
        
        btn.addEventListener("click", () => {
            showImage(idx);
            stopSlideshow();
        });
        
        thumbnailsContainer.appendChild(btn);
    });
}

// khoi chay app
createThumbnails();
showImage(0);
