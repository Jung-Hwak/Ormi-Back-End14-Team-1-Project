    function switchTab(type) {
        // ID 요소 직접 참조
        const tabBtnId = document.getElementById('tab-btn-id');
        const tabBtnPw = document.getElementById('tab-btn-pw');
        const formId = document.getElementById('form-id');
        const formPw = document.getElementById('form-pw');

        // 모든 상태 초기화
        tabBtnId.classList.remove('active');
        tabBtnPw.classList.remove('active');
        formId.classList.remove('active');
        formPw.classList.remove('active');

        // 선택된 탭 활성화
        if (type === 'id') {
            tabBtnId.classList.add('active');
            formId.classList.add('active');
        } else {
            tabBtnPw.classList.add('active');
            formPw.classList.add('active');
        }
    }

    // 모달 관련 요소 (ID로 탐색)
    const modal = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalMsg = document.getElementById('modal-msg');
    const modalIcon = document.getElementById('modal-icon');

    function openModal(title, message, isSuccess = true) {
        modalTitle.innerText = title;
        modalMsg.innerHTML = message;
        modalIcon.innerText = isSuccess ? "✅" : "⚠️";
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // [로직 1] 아이디 찾기
    function findID() {
        const nameInput = document.getElementById('input-id-name');
        const emailInput = document.getElementById('input-id-email');

        if (!nameInput.value || !emailInput.value) {
            alert('이름과 이메일을 모두 입력해주세요.');
            return;
        }

        // 가상 로직
        const foundID = "user1234"; 
        
        const msg = `
            회원님의 아이디는
            <span class="highlight-text">${foundID}</span>
            입니다.
        `;
        openModal("아이디 찾기 성공", msg);
    }

    // [로직 2] 비밀번호 찾기
    function findPW() {
        const idInput = document.getElementById('input-pw-id');
        const nameInput = document.getElementById('input-pw-name');
        const emailInput = document.getElementById('input-pw-email');

        if (!idInput.value || !nameInput.value || !emailInput.value) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        // 가상 로직
        const tempPW = Math.random().toString(36).slice(-8); 

        const msg = `
            회원님의 임시 비밀번호는
            <span class="highlight-text">${tempPW}</span>
            입니다.<br>
            <span style="font-size:13px; color:#e03131;">로그인 후 반드시 비밀번호를 변경해주세요.</span>
        `;
        openModal("임시 비밀번호 발급", msg);
    }
