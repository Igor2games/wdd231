document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || 'N/A';
    const email = params.get('email') || 'N/A';
    const reason = params.get('reason') || 'N/A';

    const displayArea = document.getElementById('form-data-display');
    if (displayArea) {
        displayArea.innerHTML = `
        <h2>Your Submitted Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reason for Joining:</strong> ${reason}</p>
      `;
    }
});
