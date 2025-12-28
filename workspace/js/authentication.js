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
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalInput = document.getElementById('modal-input');


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

    if (mainAuthBtn) {
        mainAuthBtn.addEventListener('click', function() {
            if (!selectedMethod) return;

            // 모달창 띄우기
            let methodText = "";
            if (selectedMethod === 'phone') methodText = "휴대폰";
            else if (selectedMethod === 'ipin') methodText = "아이핀";
            else if (selectedMethod === 'toss') methodText = "토스";
            else if (selectedMethod === 'card') methodText = "카드";
            
            modalTitle.innerText = `${methodText} 인증`;
            modalOverlay.style.display = 'flex';
            modalInput.value = ''; 
            modalInput.focus();
        });
    }

    window.closeModal = function() {
        modalOverlay.style.display = 'none';
    };

    window.verifyCode = function() {
        const inputVal = modalInput.value;

        if (inputVal.length > 0) {
            alert("인증에 성공했습니다.");
            closeModal();
            completeAuth();
        } else {
            alert("인증번호를 입력해주세요.");
            modalInput.focus();
        }
    };

    // 인증 성공 시 UI 변경 함수
    function completeAuth() {
        isAuthenticated = true;

        // 성공 메시지 표시
        authMessage.innerText = "✔ 본인 인증이 완료되었습니다.";
        authMessage.style.display = "block";

        // 메인 버튼 스타일 변경
        mainAuthBtn.innerText = "인증 완료";
        mainAuthBtn.disabled = true;
        mainAuthBtn.style.backgroundColor = "#28a745";
        mainAuthBtn.style.cursor = "default";
        mainAuthBtn.style.boxShadow = "none";

        authCards.forEach(c => {
            if(!c.classList.contains('selected')) {
                c.style.opacity = '0.5';
                c.style.pointerEvents = 'none';
            } else {
                c.style.pointerEvents = 'none';
            }
        });
    }

    // 인증 성공 시 UI 변경 함수
    function completeAuth() {
        isAuthenticated = true;

        // 성공 메시지 표시
        authMessage.innerText = "✔ 본인 인증이 완료되었습니다.";
        authMessage.style.display = "block";

        // 메인 버튼 스타일 변경
        mainAuthBtn.innerText = "인증 완료";
        mainAuthBtn.disabled = true;
        mainAuthBtn.style.backgroundColor = "#28a745"; // 성공 초록색
        mainAuthBtn.style.cursor = "default";
        mainAuthBtn.style.boxShadow = "none";

        // 카드 선택 비활성화 (시각적 효과)
        authCards.forEach(c => {
            if(!c.classList.contains('selected')) {
                c.style.opacity = '0.5';
                c.style.pointerEvents = 'none';
            } else {
                c.style.pointerEvents = 'none';
            }
        });
    }

    // --- 3. [다음] 버튼 클릭 이벤트 ---
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (isAuthenticated) {
                alert("인증이 확인되었습니다. 회원정보 입력 페이지로 이동합니다.");
                window.location.href = 'join.html'; 
            } else {
                alert("본인 인증을 먼저 완료해주세요.");
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm("인증을 취소하고 약관 동의 화면으로 돌아가시겠습니까?")) {
                window.location.href = 'terms.html'; 
            }
        });
    }

    if (logoBtn) {
        logoBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    
    }
    
});
