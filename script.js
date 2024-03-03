document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', function() {
        const message = this.getAttribute('data-message');
        if (message) {
            alert(`Sending message: ${message}`); // Replace this with actual messaging logic
        } else {
            const action = this.getAttribute('data-action');
            if (action === 'turn-off-lights') {
                alert('Turning off the lights'); // Replace this with actual control logic
            }
        }
    });
});

function openContacts() {
    // This function should display the contacts interface
    // and handle the logic for making a phone call
    alert('Open contacts list'); // Placeholder
}
