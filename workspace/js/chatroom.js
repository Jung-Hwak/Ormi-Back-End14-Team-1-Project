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
            window.addChatBubble(chat.text, chat.type);
        });

        renderRooms();
    }

    newChatBtn.addEventListener('click', () => {
        createRoom();
    });

    // 최초 로딩 시
    if (!storage.getItem(currentRoomKey())) {
        createRoom();
    } else {
        openRoom(storage.getItem(currentRoomKey()));
    }
});
