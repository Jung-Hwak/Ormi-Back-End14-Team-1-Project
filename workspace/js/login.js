document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 회원 가입 버튼 클릭 시 이동
    const joinBtn = document.querySelector('#join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            window.location.href = 'terms.html';
        });
    }

    // 2. 소셜 로그인 팝업 기능
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

    // 3. 입력창 x 버튼 로직
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