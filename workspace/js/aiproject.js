document.addEventListener('DOMContentLoaded', function() {
    
    // 변수 선언 프로그램에서 참조하는 요소를 미리탐색
    const layout = document.getElementById('layout');                   // 레이아웃 탐색
    const menubar = document.getElementById('hamburger-icon');    // 메뉴바 버튼 탐색
    
    // 설정창 관련 요소
    const settingsBtn = document.getElementById('settings-open-btn'); 
    const settingsBox = document.getElementById('settings-box');
    
    // 설정 내부 컨트롤 요소
    const boxClose = document.getElementById('box-close');
    const cancelBtn = document.querySelector('.btn-cancel');
    const saveBtn = document.querySelector('.btn-save');
    const overlay = document.querySelector('.box-overlay');

    /* [유효성 검사 A]  */
    if (!menubar || !layout) {
        console.warn('필수 레이아웃 요소를 찾을 수 없습니다.');
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

    // 3. 설정 박스 제어 로직 

    /* [유효성 검사 B] 설정창 열기 함수 */
    const openSettings = () => {
        if (settingsBox && settingsBox.classList.contains('box-hidden')) {
            settingsBox.classList.remove('box-hidden');
        }
    };

    /* [유효성 검사 C] 설정창 닫기 함수 */
    const closeSettings = () => {
        if (settingsBox && !settingsBox.classList.contains('box-hidden')) {
            settingsBox.classList.add('box-hidden');
        }
    };

    // --- 4. 이벤트 리스너 연결 (안전한 참조 검사 포함)

    // 열기 버튼 클릭 시
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault(); // 버튼의 기본 동작 방지
            openSettings();
        });
    }

    // 닫기 관련 요소들 (X 버튼, 취소 버튼, 배경 클릭)
    if (boxClose) boxClose.addEventListener('click', closeSettings);
    if (cancelBtn) cancelBtn.addEventListener('click', closeSettings);
    if (overlay) overlay.addEventListener('click', closeSettings);

    // 저장 버튼 클릭 시
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            closeSettings(); 
        });
    }

    // [참고] ESC 키를 눌렀을 때 설정창 닫기 (사용자 편의성 추가)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSettings();
    });
});