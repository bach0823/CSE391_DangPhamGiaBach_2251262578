// lay cac phan tu DOM can thiet
const registerForm = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const nameStatus = document.getElementById("nameStatus");
const nameFeedback = document.getElementById("nameFeedback");

const email = document.getElementById("email");
const emailFeedback = document.getElementById("emailFeedback");

const password = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const passwordFeedback = document.getElementById("passwordFeedback");

const confirmPassword = document.getElementById("confirmPassword");
const confirmFeedback = document.getElementById("confirmFeedback");

const phone = document.getElementById("phone");
const phoneFeedback = document.getElementById("phoneFeedback");

const submitBtn = document.getElementById("submitBtn");

const successModal = document.getElementById("successModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalName = document.getElementById("modalName");
const modalEmail = document.getElementById("modalEmail");
const modalPhone = document.getElementById("modalPhone");

// kiem tra xem toan bo form da hop le chua de bat nut submit
function checkFormValidity() {
    const nameVal = fullName.value.trim();
    const nameValid = nameVal.length >= 2 && nameVal.length <= 50;

    const emailVal = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(emailVal);

    const passVal = password.value;
    const passValid = passVal.length >= 8;

    const confirmVal = confirmPassword.value;
    const confirmValid = confirmVal !== "" && confirmVal === passVal;

    const phoneVal = phone.value.replace(/\D/g, "");
    const phoneValid = phoneVal.length === 10;

    submitBtn.disabled = !(nameValid && emailValid && passValid && confirmValid && phoneValid);
}

// validate ho ten khi go
fullName.addEventListener("input", () => {
    const val = fullName.value.trim();
    const isValid = val.length >= 2 && val.length <= 50;
    if (isValid) {
        nameStatus.textContent = "✅";
        nameFeedback.textContent = "";
        fullName.classList.remove("is-invalid");
        fullName.classList.add("is-valid");
    } else {
        nameStatus.textContent = "❌";
        nameFeedback.textContent = "Họ tên phải từ 2 đến 50 ký tự.";
        fullName.classList.remove("is-valid");
        fullName.classList.add("is-invalid");
    }
    checkFormValidity();
});

// validate email khi go
email.addEventListener("input", () => {
    const val = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(val);
    if (isValid) {
        email.className = "form-control is-valid";
        emailFeedback.textContent = "";
    } else {
        email.className = "form-control is-invalid";
        emailFeedback.textContent = "Email không đúng định dạng.";
    }
    checkFormValidity();
});

// validate do manh mat khau khi go
password.addEventListener("input", () => {
    const val = password.value;
    
    if (val.length === 0) {
        strengthBar.style.width = "0%";
        passwordFeedback.textContent = "";
        passwordFeedback.className = "small mt-1";
    } else if (val.length < 8) {
        strengthBar.style.width = "33%";
        strengthBar.className = "progress-bar bg-danger";
        passwordFeedback.textContent = "Mật khẩu yếu";
        passwordFeedback.className = "small mt-1 text-danger";
    } else {
        // tren 8 ky tu, kiem tra cac dieu kien
        const hasLetter = /[a-zA-Z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasLower = /[a-z]/.test(val);
        const hasSpecial = /[^A-Za-z0-9]/.test(val);
        
        if (hasUpper && hasLower && hasNumber && hasSpecial) {
            strengthBar.style.width = "100%";
            strengthBar.className = "progress-bar bg-success";
            passwordFeedback.textContent = "Mật khẩu mạnh";
            passwordFeedback.className = "small mt-1 text-success";
        } else if (hasLetter && hasNumber) {
            strengthBar.style.width = "66%";
            strengthBar.className = "progress-bar bg-warning";
            passwordFeedback.textContent = "Mật khẩu trung bình";
            passwordFeedback.className = "small mt-1 text-warning";
        } else {
            strengthBar.style.width = "33%";
            strengthBar.className = "progress-bar bg-danger";
            passwordFeedback.textContent = "Mật khẩu yếu (cần có cả chữ và số)";
            passwordFeedback.className = "small mt-1 text-danger";
        }
    }
    
    // check lai o confirm password xem co khop khong khi mat khau thay doi
    if (confirmPassword.value) {
        const confirmVal = confirmPassword.value;
        const confirmValid = confirmVal === val;
        if (confirmValid) {
            confirmPassword.className = "form-control is-valid";
            confirmFeedback.textContent = "";
        } else {
            confirmPassword.className = "form-control is-invalid";
            confirmFeedback.textContent = "Mật khẩu không khớp.";
        }
    }
    
    checkFormValidity();
});

// validate xac nhan mat khau
confirmPassword.addEventListener("input", () => {
    const val = confirmPassword.value;
    const passVal = password.value;
    const isValid = val !== "" && val === passVal;
    if (isValid) {
        confirmPassword.className = "form-control is-valid";
        confirmFeedback.textContent = "";
    } else {
        confirmPassword.className = "form-control is-invalid";
        confirmFeedback.textContent = "Mật khẩu không khớp.";
    }
    checkFormValidity();
});

// tu dong format so dien thoai va validate
phone.addEventListener("input", (e) => {
    let val = phone.value.replace(/\D/g, "");
    if (val.length > 10) {
        val = val.substring(0, 10);
    }
    
    // tu dong them dau gach ngang
    if (val.length > 7) {
        phone.value = `${val.slice(0, 4)}-${val.slice(4, 7)}-${val.slice(7)}`;
    } else if (val.length > 4) {
        phone.value = `${val.slice(0, 4)}-${val.slice(4)}`;
    } else {
        phone.value = val;
    }
    
    // check du 10 so hay chua
    const isValid = val.length === 10;
    if (isValid) {
        phone.className = "form-control is-valid";
        phoneFeedback.textContent = "";
    } else {
        phone.className = "form-control is-invalid";
        phoneFeedback.textContent = "Số điện thoại phải đủ 10 số.";
    }
    checkFormValidity();
});

// submit form show modal
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modalName.textContent = fullName.value;
    modalEmail.textContent = email.value;
    modalPhone.textContent = phone.value;
    successModal.style.display = "flex";
});

// close modal va reset form
closeModalBtn.addEventListener("click", () => {
    successModal.style.display = "none";
    registerForm.reset();
    submitBtn.disabled = true;
    
    // reset cac feedback va class
    nameStatus.textContent = "";
    nameFeedback.textContent = "";
    fullName.className = "form-control";
    
    email.className = "form-control";
    emailFeedback.textContent = "";
    
    strengthBar.style.width = "0%";
    passwordFeedback.textContent = "";
    passwordFeedback.className = "small mt-1";
    
    confirmPassword.className = "form-control";
    confirmFeedback.textContent = "";
    
    phone.className = "form-control";
    phoneFeedback.textContent = "";
});
