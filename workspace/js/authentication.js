document.addEventListener('DOMContentLoaded', function() {
    
    // --- 변수 선언 ---
    let selectedMethod = null;   // 선택된 인증 수단
    let isAuthenticated = false; // 인증 완료 여부

    // --- DOM 요소 가져오기 ---
    const authCards = document.querySelectorAll('.auth-card');
    const mainAuthBtn = document.getElementById('main-auth-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const nextBtn = document.getElementById('next-btn');
    const logoBtn = document.getElementById('logo-btn');
    const authMessage = document.getElementById('auth-message');

    // --- 1. 인증 수단 카드 클릭 이벤트 ---
    authCards.forEach(card => {
        card.addEventListener('click', function() {
            if (isAuthenticated) return; // 이미 인증했으면 선택 불가

            // 다른 카드 선택 해제
            authCards.forEach(c => c.classList.remove('selected'));
            
            // 현재 카드 선택
            this.classList.add('selected');
            
            // 선택된 수단 저장 
            selectedMethod = this.getAttribute('data-method');

            // 버튼 활성화 및 텍스트 변경
            mainAuthBtn.disabled = false;
            
            let methodName = "";
            if (selectedMethod === 'phone') methodName = "휴대폰";
            else if (selectedMethod === 'ipin') methodName = "아이핀";
            else if (selectedMethod === 'toss') methodName = "토스";
            else if (selectedMethod === 'cord') methodName = "카드";

            mainAuthBtn.innerText = methodName + "으로 인증하기";
        });
    });

    // --- 2. [인증하기] 버튼 클릭 이벤트 ---
    if (mainAuthBtn) {
        mainAuthBtn.addEventListener('click', function() {
            if (!selectedMethod) return;

            // 여기서 실제 인증 팝업을 띄우거나 로직을 수행할 수 있습니다.            
            isAuthenticated = true;

            // 성공 메시지
            authMessage.innerText = "✔ 인증되었습니다.";
            authMessage.style.display = "block";

            // 버튼 상태 변경
            this.innerText = "인증 완료";
            this.disabled = true;
            this.style.backgroundColor = "#28a745";
        });
    }

    // --- 3. [다음] 버튼 클릭 이벤트 ---
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (isAuthenticated) {
                alert("인증이 확인되었습니다. 회원정보 입력 페이지로 이동합니다.");
            } else {
                alert("본인 인증을 먼저 완료해주세요.");
            }
        });
    }

    // --- 4. [취소] 버튼 클릭 이벤트 ---
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm("인증을 취소하고 약관 동의 화면으로 돌아가시겠습니까?")) {
                // terms.html로 이동
                window.location.href = 'terms.html'; 
            }
        });
    }

    // --- 5. [로고] 클릭 이벤트 ---
    if (logoBtn) {
        logoBtn.addEventListener('click', function() {
            // index.html로 이동
            window.location.href = 'index.html';
        });
    }
});
