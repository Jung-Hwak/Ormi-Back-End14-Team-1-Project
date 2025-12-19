document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 입력 필드 데이터
    const formFields = [
        { id: 'input-id', label: '아이디', type: 'text', placeholder: '아이디를 입력해주세요 (영문, 숫자)' },
        { id: 'input-pw', label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요 (영문, 숫자)' },
        { id: 'input-pw-check', label: '비밀번호 확인', type: 'password', placeholder: '비밀번호를 한번 더 입력해주세요' },
        { id: 'input-name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요' },
        { id: 'input-email', label: '이메일', type: 'email', placeholder: '이메일을 입력해주세요 (example@ksh.com)' }
    ];

    // 2. 컨테이너 찾기
    const container = document.getElementById('signup-form-container');

    // 3. 폼 생성 함수
    function createForm() {
        // 입력 필드 생성
        formFields.forEach(field => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'form-group';

            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.innerText = field.label;

            // 입력창과 버튼을 감싸는 컨테이너 (아이디 중복확인 버튼 배치용)
            const inputWrapper = document.createElement('div');
            inputWrapper.style.display = 'flex';
            inputWrapper.style.gap = '10px';

            const input = document.createElement('input');
            input.type = field.type;
            input.id = field.id;
            input.placeholder = field.placeholder;
            inputWrapper.appendChild(input);

            if (field.id === 'input-id' || field.id === 'input-pw' || field.id === 'input-pw-check') {
                input.addEventListener('change', function(e) {
                    const value = this.value;
                    // 영문자와 숫자가 아닌 문자가 포함되어 있는지 검사
                    if (/[^a-zA-Z0-9]/.test(value)) {
                        alert('영문자와 숫자만 입력 가능합니다.');
                        this.value = ''; // 입력값 초기화
                        this.focus();    // 다시 입력하도록 포커스 이동
                    }
                });
            }

            // 아이디 입력란인 경우 중복 확인 버튼 추가
            if (field.id === 'input-id') {
                const checkBtn = document.createElement('button');
                checkBtn.innerText = '중복 확인';
                checkBtn.type = 'button';
                // [수정] 버튼 크기 확대
                checkBtn.style.width = '120px'; 
                checkBtn.style.padding = '0 10px'; 
                checkBtn.style.fontSize = '14px'; 
                checkBtn.style.whiteSpace = 'nowrap'; 
                
                // 중복 확인 버튼 스타일
                checkBtn.style.backgroundColor = '#6c757d';
                checkBtn.style.color = 'white';
                checkBtn.style.border = 'none';
                checkBtn.style.borderRadius = '8px';
                checkBtn.style.cursor = 'pointer';

                checkBtn.addEventListener('click', function() {
                    checkDuplicateId(input.value, input);
                });
                
                inputWrapper.appendChild(checkBtn);
            }

            groupDiv.appendChild(label);
            groupDiv.appendChild(inputWrapper);
            container.appendChild(groupDiv);
        });

        // 버튼 그룹 생성
        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        // 취소 버튼
        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'btn-cancel';
        cancelBtn.innerText = '취소';
        cancelBtn.addEventListener('click', function() {
            if(confirm('가입을 취소하고 이전 단계로 돌아가시겠습니까?')) {
                // 요청사항: authentication.html로 이동
                window.location.href = 'authentication.html'; 
            }
        });

        // 가입 완료 버튼
        const submitBtn = document.createElement('button');
        submitBtn.id = 'btn-submit';
        submitBtn.innerText = '가입 완료';
        submitBtn.addEventListener('click', handleSubmit);

        btnGroup.appendChild(cancelBtn);
        btnGroup.appendChild(submitBtn);
        container.appendChild(btnGroup);
    }

    // 4. 아이디 중복 확인 함수
    function checkDuplicateId(id, inputElement) {
        if (!id) {
            alert('아이디를 입력해주세요.');
            return;
        }

        const duplicateIds = ['pros4844', 'yongyongijanggun', 'apreeing'];

        if (duplicateIds.includes(id)) {
            alert('이미 사용 중인 아이디입니다.');
            inputElement.value = ''; // 입력창 초기화
            inputElement.focus();
        } else {
            alert('사용 가능한 아이디입니다.');
        }
    }

    // 5. 가입 완료 버튼 동작
    function handleSubmit() {
        const id = document.getElementById('input-id').value;
        const pw = document.getElementById('input-pw').value;
        const pwCheck = document.getElementById('input-pw-check').value;
        const name = document.getElementById('input-name').value;
        const email = document.getElementById('input-email').value;

        // 필수 입력 확인
        if (!id || !pw || !pwCheck || !name || !email) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        // 비밀번호 일치 확인
        if (pw !== pwCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 가입 완료 처리
        alert(name + '님, 회원가입이 완료되었습니다!');
        
        // 요청사항: Login.html로 이동
        window.location.href = 'Login.html'; 
    }

    // 로고 클릭 이벤트
    const logo = document.getElementById('logo-btn');
    if(logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // 실행
    createForm();
});