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

document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const input = document.getElementById("input");

  if (!chatForm || !input) return;

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = input.value.trim();
    if (!query) return;

    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];

    const exists = history.some(item => item.question === query);
    if (!exists) {
      history.push({
        id: Date.now().toString(),
        question: query,
        createdAt: Date.now()
      });
      localStorage.setItem("chatHistory", JSON.stringify(history));
      renderHistory(); // result.js에 있는 함수 호출
    }

    input.value = "";
  });
});
