let localUsers = [];

// API Layer: quan ly goi API len server
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if (!res.ok) throw new Error("Khong the lay danh sach thanh vien");
        return await res.json();
    },

    async getUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`);
        if (!res.ok) throw new Error("Khong the lay thong tin chi tiet");
        return await res.json();
    },

    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!res.ok) throw new Error("Khong the tao thanh vien moi");
        return await res.json();
    },

    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!res.ok) throw new Error("Khong the cap nhat thanh vien");
        return await res.json();
    },

    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error("Khong the xoa thanh vien");
        return true;
    }
};

// UI Layer: quan ly hien thi giao dien
const ui = {
    userList: document.getElementById("userList"),
    skeletonLoader: document.getElementById("skeletonLoader"),
    alertBox: document.getElementById("alertBox"),

    renderUsers(users) {
        this.userList.innerHTML = "";
        if (users.length === 0) {
            this.userList.innerHTML = `<div class="col-12 text-center text-muted py-3">Khong tim thay thanh vien phu hop</div>`;
            return;
        }

        users.forEach(u => {
            const col = document.createElement("div");
            col.className = "col-md-6";
            col.innerHTML = `
                <div class="card shadow-sm h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title text-secondary fw-bold">${u.name}</h5>
                            <p class="card-text text-muted mb-3">${u.email}</p>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm edit-btn" data-id="${u.id}">Sửa</button>
                            <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${u.id}">Xóa</button>
                        </div>
                    </div>
                </div>
            `;
            this.userList.appendChild(col);
        });
    },

    showLoading() {
        this.skeletonLoader.classList.remove("d-none");
        this.userList.classList.add("d-none");
    },

    hideLoading() {
        this.skeletonLoader.classList.add("d-none");
        this.userList.classList.remove("d-none");
    },

    showError(message) {
        this.alertBox.className = "alert alert-danger mb-4";
        this.alertBox.textContent = message;
        this.alertBox.classList.remove("d-none");
        setTimeout(() => this.alertBox.classList.add("d-none"), 4000);
    },

    showSuccess(message) {
        this.alertBox.className = "alert alert-success mb-4";
        this.alertBox.textContent = message;
        this.alertBox.classList.remove("d-none");
        setTimeout(() => this.alertBox.classList.add("d-none"), 4000);
    }
};

// DOM references va variables
const searchInput = document.getElementById("searchInput");
const userForm = document.getElementById("userForm");
const userIdInput = document.getElementById("userId");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const addUserBtn = document.getElementById("addUserBtn");
const userModalLabel = document.getElementById("userModalLabel");
const bsModal = new bootstrap.Modal(document.getElementById("userModal"));

// load danh sach ban dau
async function init() {
    ui.showLoading();
    try {
        localUsers = await api.getUsers();
        ui.renderUsers(localUsers);
    } catch (err) {
        ui.showError(err.message);
    } finally {
        ui.hideLoading();
    }
}

// loc tim kiem client-side
searchInput.addEventListener("input", (e) => {
    const kw = e.target.value.toLowerCase().trim();
    const filtered = localUsers.filter(u => 
        u.name.toLowerCase().includes(kw) || 
        u.email.toLowerCase().includes(kw)
    );
    ui.renderUsers(filtered);
});

// mo form de add user
addUserBtn.addEventListener("click", () => {
    userIdInput.value = "";
    userForm.reset();
    userModalLabel.textContent = "Thêm thành viên mới";
});

// submit form (add hoac edit)
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = userIdInput.value;
    const name = userNameInput.value.trim();
    const email = userEmailInput.value.trim();
    const data = { name, email };

    bsModal.hide();
    ui.showLoading();

    try {
        if (id) {
            // cap nhat user (PUT)
            await api.updateUser(id, data);
            // update trong mang local
            const index = localUsers.findIndex(u => u.id == id);
            if (index !== -1) {
                localUsers[index] = { ...localUsers[index], name, email };
            }
            ui.showSuccess("Cập nhật thành công!");
        } else {
            // them user moi (POST)
            const newUser = await api.createUser(data);
            // API gia lap tra ve ID mac dinh 11, tu sinh ID duy nhat de tranh trung
            newUser.id = Date.now();
            localUsers.unshift(newUser);
            ui.showSuccess("Thêm thành công!");
        }
        ui.renderUsers(localUsers);
        searchInput.value = ""; // clear tim kiem de xem thay doi
    } catch (err) {
        ui.showError(err.message);
    } finally {
        ui.hideLoading();
    }
});

// bat event cho nut sua va xoa bang Event Delegation tren userList
ui.userList.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("edit-btn")) {
        // mo form edit
        const user = localUsers.find(u => u.id == id);
        if (user) {
            userIdInput.value = user.id;
            userNameInput.value = user.name;
            userEmailInput.value = user.email;
            userModalLabel.textContent = "Chỉnh sửa thành viên";
            bsModal.show();
        }
    } else if (e.target.classList.contains("delete-btn")) {
        // xoa user (DELETE)
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa thành viên này không?");
        if (!confirmDelete) return;

        ui.showLoading();
        try {
            await api.deleteUser(id);
            // xoa khoi mang local
            localUsers = localUsers.filter(u => u.id != id);
            ui.showSuccess("Xóa thành viên thành công!");
            ui.renderUsers(localUsers);
        } catch (err) {
            ui.showError(err.message);
        } finally {
            ui.hideLoading();
        }
    }
});

// khoi chay app
init();
