
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.open-modal').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.dataset.modal;
            const dlg = document.getElementById(id);
            if (!dlg) return;
            if (typeof dlg.showModal === 'function') {
                try { dlg.showModal(); } catch (err) { dlg.setAttribute('open', ''); }
            } else {
                dlg.setAttribute('open', '');
            }
            const close = dlg.querySelector('.close-modal');
            if (close) close.focus();
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target.matches('.close-modal')) {
            const dlg = e.target.closest('dialog');
            if (!dlg) return;
            if (typeof dlg.close === 'function') dlg.close();
            else dlg.removeAttribute('open');
        }
    });

    document.querySelectorAll('dialog').forEach(dlg => {
        dlg.addEventListener('click', function (e) {
            const rect = dlg.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                if (typeof dlg.close === 'function') dlg.close();
                else dlg.removeAttribute('open');
            }
        });
        dlg.addEventListener('cancel', function () { });
    });
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = card.querySelector('.open-modal');
                if (link) {
                    e.preventDefault();
                    link.click();
                }
            }
        });
    });
    (function () {
        const hidden = document.getElementById('timestamp');
        if (!hidden) {
            console.warn('Timestamp input not found: #timestamp');
            return;
        }

        function pad(n) { return String(n).padStart(2, '0'); }
        function formatNoMs(dt) {
            return [
                dt.getFullYear(),
                pad(dt.getMonth() + 1),
                pad(dt.getDate())
            ].join('-') + ' ' + [
                pad(dt.getHours()),
                pad(dt.getMinutes()),
                pad(dt.getSeconds())
            ].join(':');
        }

        function setTimestamp() {
            hidden.value = formatNoMs(new Date());
        }

        setTimestamp();

        const refreshId = setInterval(setTimestamp, 30000);

        const form = document.getElementById('joinForm');
        if (form) {
            form.addEventListener('submit', function () {
                setTimestamp();
                clearInterval(refreshId);
            });
        } else {
            console.warn('Join form not found: #joinForm');
        }
    })();
});