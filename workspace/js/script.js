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
