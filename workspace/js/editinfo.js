document.addEventListener('DOMContentLoaded', function() {
    const savedInfo = JSON.parse(localStorage.getItem('userInfo')) || {
        email: 'hong@example.com',
        nickname: '홍길동' 
    };

    const formFields = [
        { id: 'input-nickname', label: '닉네임', type: 'text', value: savedInfo.nickname },
        { id: 'input-pw', label: '새 비밀번호', type: 'password', placeholder: '변경할 비밀번호를 입력해주세요 (영문, 숫자)' },
        { id: 'input-pw-check', label: '새 비밀번호 확인', type: 'password', placeholder: '비밀번호를 한번 더 입력해주세요' },
        { id: 'input-email', label: '이메일 변경', type: 'email', value: savedInfo.email }
    ];

    const container = document.getElementById('edit-form-container');

    function createForm() {
        formFields.forEach(field => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'form-group';

            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.innerText = field.label;

            const inputWrapper = document.createElement('div');
            inputWrapper.style.display = 'flex';
            inputWrapper.style.gap = '10px';
            inputWrapper.style.flexDirection = 'column'; 

            const rowWrapper = document.createElement('div');
            rowWrapper.style.display = 'flex';
            rowWrapper.style.gap = '10px';
            rowWrapper.style.width = '100%';

            const input = document.createElement('input');
            input.type = field.type;
            input.id = field.id;
            input.style.flex = '1'; 
            
            if (field.value) input.value = field.value;
            if (field.placeholder) input.placeholder = field.placeholder;
            if (field.readonly) input.readOnly = true;

            if (field.id === 'input-pw' || field.id === 'input-pw-check') {
                input.addEventListener('input', validatePassword);
            }

            rowWrapper.appendChild(input);

            if (field.id === 'input-email') {
                const authBtn = document.createElement('button');
                authBtn.type = 'button';
                authBtn.innerText = '인증번호 전송';
                authBtn.style.width = '120px';
                authBtn.style.padding = '0 10px';
                authBtn.style.fontSize = '14px';
                authBtn.style.backgroundColor = '#6c757d'; 
                authBtn.style.color = 'white';
                authBtn.style.border = 'none';
                authBtn.style.borderRadius = '8px';
                authBtn.style.cursor = 'pointer';
                authBtn.style.whiteSpace = 'nowrap';

                authBtn.addEventListener('click', function() {
                    alert('인증번호가 전송되었습니다. (테스트: 아무 숫자 4자리 입력)');
                    const codeInputArea = document.getElementById('email-auth-area');
                    if (codeInputArea) codeInputArea.style.display = 'block';
                });

                rowWrapper.appendChild(authBtn);
            }

            inputWrapper.appendChild(rowWrapper); 

            if (field.id === 'input-email') {
                const authArea = document.createElement('div');
                authArea.id = 'email-auth-area';
                authArea.style.display = 'none'; 
                authArea.style.marginTop = '10px';

                const authInput = document.createElement('input');
                authInput.type = 'text';
                authInput.placeholder = '인증번호 4자리 입력';
                authInput.maxLength = 4;
                authInput.style.width = '100%';
                authInput.style.padding = '10px';
                authInput.style.border = '1px solid #ddd';
                authInput.style.borderRadius = '8px';

                const authMsg = document.createElement('div');
                authMsg.style.fontSize = '13px';
                authMsg.style.marginTop = '5px';
                authMsg.style.fontWeight = 'bold';

                authInput.addEventListener('input', function() {
                    this.value = this.value.replace(/[^0-9]/g, '');

                    if (this.value.length === 4) {
                        authMsg.innerText = '✔ 인증되었습니다.';
                        authMsg.style.color = '#28a745'; 
                        authInput.disabled = true; 
                        authInput.style.backgroundColor = '#f0f0f0';
                    } else {
                        authMsg.innerText = '';
                    }
                });

                authArea.appendChild(authInput);
                authArea.appendChild(authMsg);
                inputWrapper.appendChild(authArea);
            }

            if (field.id === 'input-pw-check') {
                const msgDiv = document.createElement('div');
                msgDiv.id = 'pw-match-message';
                msgDiv.style.fontSize = '13px';
                msgDiv.style.marginTop = '5px';
                msgDiv.style.fontWeight = 'bold';
                inputWrapper.appendChild(msgDiv);
            }

            groupDiv.appendChild(label);
            groupDiv.appendChild(inputWrapper);
            container.appendChild(groupDiv);
        });

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'btn-cancel';
        cancelBtn.innerText = '취소';
        cancelBtn.addEventListener('click', function() {
            if(confirm('정보 수정을 취소하시겠습니까?')) {
                window.location.href = 'index.html'; 
            }
        });

        const submitBtn = document.createElement('button');
        submitBtn.id = 'btn-submit';
        submitBtn.innerText = '수정 완료';
        submitBtn.addEventListener('click', handleSubmit);

        btnGroup.appendChild(cancelBtn);
        btnGroup.appendChild(submitBtn);
        container.appendChild(btnGroup);
    }

    function validatePassword() {
        const pwInput = document.getElementById('input-pw');
        const pwCheckInput = document.getElementById('input-pw-check');
        const msgDiv = document.getElementById('pw-match-message');

        if (/[^a-zA-Z0-9]/.test(this.value)) {
            alert('영문자와 숫자만 입력 가능합니다.');
            this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
            return;
        }

        if (msgDiv) {
            if (pwCheckInput.value === '') {
                msgDiv.innerText = '';
            } else if (pwInput.value === pwCheckInput.value) {
                msgDiv.innerText = '비밀번호가 일치합니다.';
                msgDiv.style.color = '#007bff';
            } else {
                msgDiv.innerText = '비밀번호가 일치하지 않습니다.';
                msgDiv.style.color = '#ff0000';
            }
        }
    }

    function handleSubmit() {
        const pw = document.getElementById('input-pw').value;
        const pwCheck = document.getElementById('input-pw-check').value;
        const email = document.getElementById('input-email').value;
        const nickname = document.getElementById('input-nickname').value;
        
        if (!email || !nickname) {
            alert('닉네임과 이메일은 필수 입력 사항입니다.');
            return;
        }

        if (pw || pwCheck) {
            if (pw !== pwCheck) {
                alert('새 비밀번호가 일치하지 않습니다.');
                return;
            }
            localStorage.setItem('userPW', pw);
        }

        const userInfo = {
            email: email,
            nickname: nickname
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        alert('회원 정보가 수정되었습니다.');
        window.location.href = 'index.html'; 
    }

    createForm();
});