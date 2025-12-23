document.addEventListener('DOMContentLoaded', () => {
    // 초기 히스토리 렌더링
    renderHistory();

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

        renderHistory();

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
        const historyData = JSON.parse(localStorage.getItem('chatHistory')) || [];

        const exists = historyData.some(item => item.text === text);
        if (exists) return;

        historyData.unshift({
            id: Date.now(),
            text
        });

        localStorage.setItem('chatHistory', JSON.stringify(historyData));
        renderHistory(); // 데이터 추가 후 리스트 즉시 갱신
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});

// 히스토리 렌더링 함수
function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    const historyData = JSON.parse(localStorage.getItem('chatHistory')) || [];
    historyList.innerHTML = ''; // ⭐ 중복 방지 핵심

    historyData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.text.substring(0, 10);
        historyList.appendChild(li);
    });
}