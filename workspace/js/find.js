document.addEventListener('DOMContentLoaded', function() {
    
    const tabBtnId = document.getElementById('tab-btn-id');
    const tabBtnPw = document.getElementById('tab-btn-pw');
    const formId = document.getElementById('form-id');
    const formPw = document.getElementById('form-pw');
    
    const btnFindId = document.getElementById('btn-find-id');
    const btnFindPw = document.getElementById('btn-find-pw');
    
    const modalOverlay = document.getElementById('modal-overlay');
    const btnModalClose = document.getElementById('btn-modal-close');
    const btnModalLogin = document.getElementById('btn-modal-login');

    if (!tabBtnId || !tabBtnPw || !btnFindId || !btnFindPw) {
        console.error("필수 요소를 찾을 수 없습니다. HTML ID를 확인해주세요.");
        return;
    }

    function switchTab(type) {
        if (type === 'id') {
            // 아이디 찾기 활성화
            tabBtnId.classList.add('active');
            tabBtnPw.classList.remove('active');
            formId.classList.add('active');
            formPw.classList.remove('active');
        } else {
            // 비밀번호 찾기 활성화
            tabBtnPw.classList.add('active');
            tabBtnId.classList.remove('active');
            formPw.classList.add('active');
            formId.classList.remove('active');
        }
    }

    tabBtnId.addEventListener('click', function() { switchTab('id'); });
    tabBtnPw.addEventListener('click', function() { switchTab('pw'); });


    btnFindId.addEventListener('click', function() {
        const name = document.getElementById('input-id-name').value;
        const email = document.getElementById('input-id-email').value;

        if (!name || !email) {
            alert('이름과 이메일을 모두 입력해주세요.');
            return;
        }

        if (name === '윤현호' && email === 'hong@example.com') {
            showModal('아이디 찾기 성공', '회원님의 아이디는 <strong>user1234</strong> 입니다.');
        } else {
            alert('일치하는 회원 정보가 없습니다.');
        }
    });


    btnFindPw.addEventListener('click', function() {
        const id = document.getElementById('input-pw-id').value;
        const name = document.getElementById('input-pw-name').value;
        const email = document.getElementById('input-pw-email').value;

        if (!id || !name || !email) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        if (id === 'user1234' && name === '홍길동' && email === 'hong@example.com') {
            const tempPw = Math.random().toString(36).slice(-8); 
            showModal('임시 비밀번호 발급', `이메일로 임시 비밀번호를 전송했습니다.<br>비밀번호: <strong>${tempPw}</strong>`);
        } else {
            alert('일치하는 회원 정보가 없습니다.');
        }
    });


    function showModal(title, msg) {
        const titleElem = document.getElementById('modal-title');
        const msgElem = document.getElementById('modal-msg');
        
        if(titleElem) titleElem.innerHTML = title;
        if(msgElem) msgElem.innerHTML = msg;
        
        if(modalOverlay) modalOverlay.style.display = 'flex';
    }

    function closeModal() {
        if(modalOverlay) modalOverlay.style.display = 'none';
    }

    if(btnModalClose) btnModalClose.addEventListener('click', closeModal);
    if(btnModalLogin) {
        btnModalLogin.addEventListener('click', function() {
            location.href = 'Login.html';
        });
    }

    if(modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
});
