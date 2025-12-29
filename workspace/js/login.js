document.addEventListener('DOMContentLoaded', () => {
    
    // 0. 팀원들과 정한 로그인 정보 (초기 기본값)
    const DEFAULT_ID = "yoonhuynhozzang";
    const DEFAULT_PW = "251212";

    // 회원정보 수정에서 변경된 비밀번호가 있다면 가져오고, 없으면 기본값 사용
    const VALID_ID = DEFAULT_ID;
    const VALID_PW = localStorage.getItem('userPW') || DEFAULT_PW;

    // 1. 로그인 폼 제출 유효성 검사 추가
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();     // 기본 이벤트 제거

            const userId = document.querySelector('#user-id').value;
            const userPw = document.querySelector('#user-pw').value;

            // 로그인 시점에 최신 비밀번호 정보를 다시 확인
            const currentValidPw = localStorage.getItem('userPW') || DEFAULT_PW;

            // 아이디와 비밀번호 확인 로직
            if (userId === VALID_ID && userPw === currentValidPw) {
                alert('로그인에 성공했습니다!');
                
                // [추가] 로그인 상태 유지 로직: 브라우저에 유저 정보 저장
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('loggedInUserId', userId);

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

    // 2-1. 아이디/비밀번호 찾기 버튼 클릭 시 이동 (추가된 부분)
    const findBtn = document.querySelector('#helper-buttons .small-btn:not(#join-btn)');
    if (findBtn) {
        findBtn.addEventListener('click', () => {
            window.location.href = 'find.html';
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

    /* 5. 테마 설정 동기화  */
    // localStorage에 저장된 테마를 확인하여 페이지 로드 시 다크모드 적용
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});