document.getElementById('submitBtn').addEventListener('click', function() {
    const apiKey = document.getElementById('apiKeyInput').value;
    const messageElement = document.getElementById('message');

    if (apiKey === 'your-secret-key') { // Thay 'your-secret-key' bằng key bí mật của bạn
        // Lưu key vào localStorage
        localStorage.setItem('gameApiKey', apiKey);
        messageElement.style.color = '#2ecc71';
        messageElement.textContent = 'Key hợp lệ! Đang chuyển hướng...';
        
        // Chuyển hướng đến trang game sau 2 giây
        setTimeout(() => {
            window.location.href = 'https://[your-github-username].github.io/ev-simulator/'; // Thay URL bằng URL game của bạn
        }, 2000);
        
    } else {
        messageElement.style.color = '#e74c3c';
        messageElement.textContent = 'API Key không hợp lệ. Vui lòng thử lại.';
    }
});
