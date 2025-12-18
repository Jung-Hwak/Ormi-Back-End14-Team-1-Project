document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chatForm');
    const textarea = document.getElementById('input');

    if (!form || !textarea) return;

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.requestSubmit();
        }
    });
});
