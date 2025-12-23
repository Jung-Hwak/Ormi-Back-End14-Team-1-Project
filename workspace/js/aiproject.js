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

    /* [추가] 테마 설정을 위한 라디오 버튼 탐색 */
    const lightThemeRadio = document.querySelector('input[name="theme"][value="light"]');
    const darkThemeRadio = document.querySelector('input[name="theme"][value="dark"]');

    /* [신규] 페이지 로드 시 저장된 테마 불러오기 */
    const savedTheme = localStorage.getItem('theme'); // 'dark' 또는 'light' 저장된 값 가져오기
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkThemeRadio) darkThemeRadio.checked = true; // 설정창 라디오 버튼 상태 업데이트
    } else {
        document.body.classList.remove('dark-mode');
        if (lightThemeRadio) lightThemeRadio.checked = true;
    }

    /* [유효성 검사 A] 필수 레이아웃 요소 확인 */
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

    // 설정 열기 버튼 클릭 시
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSettings();
        });
    }

    // 닫기 관련 요소들 연결 (X 버튼, 취소 버튼, 배경 오버레이)
    if (boxClose) boxClose.addEventListener('click', closeSettings);
    if (cancelBtn) cancelBtn.addEventListener('click', closeSettings);
    if (overlay) overlay.addEventListener('click', closeSettings);

    // 저장 버튼 클릭 시
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            /* [수정] 테마 변경 및 로컬 스토리지 저장 로직 */
            if (darkThemeRadio && darkThemeRadio.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark'); // 브라우저에 'dark' 저장
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light'); // 브라우저에 'light' 저장
            }

            // alert('설정이 저장되었습니다.'); 
            closeSettings(); 
        });
    }

    /* 4. 사용자 편의 기능 */
    /* ESC 키를 눌렀을 때 열려있던 설정창을 닫아줍니다.*/
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsBox && !settingsBox.classList.contains('box-hidden')) {
            closeSettings();
        }
    });
});