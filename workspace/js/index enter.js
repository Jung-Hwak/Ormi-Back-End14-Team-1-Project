document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector(
    'form[action="result.html"] textarea'
  );
  const form = document.querySelector(
    'form[action="result.html"]'
  );

  if (!textarea || !form) return;

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();   
      form.submit();        
    }
  });
});


