document.addEventListener('DOMContentLoaded', () => {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('loggedInUserId');
    const storage = isLoggedIn ? localStorage : sessionStorage;

    const historyList = document.getElementById('historyList');
    const chatContainer = document.getElementById('chatContainer');
    const newChatBtn = document.getElementById('new-chat-btn');

    function roomListKey() {
        return isLoggedIn && userId
            ? `chatRooms_user_${userId}`
            : 'chatRooms_guest';
    }

    function currentRoomKey() {
        return isLoggedIn && userId
            ? `currentRoom_user_${userId}`
            : 'currentRoom_guest';
    }

    function chatKey(roomId) {
        return isLoggedIn && userId
            ? `chatHistory_user_${userId}_${roomId}`
            : `chatHistory_guest_${roomId}`;
    }

    function createRoom(title = '새 대화') {
        const rooms = JSON.parse(storage.getItem(roomListKey())) || [];
        const roomId = 'room_' + Date.now();

        rooms.unshift({ id: roomId, title });
        storage.setItem(roomListKey(), JSON.stringify(rooms));
        storage.setItem(currentRoomKey(), roomId);

        chatContainer.innerHTML = '';
        renderRooms();
    }

    function renderRooms() {
        if (!historyList) return;
        historyList.innerHTML = '';
        const rooms = JSON.parse(storage.getItem(roomListKey())) || [];
        const current = storage.getItem(currentRoomKey());

        rooms.forEach(room => {
            const li = document.createElement('li');
            li.textContent = room.title.substring(0, 10);
            if (room.id === current) li.classList.add('active');

            li.addEventListener('click', () => openRoom(room.id));
            historyList.appendChild(li);
        });
    }

    function openRoom(roomId) {
        storage.setItem(currentRoomKey(), roomId);
        chatContainer.innerHTML = '';

        const chats = JSON.parse(storage.getItem(chatKey(roomId))) || [];
        chats.forEach(chat => {
            // window.addChatBubble는 채팅창에 말풍선을 추가하는 별도 함수가 있다고 가정합니다.
            if (typeof window.addChatBubble === 'function') {
                window.addChatBubble(chat.text, chat.type);
            }
        });

        renderRooms();
    }

    /* [중요] 결과 페이지의 새 채팅 버튼 클릭 이벤트 */
    if (newChatBtn) {
        newChatBtn.addEventListener('click', (e) => {
            // aiportal.js에 설정된 index.html 이동 로직이 실행되지 않도록 차단
            e.stopImmediatePropagation(); 
            
            // 결과 페이지 전용 로직: 새 방 생성
            createRoom();
        });
    }

    // 최초 로딩 시
    if (!storage.getItem(currentRoomKey())) {
        createRoom();
    } else {
        openRoom(storage.getItem(currentRoomKey()));
    }
});