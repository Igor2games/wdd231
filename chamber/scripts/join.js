document.addEventListener('DOMContentLoaded', function () {
    // Open modal links (each link should have data-modal="modal-id")
    document.querySelectorAll('.open-modal').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.dataset.modal;
            const dlg = document.getElementById(id);
            if (!dlg) return;
            // ensure the dialog element itself is *not* wrapping other page content
            if (typeof dlg.showModal === 'function') {
                dlg.showModal();
            } else {
                // fallback: set open attribute (CSS above handles display)
                dlg.setAttribute('open', '');
            }
            // move focus to the close button for accessibility
            const close = dlg.querySelector('.close-modal');
            if (close) close.focus();
        });
    });

    // Close handlers
    document.addEventListener('click', function (e) {
        if (e.target.matches('.close-modal')) {
            const dlg = e.target.closest('dialog');
            if (!dlg) return;
            if (typeof dlg.close === 'function') dlg.close();
            else dlg.removeAttribute('open');
        }
    });

    // Close when clicking outside the modal-content (works with showModal and fallback)
    document.querySelectorAll('dialog').forEach(dlg => {
        dlg.addEventListener('click', function (e) {
            const rect = dlg.getBoundingClientRect();
            // click outside the centered box
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                if (typeof dlg.close === 'function') dlg.close();
                else dlg.removeAttribute('open');
            }
        });

        // Esc key (native cancel closes dialog when using showModal)
        dlg.addEventListener('cancel', function (ev) {
            // allow native close, no extra action needed
        });
    });
});