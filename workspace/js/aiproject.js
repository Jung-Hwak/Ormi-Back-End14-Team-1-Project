document.addEventListener('DOMContentLoaded', function() {
    // 1. 변수 선언 프로그램에서 참조하는 요소를 미리 탐색
    const layout = document.getElementById('layout');          // 전체 레이아웃
    const menubar = document.getElementById('hamburger-icon'); // 사이드바 토글 버튼
    
    const settingsBox = document.getElementById('settings-box');      // 설정창 컨테이너
    const settingsBtn = document.getElementById('settings-open-btn'); // 설정 열기 버튼
    
    // 설정창 내부 컨트롤 요소 (ID 기반 탐색)
    const boxClose = document.getElementById('box-close');      // 상단 X 버튼
    const overlay = document.getElementById('setting-overlay'); // 반투명 배경
    const saveBtn = document.getElementById('save');            // 저장 버튼
    const cancelBtn = document.getElementById('cancel');        // 취소 버튼

    /* [추가] 로그인 및 프로필 관련 요소 탐색 */
    const userLink = document.getElementById('user-link');
    const profileBox = document.getElementById('profile-box');
    const userNicknameDisplay = document.getElementById('user-nickname-display');
    const logoutBtn = document.getElementById('logout-btn');

    /* [추가] 회원 정보 수정 버튼 탐색 */
    const editProfileBtn = document.querySelector('.profile-btn:not(.logout)');

    /* [추가] 새 채팅 버튼 탐색 */
    const newChatBtn = document.getElementById('new-chat-btn');

    /* [추가] 도움말 및 고객센터 이동을 위한 요소 탐색 */
    const helpBtn = document.getElementById('help');       // 도움말 버튼
    const supportBtn = document.getElementById('support'); // 고객센터 버튼

    /* [추가] 테마 설정을 위한 라디오 버튼 탐색 */
    const lightThemeRadio = document.querySelector('input[name="theme"][value="light"]');
    const darkThemeRadio = document.querySelector('input[name="theme"][value="dark"]');

    /* [신규] 페이지 로드 시 저장된 테마 불러오기 */
    const savedTheme = localStorage.getItem('theme'); 
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkThemeRadio) darkThemeRadio.checked = true; 
    } else {
        document.body.classList.remove('dark-mode');
        if (lightThemeRadio) lightThemeRadio.checked = true;
    }

    /* [수정] 로그인 상태 확인 및 드롭다운 제어 로직 */
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // 사용자 아이콘(로그인 링크) 클릭 이벤트
    if (userLink) {
        userLink.addEventListener('click', (e) => {
            if (isLoggedIn) {
                e.preventDefault(); 
                if (profileBox) {
                    profileBox.classList.toggle('profile-hidden'); 
                }
            } else {
                return; 
            }
        });
    }

    // 로그인 상태일 때 초기 화면 세팅
    if (isLoggedIn) {
        const savedInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userNicknameDisplay) {
            userNicknameDisplay.innerText = savedInfo ? savedInfo.nickname : "윤현호";
        }

        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                window.location.href = 'editinfo.html'; 
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('loggedInUserId');
                alert('로그아웃 되었습니다.');
                window.location.href = 'index.html'; 
            });
        }
    }

    /* [수정] 새 채팅 버튼 클릭 시 기본 동작 (결과 페이지가 아닐 때만 작동) */
    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            // 현재 페이지가 결과 페이지가 아닐 때만 index.html로 이동
            if (!window.location.pathname.includes('result.html')) {
                window.location.href = 'index.html'; 
            }
        });
    }

    // 드롭다운 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (profileBox && !profileBox.contains(e.target) && !userLink.contains(e.target)) {
            profileBox.classList.add('profile-hidden');
        }
    });

    if (!layout || !menubar) {
        console.error('에러 : 필수 레이아웃 요소를 찾을 수 없습니다.');
        return; 
    }

    // 2. 사이드바 토글 기능 
    menubar.addEventListener('click', function() {
        const isInactive = layout.classList.contains('inactive');
        if (isInactive) {
            layout.classList.replace('inactive', 'active');
        } else {
            layout.classList.replace('active', 'inactive');
        }
    });

    /* 3. 설정 박스 제어 */
    const openSettings = () => {
        if (settingsBox && settingsBox.classList.contains('box-hidden')) {
            settingsBox.classList.remove('box-hidden');
        }
    };

    const closeSettings = () => {
        if (settingsBox && !settingsBox.classList.contains('box-hidden')) {
            settingsBox.classList.add('box-hidden');
        }
    };

    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSettings();
        });
    }

    if (boxClose) boxClose.addEventListener('click', closeSettings);
    if (cancelBtn) cancelBtn.addEventListener('click', closeSettings);
    if (overlay) overlay.addEventListener('click', closeSettings);

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            if (darkThemeRadio && darkThemeRadio.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark'); 
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light'); 
            }
            closeSettings(); 
        });
    }

    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            window.location.href = 'help.html'; 
        });
    }

    if (supportBtn) {
        supportBtn.addEventListener('click', () => {
            window.location.href = 'support.html'; 
        });
    }

    /* 4. 사용자 편의 기능 */
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsBox && !settingsBox.classList.contains('box-hidden')) {
            closeSettings();
        }
    });
});