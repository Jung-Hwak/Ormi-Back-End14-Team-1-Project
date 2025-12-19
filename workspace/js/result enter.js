// enter.js
document.addEventListener('DOMContentLoaded', () => {
 
  const form =
    document.querySelector('#chatForm') ||
    document.querySelector('form');

  const textarea =
    document.querySelector('#input') ||
    document.querySelector('textarea');

  if (!form || !textarea) {
    console.warn('Enter.js: form 또는 textarea 없음');
    return;
  }

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
});
