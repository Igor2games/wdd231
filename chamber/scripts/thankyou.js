document.addEventListener('DOMContentLoaded', function () {
    try {
        const params = new URLSearchParams(location.search);

        function safe(text) {
            if (!text) return '';
            return String(text)
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#39;');
        }

        const map = {
            first: 'firstName',
            last: 'lastName',
            email: 'emailAddress',
            mobile: 'mobileNumber',
            organization: 'businessName',
            timestamp: 'ts'
        };

        Object.keys(map).forEach(key => {
            const el = document.getElementById(map[key]);
            if (!el) return;
            const val = params.get(key);
            el.textContent = val ? safe(val) : '[Not provided]';
        });
    } catch (err) {
        console.error('thankyou.js error:', err);
    }
});