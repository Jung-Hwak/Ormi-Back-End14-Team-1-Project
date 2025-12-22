document.addEventListener('DOMContentLoaded', () => {
    
    // 0. 팀원들과 정한 로그인 정보 (여기에 정해진 값을 넣으세요)
    const VALID_ID = "yoonhuynhozzang";
    const VALID_PW = "251212";

    // 1. 로그인 폼 제출 유효성 검사 추가
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();     // 기본 이벤트 제거

            const userId = document.querySelector('#user-id').value;
            const userPw = document.querySelector('#user-pw').value;

            // 아이디와 비밀번호 확인 로직
            if (userId === VALID_ID && userPw === VALID_PW) {
                alert('로그인에 성공했습니다!');
                window.location.href = 'index.html';
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                document.querySelector('#user-pw').value = '';
                document.querySelector('#user-pw').focus();
            }
        });
    }

    // 2. 회원 가입 버튼 클릭 시 이동
    const joinBtn = document.querySelector('#join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            window.location.href = 'terms.html';
        });
    }

    // 3. 소셜 로그인 팝업 기능
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = this.href;
            const name = this.id + 'Popup';
            const Ui = 'width=500, height=600, top=100, left=200, scrollbars=yes';
            
            window.open(url, name, Ui);
        });
    });

    // 4. 입력창 x 버튼 로직
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(field => {
        const input = field.querySelector('input');
        const delBtn = field.querySelector('.delete-btn');

        input.addEventListener('input', () => {
            delBtn.style.display = input.value.length > 0 ? 'flex' : 'none';
        });

        delBtn.addEventListener('click', () => {
            input.value = '';
            delBtn.style.display = 'none';
            input.focus();
        });
    });
});