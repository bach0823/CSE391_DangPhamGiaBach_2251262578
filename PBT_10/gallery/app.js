const galleryGrid = document.getElementById("galleryGrid");
const scrollTrigger = document.getElementById("load-trigger");
const spinner = document.getElementById("spinner");

const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxAuthor = document.getElementById("lightboxAuthor");
const closeLightboxBtn = document.getElementById("closeLightboxBtn");

let page = 1;
let isFetching = false;

// placeholder anh trong suot truoc khi load anh that
const placeholderUrl = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'300' height%3D'200' viewBox%3D'0 0 300 200'%3E%3Crect width%3D'300' height%3D'200' fill%3D'%23cccccc'%2F%3E%3C%2Fsvg%3E";

// lay anh tu API va render
async function loadMorePhotos() {
    if (isFetching) return;
    isFetching = true;
    spinner.style.display = "inline-block";

    try {
        const url = `https://picsum.photos/v2/list?page=${page}&limit=20`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Khong the tai them anh");
        const photos = await res.json();

        if (photos.length === 0) {
            scrollObserver.unobserve(scrollTrigger); // dung scroll neu het anh
            spinner.style.display = "none";
            return;
        }

        photos.forEach(photo => {
            // tao cot responsive: 4 cot desktop, 2 cot tablet, 1 cot mobile
            const col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-md-3";

            const card = document.createElement("div");
            card.className = "card photo-card shadow-sm h-100";

            const img = document.createElement("img");
            img.className = "card-img-top";
            img.src = placeholderUrl; // load anh tam
            img.dataset.src = `https://picsum.photos/id/${photo.id}/400/250`; // link anh that de lazy load
            img.alt = `Anh cua ${photo.author}`;
            img.style.height = "180px";
            img.style.objectFit = "cover";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body py-2 text-center";
            
            const author = document.createElement("p");
            author.className = "card-text text-truncate text-muted small m-0";
            author.textContent = photo.author;

            cardBody.appendChild(author);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            galleryGrid.appendChild(col);

            // kich hoat lazy load cho anh nay
            lazyLoadObserver.observe(img);

            // click anh de mo lightbox
            card.addEventListener("click", () => {
                openLightbox(`https://picsum.photos/id/${photo.id}/800/500`, photo.author);
            });
        });

        page++;
    } catch (err) {
        console.error(err.message);
    } finally {
        isFetching = false;
        spinner.style.display = "none";
    }
}

// IntersectionObserver cho lazy loading anh
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // nap anh that
            observer.unobserve(img); // dung theo doi anh nay
        }
    });
});

// IntersectionObserver cho cuon vo han
const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isFetching) {
        loadMorePhotos();
    }
});

// khoi chay lang nghe trigger cuon trang
scrollObserver.observe(scrollTrigger);

// modal lightbox controls
function openLightbox(url, author) {
    lightboxImg.src = url;
    lightboxAuthor.textContent = `Tác giả: ${author}`;
    lightboxModal.style.display = "flex";
}

function closeLightbox() {
    lightboxModal.style.display = "none";
}

closeLightboxBtn.addEventListener("click", closeLightbox);
lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});
