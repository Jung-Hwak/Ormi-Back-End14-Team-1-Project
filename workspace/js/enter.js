// enter.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const textarea = document.querySelector('textarea');

  if (!form || !textarea) {
    console.error('form 또는 textarea를 찾을 수 없습니다.');
    return;
  }

  textarea.addEventListener('keydown', (e) => {
    // Enter만 누르면 전송
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();     // 줄바꿈 막기
      form.requestSubmit();  // submit 실행 (버튼 클릭과 동일)
    }
  });
});
 
    /* Enter 전송 / Shift+Enter 줄바꿈 */
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.requestSubmit();
        }
    });