document.addEventListener('DOMContentLoaded', () => {
    // 1. 초기 설정 및 스토리지 판단
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('loggedInUserId');
    const storage = isLoggedIn ? localStorage : sessionStorage;

    const chatContainer = document.getElementById('chatContainer');
    const historyList = document.querySelector('.historyList');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('input');
    const newChatBtn = document.getElementById('new-chat-btn');

    const getRoomKey = () => isLoggedIn ? `chatRooms_user_${userId}` : 'chatRooms_guest';
    const getCurKey = () => isLoggedIn ? `currentRoom_user_${userId}` : 'currentRoom_guest';
    const getHistKey = (id) => isLoggedIn ? `chatHistory_user_${userId}_${id}` : `chatHistory_guest_${id}`;

    // 답변 데이터베이스
    const responses = {
        history: `AI 포털 사이트는 인공지능 기술의 발전과 인터넷 포털 서비스의 결합으로 자연스럽게 등장했으며, 특정 시점에 '최초의 AI 포털'이 명확하게 정의되지는 않습니다. 대신, 기존의 포털들이 AI 기술을 점진적으로 도입하며 발전해 왔습니다.\n\n발전 과정\n1. 초기 인터넷 포털 (1990년대 중반): 야후, 라이코스 등 초기 포털은 디렉터리 기반 검색이나 키워드 검색을 제공하며 인터넷 정보의 관문 역할을 했습니다.\n2. 검색 엔진의 발전과 AI 요소 도입 (2000년대 이후): 구글이 혁신적인 검색 알고리즘으로 시장을 장악한 이후, 포털은 사용자 맞춤형 서비스와 개인화를 위해 머신러닝 기술을 도입하기 시작했습니다.\n3. 생성형 AI 시대 (2020년대 이후): 챗GPT, 구글 바드(현 Gemini), 네이버의 CLOVA(클로바)나 Q: 등 대규모 언어 모델(LLM) 기반의 생성형 AI 기술이 등장하면서, 포털 사이트는 AI를 검색 결과에 직접 통합하거나 대화형 서비스를 제공하기 시작했습니다.`,
        
        estsoft: `ESTsoft(이스트소프트)는 1993년 설립된 대한민국 소프트웨어 개발 기업으로, PC 유틸리티 소프트웨어부터 온라인 게임, 그리고 최근 AI(인공지능) 서비스까지 폭넓은 분야에서 활동하고 있습니다.\n\n📌 창립과 초창기\n- 설립: 1993년 10월 2일, 응용 소프트웨어 개발 기업으로 시작했습니다.\n\n🧰 ALTools 시리즈와 대중적 성공\n2000년대 들어 "ALTools" 브랜드(ALZip, ALFTP, ALSee 등)를 출시하며 "국민 유틸리티"로 자리매김했습니다.\n\n🤖 AI 중심으로의 전환 (2020년대 ~)\n최근 Perso AI(AI 더빙), Alan(AI 검색 엔진) 등 실용적 AI 서비스를 선보이며 AI 전문 기업으로 도약하고 있습니다.`,

        recruit: `좋아, 실제로 입사 준비에 도움이 되게 정리해줄게.\n\nESTsoft는 요즘 AI·플랫폼 중심 IT 기업이라서, 단순 코딩 실력 말고도 “회사 방향성에 맞는 준비”가 중요해.\n아래는 신입 / 경력 공통 + 직무별 + 실전 준비 로드맵까지 전부 포함한 정리야.\n\n✅ 1. ESTsoft가 원하는 인재 방향\nESTsoft는 최근 몇 년간 AI 중심 기업으로 완전히 방향을 틀었어. 그래서 공통적으로 보는 건 아래 4가지야.\n🔹 ① 문제 해결 중심 사고\n🔹 ② 빠른 학습 능력\n🔹 ③ 협업 능력 (진짜 중요)\n🔹 ④ 실사용 가능한 결과물\n\n✅ 2. 직무별 준비 사항\n🧑‍💻 백엔드: Java/Spring Boot, Python, AWS, Docker\n🖥️ 프론트엔드: React, Next.js, 상태관리, Figma\n🤖 AI/데이터: LLM 활용, RAG 구조 이해, Vector DB\n\n✅ 3. 공통 필수 준비물\n📄 이력서: 사용 기술 + 결과 위주\n📂 포트폴리오: GitHub 필수, README 상세 작성\n🧠 기술 면접: 객체지향, REST API, 트랜잭션, AI 기초개념\n\n✅ 4. 채용 프로세스\n서류 ➔ 과제/코테 ➔ 기술 면접 ➔ 인성 면접 ➔ 합격\n\n🔥 정리 한 줄\nESTsoft는 “코딩 잘하는 사람”보다 “AI와 서비스 이해도가 높은 실전형 개발자”를 원함.\n\n원하면 다음 중에서 골라줘:\n👉 신입 기준 3개월 준비 로드맵\n👉 직무별 구체 로드맵\n👉 포트폴리오 주제 추천`
    };

    // 2. UI 보조 함수 (Vanilla JS)
    window.addChatBubble = function(text, type) {
        if (!chatContainer) return;
        const div = document.createElement('div');
        div.className = `chat-bubble ${type}`;
        div.innerHTML = text.replace(/\n/g, '<br>');
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return div;
    };

    // 타이핑 효과 (한 글자씩 출력)
    function typingEffect(element, text, speed = 15) {
        let index = 0;
        return new Promise((resolve) => {
            function type() {
                if (index < text.length) {
                    const char = text.charAt(index);
                    if (char === '\n') {
                        element.innerHTML += '<br>';
                    } else {
                        element.innerHTML += char;
                    }
                    index++;
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    // 3. 채팅방 관리
    function renderRooms() {
        if (!historyList) return;
        historyList.innerHTML = '';
        const rooms = JSON.parse(storage.getItem(getRoomKey())) || [];
        const currentId = storage.getItem(getCurKey());
        rooms.forEach(room => {
            const li = document.createElement('li');
            li.className = `history-item ${room.id === currentId ? 'active' : ''}`;
            li.dataset.id = room.id;
            li.innerHTML = `
                <span class="chat-title">${room.title}</span>
                <button type="button" class="chat-more-btn">⋯</button>
                <div class="chat-menu">
                    <button type="button" class="rename-btn">이름 변경</button>
                    <button type="button" class="delete-btn">삭제</button>
                </div>`;
            historyList.appendChild(li);
        });
    }

    function createRoom(title = '새 대화') {
        const rooms = JSON.parse(storage.getItem(getRoomKey())) || [];
        const roomId = 'room_' + Date.now();
        rooms.unshift({ id: roomId, title: title.substring(0, 15) });
        storage.setItem(getRoomKey(), JSON.stringify(rooms));
        storage.setItem(getCurKey(), roomId);
        chatContainer.innerHTML = '';
        renderRooms();
        return roomId;
    }

    function openRoom(id) {
        storage.setItem(getCurKey(), id);
        chatContainer.innerHTML = '';
        const history = JSON.parse(storage.getItem(getHistKey(id))) || [];
        history.forEach(msg => window.addChatBubble(msg.text, msg.type));
        renderRooms();
    }

    function saveMsg(id, text, type) {
        const key = getHistKey(id);
        const history = JSON.parse(storage.getItem(key)) || [];
        history.push({ text, type, time: Date.now() });
        storage.setItem(key, JSON.stringify(history));
        // 첫 메시지일 경우 채팅방 제목 업데이트
        if (type === 'user' && history.length === 1) {
            let rooms = JSON.parse(storage.getItem(getRoomKey()));
            const idx = rooms.findIndex(r => r.id === id);
            if (idx !== -1) {
                rooms[idx].title = text.substring(0, 15);
                storage.setItem(getRoomKey(), JSON.stringify(rooms));
                renderRooms();
            }
        }
    }

    // 4. 메시지 핸들러 (비동기 타이핑 포함)
    async function handleSendMessage(text) {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        let curId = storage.getItem(getCurKey());
        if (!curId) curId = createRoom(trimmedText);

        window.addChatBubble(trimmedText, 'user');
        saveMsg(curId, trimmedText, 'user');

        setTimeout(async () => {
            let aiAnswer = "죄송해요 아직 웹에서 검색중입니다";
            const cleanText = trimmedText.replace(/\s/g, '').toLowerCase();

            // 키워드 분기
            if (cleanText.includes("ai포털사이트의역사") || cleanText.includes("ai포털사이트역사")) {
                aiAnswer = responses.history;
            } else if (cleanText.includes("estsoft역사") || cleanText.includes("이스트소프트역사")) {
                aiAnswer = responses.estsoft;
            } else if (cleanText.includes("est소프트입사") || cleanText.includes("이스트소프트입사") || cleanText.includes("입사하기위해")) {
                aiAnswer = responses.recruit;
            }

            const bubble = window.addChatBubble("", 'ai');
            await typingEffect(bubble, aiAnswer, 15); // 타이핑 속도 15ms
            saveMsg(curId, aiAnswer, 'ai');
        }, 600);
    }

    // 엔터키 및 폼 전송 이벤트
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(input.value);
            input.value = '';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSendMessage(input.value);
        input.value = '';
    });

    if (newChatBtn) newChatBtn.onclick = () => createRoom();

    // 5. 초기 실행 (URL 쿼리 처리)
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
        window.history.replaceState({}, '', location.pathname);
        handleSendMessage(query);
    } else {
        const last = storage.getItem(getCurKey());
        last ? openRoom(last) : renderRooms();
    }
    
    // 메뉴/삭제 등 기타 클릭 이벤트 (기존 로직 유지)
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.history-item');
        const moreBtn = e.target.closest('.chat-more-btn');
        const menuBtn = e.target.closest('.chat-menu button');
        const allMenus = document.querySelectorAll('.chat-menu');

        if (moreBtn) {
            e.stopPropagation();
            const targetMenu = moreBtn.nextElementSibling;
            allMenus.forEach(m => { if(m !== targetMenu) m.style.display = 'none'; });
            targetMenu.style.display = targetMenu.style.display === 'block' ? 'none' : 'block';
        } else if (menuBtn && item) {
            e.stopPropagation();
            const id = item.dataset.id;
            if (menuBtn.classList.contains('delete-btn')) {
                if (confirm("삭제하시겠습니까?")) {
                    let rooms = JSON.parse(storage.getItem(getRoomKey())).filter(x => x.id !== id);
                    storage.setItem(getRoomKey(), JSON.stringify(rooms));
                    storage.removeItem(getHistKey(id));
                    if (storage.getItem(getCurKey()) === id) {
                        storage.removeItem(getCurKey());
                        chatContainer.innerHTML = '';
                    }
                    renderRooms();
                }
            }
            menuBtn.parentElement.style.display = 'none';
        } else {
            allMenus.forEach(m => m.style.display = 'none');
            if (item) openRoom(item.dataset.id);
        }
    });
});