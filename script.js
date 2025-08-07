document.getElementById('bypassImage').addEventListener('click', function() {
    const messageElement = document.createElement('p');
    messageElement.textContent = 'Đang chuyển hướng...';
    messageElement.style.color = '#2ecc71';
    document.querySelector('.container').appendChild(messageElement);

    setTimeout(() => {
        // Thay thế bằng link trang vượt link của bạn
        window.location.href = 'https://[tên_tài_khoản_github].github.io/link-bypass-page/';
    }, 1500);
});
