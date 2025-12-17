document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    const historyList = document.getElementById('chatHistoryList');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('input');

    /* URL 파라미터로 넘어온 첫 질문 */
    const params = new URLSearchParams(window.location.search);
    const firstQuery = params.get('query');

    if (firstQuery) {
        addUserMessage(firstQuery);
        addAiMessage('대답');
        addHistory(firstQuery);
    }

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-bubble user';
        div.textContent = text;
        chatContainer.appendChild(div);
        scrollToBottom();
    }

    function addAiMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-bubble ai';
        div.textContent = text;
        chatContainer.appendChild(div);
        scrollToBottom();
    }

    function addHistory(text) {
        const li = document.createElement('li');

        li.innerHTML = `
            <span class="chat-log"></span>
            ${text.substring(0, 10)}
            <span class="chat-list">${text}</span>
        `;

        historyList.prepend(li);
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    /* 전송 */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        addUserMessage(text);
        addAiMessage('대답');
        addHistory(text);

        input.value = '';
    });

    /* Enter 전송 / Shift+Enter 줄바꿈 */
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.requestSubmit();
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {

  const chatContainer = document.getElementById('chatContainer');
  const chatForm = document.getElementById('chatForm');
  const input = document.getElementById('input');

  /* ===============================
     1. URL 파라미터 처리
  =============================== */
  const params = new URLSearchParams(window.location.search);
  const query = params.get('query');

  if (query) {
    addUserMessage(query);
    addAiMessage('대답');

    addSidebarHistory(query);
    addBottomSpacing();
  }

  /* ===============================
     2. 채팅 함수
  =============================== */
  function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'chat-bubble user';
    div.textContent = text;
    chatContainer.appendChild(div);
    scrollToBottom();
  }

  function addAiMessage(text) {
    const div = document.createElement('div');
    div.className = 'chat-bubble ai';
    div.textContent = text;
    chatContainer.appendChild(div);
    scrollToBottom();
  }

  function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  /* ===============================
     3. 왼쪽 사이드바 추가
  =============================== */
  function addSidebarHistory(text) {
    const ul = document.querySelector('#menu ul');
    if (!ul) return;

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="chat-log"></span>
      ${text.slice(0, 10)}
      <span class="chat-list">${text}</span>
    `;
    ul.prepend(li);
  }

  /* ===============================
     4. 검색창 높이만큼 간격 확보
  =============================== */
  function addBottomSpacing() {
    const searchBox = document.querySelector('.search-input-container');
    if (!searchBox) return;

    const spacer = document.createElement('div');
    spacer.style.height = searchBox.offsetHeight + 'px';
    chatContainer.appendChild(spacer);
  }

  /* ===============================
     5. 전송 처리
  =============================== */
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    addAiMessage('대답');
    addSidebarHistory(text);

    input.value = '';
  });

});
