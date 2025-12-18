document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    const historyList = document.getElementById('historyList');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('input');

    // index에서 넘어온 첫 질문 
    const params = new URLSearchParams(window.location.search);
    const firstQuery = params.get('query');

    if (firstQuery) {
        addUserMessage(firstQuery);
        addAiMessage('대답');
        addHistory(firstQuery);

        // URL 정리 → 새로고침 시 중복 방지
        history.replaceState({}, '', location.pathname);
    }

    // 결과 페이지에서 입력 시
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        addUserMessage(text);
        addAiMessage('대답');
        addHistory(text);

        input.value = '';
    });

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
        li.textContent = text.substring(0, 10);
        historyList.prepend(li);
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
