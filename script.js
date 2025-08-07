// Hàm để tạo một chuỗi "ngẫu nhiên" dựa trên ngày hiện tại
// Chuỗi này sẽ nhất quán trong suốt 24h và chỉ thay đổi vào ngày hôm sau.
function generateDailyKey() {
    // Lấy ngày hiện tại
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}${month}${day}`;

    // Tạo một chuỗi "ngẫu nhiên" đơn giản từ ngày tháng
    // Đây là một ví dụ, bạn có thể thay đổi để tạo chuỗi phức tạp hơn
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Chuyển đổi thành số nguyên 32bit
    }
    const randomString = Math.abs(hash).toString(36).substring(0, 8); // Chuyển sang base36 và lấy 8 ký tự

    return `Bindz-1d-${randomString.toUpperCase()}`;
}

document.getElementById('submitBtn').addEventListener('click', function() {
    const apiKey = document.getElementById('apiKeyInput').value;
    const messageElement = document.getElementById('message');
    const validKey = generateDailyKey();

    if (apiKey === validKey) {
        // Lưu key vào localStorage
        localStorage.setItem('gameApiKey', apiKey);
        messageElement.style.color = '#2ecc71';
        messageElement.textContent = 'Key hợp lệ! Đang chuyển hướng...';
        
        // Chuyển hướng đến trang game sau 2 giây
        setTimeout(() => {
            // Thay thế URL này bằng URL game của bạn trên GitHub Pages
            window.location.href = 'https://[tên_tài_khoản_github].github.io/ev-simulator/'; 
        }, 2000);
        
    } else {
        messageElement.style.color = '#e74c3c';
        messageElement.textContent = 'API Key không hợp lệ. Vui lòng thử lại.';
        console.log(`Key hợp lệ hôm nay là: ${validKey}`); // Hiển thị key hợp lệ trong console
    }
});

// Khi trang được tải, kiểm tra xem đã có key hợp lệ chưa
// và chuyển hướng nếu cần
window.onload = function() {
    const storedApiKey = localStorage.getItem('gameApiKey');
    const validKey = generateDailyKey();
    
    if (storedApiKey === validKey) {
        window.location.href = 'https://[tên_tài_khoản_github].github.io/ev-simulator/';
    }
};
