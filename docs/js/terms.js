document.addEventListener('DOMContentLoaded', function() {
    
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", checkAgreement);
    }

    const logo = document.querySelector('.header-title'); 
    if (logo) {
        logo.style.cursor = 'pointer'; 
        logo.addEventListener('click', function() {
            window.location.href = 'index.html'; 
        });
    }

    const closeBtn = document.getElementById("modalCloseBtn");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
});

function checkAgreement() {
    var term1 = document.getElementById("terms1");
    var term2 = document.getElementById("terms2");

    if (term1 && term2 && term1.checked && term2.checked) {
        showModal("✅", "모든 약관에 동의하셨습니다.<br>본인인증 페이지로 이동합니다.", true);
        
        setTimeout(() => { 
            window.location.href = 'authentication.html'; 
        }, 1500);
        
    } else {
        showModal("⚠️", "모든 필수 약관에 동의해주셔야<br>가입이 가능합니다.", false);
    }
}

function showModal(icon, msg, isSuccess) {
    const modal = document.getElementById('customModal');
    const msgBox = document.getElementById('modalMessage');
    const iconBox = document.getElementById('modalIcon');
    
    if (modal && msgBox && iconBox) {
        msgBox.innerHTML = msg;
        iconBox.innerHTML = icon;
        iconBox.style.color = isSuccess ? '#2ecc71' : '#e74c3c';
        modal.style.display = 'flex';
    } else {
        alert(msg.replace(/<br>/g, "\n"));
    }
}

// 모달창 닫기
function closeModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
