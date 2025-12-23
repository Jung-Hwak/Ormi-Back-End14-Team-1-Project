document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector(
    'form[action="result.html"] textarea'
  );
  const form = document.querySelector(
    'form[action="result.html"]'
  );

  if (!textarea || !form) return;

    form.addEventListener('submit', () => {
    const text = textarea.value.trim();
    if (!text) return;

    const history = JSON.parse(localStorage.getItem('chatHistory')) || [];

    const exists = history.some(item => item.text === text);
    if (!exists) {
      history.unshift({
        id: Date.now(),
        text
      });
      localStorage.setItem('chatHistory', JSON.stringify(history));
    }
  });


  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();   
      form.submit();        
    }
  });
});


 