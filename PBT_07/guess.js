// Khởi tạo các biến trạng thái cho game
let targetNumber;
let attempts;
const maxAttempts = 7;
let guessedNumbers;

// Lấy các phần tử giao diện từ DOM
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const messageDiv = document.getElementById('message');
const historyDiv = document.getElementById('history');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');

// Hàm bắt đầu hoặc khởi động lại game
function initGame() {
    // Random số ngẫu nhiên từ 1 đến 100
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessedNumbers = [];
    
    // Đặt lại giao diện về trạng thái ban đầu
    messageDiv.textContent = '';
    messageDiv.style.color = 'black';
    historyDiv.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    restartBtn.style.display = 'none';
    guessInput.focus();
}

// Xử lý sự kiện khi người dùng gửi form (nhấn nút Đoán hoặc Enter)
guessForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn hành vi tải lại trang của form
    
    // Lấy giá trị, xóa khoảng trắng 2 đầu và chuyển sang kiểu số
    let input = guessInput.value.trim();
    let guess = Number(input);

    // Xóa nội dung ô input để tiện cho lần nhập tiếp theo
    guessInput.value = '';
    guessInput.focus();

    // Kiểm tra tính hợp lệ của đầu vào
    if (isNaN(guess) || guess < 1 || guess > 100 || !Number.isInteger(guess)) {
        messageDiv.textContent = "Vui lòng nhập một số nguyên hợp lệ từ 1 đến 100.";
        messageDiv.style.color = 'red';
        return;
    }

    // Kiểm tra xem số đã được đoán trước đó chưa
    if (guessedNumbers.includes(guess)) {
        messageDiv.textContent = "Bạn đã đoán số này rồi! (Lượt này không bị tính)";
        messageDiv.style.color = 'orange';
        return;
    }

    // Ghi nhận lượt đoán hợp lệ
    guessedNumbers.push(guess);
    attempts++;

    // Cập nhật lịch sử các số đã đoán
    historyDiv.textContent = `Các số đã đoán: ${guessedNumbers.join(', ')} | Lượt: ${attempts}/${maxAttempts}`;

    // Kiểm tra kết quả so với số máy tính chọn
    if (guess === targetNumber) {
        messageDiv.textContent = `Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`;
        messageDiv.style.color = 'green';
        endGame();
    } else if (attempts >= maxAttempts) {
        // Hết lượt mà vẫn chưa đoán trúng
        messageDiv.textContent = `Bạn đã hết ${maxAttempts} lượt đoán! Bạn đã thua. Đáp án đúng là: ${targetNumber}`;
        messageDiv.style.color = 'red';
        endGame();
    } else if (guess < targetNumber) {
        messageDiv.textContent = "Cao hơn!";
        messageDiv.style.color = 'blue';
    } else {
        messageDiv.textContent = "Thấp hơn!";
        messageDiv.style.color = 'blue';
    }
});

// Bắt sự kiện bấm nút Chơi lại
restartBtn.addEventListener('click', initGame);

// Hàm xử lý khi game kết thúc (thắng hoặc thua)
function endGame() {
    // Vô hiệu hóa ô nhập và nút đoán
    guessInput.disabled = true;
    submitBtn.disabled = true;
    // Hiển thị nút chơi lại
    restartBtn.style.display = 'inline-block';
}

// Khởi chạy game lần đầu khi tải file xong
initGame();
