document.addEventListener('DOMContentLoaded', () => {

    // 로그인 여부 판단 (기존 로그인 코드 기준)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('loggedInUserId');

    // 로그인 / 비로그인 저장소 분리
    const storage = isLoggedIn ? localStorage : sessionStorage;

    // 채팅 키 분리 (유저별 / 게스트)
    function getChatKey() {
        if (isLoggedIn && userId) {
            return `chatHistory_user_${userId}`;
        }
        return 'chatHistory_guest';
    }

    const chatKey = getChatKey();

    const roomKey = isLoggedIn && userId
  ? `chatRoom_user_${userId}`
  : 'chatRoom_guest';


    const chatContainer = document.getElementById('chatContainer');
    const historyList = document.getElementById('historyList');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('input');

    // -----------------------------
    // 기존 채팅 불러오기
    // -----------------------------
    loadChats();
    renderHistory();

    // -----------------------------
    // index에서 넘어온 첫 질문 (1회만)
    // -----------------------------
    const params = new URLSearchParams(window.location.search);
    const firstQuery = params.get('query');

    if (firstQuery && !sessionStorage.getItem('firstQueryUsed')) {
        sessionStorage.setItem('firstQueryUsed', 'true');

        addUserMessage(firstQuery);
        addAiMessage('대답');
        saveChat(firstQuery, 'user');
        saveChat('대답', 'ai');


        if (!storage.getItem(roomKey)) {
             storage.setItem(roomKey, firstQuery);
            }


        renderHistory();
        history.replaceState({}, '', location.pathname);
    }

    // -----------------------------
    // 채팅 입력
    // -----------------------------
    form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    addAiMessage('대답');

    const roomId = (localStorage.getItem('isLoggedIn') === 'true')
        ? localStorage.getItem(`currentRoom_user_${localStorage.getItem('loggedInUserId')}`)
        : sessionStorage.getItem('currentRoom_guest');

    if (!roomId) return;

    const key = (localStorage.getItem('isLoggedIn') === 'true')
        ? `chatHistory_user_${localStorage.getItem('loggedInUserId')}_${roomId}`
        : `chatHistory_guest_${roomId}`;

    const store = localStorage.getItem('isLoggedIn') === 'true'
        ? localStorage
        : sessionStorage;

    const chats = JSON.parse(store.getItem(key)) || [];

    chats.push({ text, type: 'user' });
    chats.push({ text: '대답', type: 'ai' });

    store.setItem(key, JSON.stringify(chats));

    if (!storage.getItem(roomKey)) {
        storage.setItem(roomKey, text);
        renderHistory();
    }

    input.value = '';
});


    // -----------------------------
    // 메시지 UI
    // -----------------------------
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

    // -----------------------------
    // 채팅 저장
    // -----------------------------
    function saveChat(text, type) {
        const chats = JSON.parse(storage.getItem(chatKey)) || [];
        chats.push({ text, type });
        storage.setItem(chatKey, JSON.stringify(chats));
    }

    // -----------------------------
    // 채팅 불러오기
    // -----------------------------
    function loadChats() {
        const chats = JSON.parse(storage.getItem(chatKey)) || [];
        chats.forEach(chat => {
            if (chat.type === 'user') {
                addUserMessage(chat.text);
            } else {
                addAiMessage(chat.text);
            }
        });
    }

    // -----------------------------
    // 왼쪽 히스토리 렌더링
    // -----------------------------
    function renderHistory() {
    if (!historyList) return;

    historyList.innerHTML = '';

    const title = storage.getItem(roomKey);
    if (!title) return;

    const li = document.createElement('li');
    li.textContent = title.substring(0, 10);
    historyList.appendChild(li);
}

});


window.addChatBubble = function (text, type) {
    const div = document.createElement('div');
    div.className = `chat-bubble ${type}`;
    div.textContent = text;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
};
