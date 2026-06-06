// Hàm tính và in hóa đơn
function tinhHoaDon(items, date = new Date(), hasTip = true) {
    let subtotal = 0;
    
    console.log("HÓA ĐƠN NHÀ HÀNG");
    console.log("---------------------------------------");
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const indexStr = `${i + 1}. ${item.name}`;
        const detailStr = `x${item.quantity}  @${item.price / 1000}k`;
        const totalStr = `= ${itemTotal / 1000}k`;
        
        console.log(indexStr.padEnd(15) + detailStr.padEnd(15) + totalStr.padStart(9));
    }
    console.log("---------------------------------------");
    
    // Tỷ lệ giảm giá theo tổng tiền
    let discountPercent = 0;
    if (subtotal > 1000000) {
        discountPercent = 15;
    } else if (subtotal > 500000) {
        discountPercent = 10;
    }
    
    // Thứ 4 giảm thêm 5%
    const isWednesday = date.getDay() === 3;
    if (isWednesday) {
        discountPercent += 5;
    }
    
    const discountAmount = subtotal * (discountPercent / 100);
    const baseAfterDiscount = subtotal - discountAmount;
    
    // Tính VAT 8% và Tip 5%
    const vatAmount = baseAfterDiscount * 0.08;
    const tipAmount = hasTip ? baseAfterDiscount * 0.05 : 0;
    const finalTotal = baseAfterDiscount + vatAmount + tipAmount;
    
    const lineWidth = 39;
    const printRow = (label, value) => {
        console.log(label.padEnd(25) + value.padStart(lineWidth - 25));
    };
    
    printRow("Tổng cộng:", `${subtotal}đ`);
    printRow(`Giảm giá (${discountPercent}%):`, `-${discountAmount}đ`);
    printRow("VAT (8%):", `${vatAmount}đ`);
    printRow("Tip (5%):", `${tipAmount}đ`);
    console.log("---------------------------------------");
    printRow("THANH TOÁN:", `${finalTotal}đ`);
    console.log("---------------------------------------");
}

// Mẫu món ăn
const testOrder = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

// Test 1: Ngày thường (Thứ Hai)
console.log("TEST 1: Ngày thường");
tinhHoaDon(testOrder, new Date("2026-06-08"));

// Test 2: Thứ Tư - giảm 5%
console.log("\nTEST 2: Thứ Tư");
tinhHoaDon(testOrder, new Date("2026-06-10"));
