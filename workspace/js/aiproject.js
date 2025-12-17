// 이벤트 핸들러 함수
document.addEventListener('DOMContentLoaded', function() {
    
    // 변수 선언 프로그램에서 참조하는 요소를 미리탐색
    const layout = document.getElementById('layout');                   // 레이아웃 탐색
    const menubar = document.getElementById('hamburger-icon');    // 메뉴바 버튼 탐색
    
    // 사이드바 너비 (CSS #menu와 동일해야 함)
    const sidebarWidth = 250;
    const INTERVAL = 300;

    
    // 유효성 검사 필수 요소인 menubar, layout 이없으면 작동하지 않음
    if (!menubar || !layout) {
        return;
    }
    
    /* 사이드바를 숨기는 함수 */
    function hideSidebar() {
        layout.style.marginLeft = `-${sidebarWidth}px`; 
    }
    
    /* 사이드바를 나타내는 함수*/
    function showSidebar() {
        layout.style.marginLeft = '0px'; 
    }

    // 2. 메뉴 바(햄버거) 아이콘 클릭 이벤트 리스너 설정
    menubar.addEventListener('click', function() {
        
        const currentMargin = layout.style.marginLeft;

        if (currentMargin === `-${sidebarWidth}px`) {

            // 현재 숨겨져 있다면 보이게 만듬
            showSidebar();

        } else {
            // 현재 보이는 상태 라면 숨김.
            hideSidebar();
        }
    }, INTERVAL);
});