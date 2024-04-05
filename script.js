document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            if (message) {
                fetch('http://127.0.0.1:3005/send-sms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ body: message, to: '+18777804236' }) // Adjust the number as needed
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            } else {
                const action = this.getAttribute('data-action');
                // Handle other actions
            }
        });
    });


function openContacts() {
    fetch('http://localhost:3005/contacts')
      .then(response => response.json())
      .then(contacts => {
        const contactsInterface = document.getElementById('contacts-interface');
        contactsInterface.innerHTML = ''; // Clear existing contacts
        contacts.forEach(contact => {
          const contactElement = document.createElement('button');
          contactElement.className = 'contact';
          contactElement.textContent = contact.name;
          contactElement.onclick = () => selectContact(contact);
          contactsInterface.appendChild(contactElement);
        });
        contactsInterface.style.display = 'block'; // Show the contacts interface
      })
      .catch(error => console.error('Error:', error));
  }

  function selectContact(contact) {
    //Store the slected contact for later or move to message selection
    console.log('Selected contact:', contact);
    openMessagesInterface(contact); //Proceed to message selection
  }  

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function setGradient() {
    let color1 = getRandomColor();
    let color2 = getRandomColor();
    let color3 = getRandomColor();
    document.getElementById('messageButton').style.background = `linear-gradient(45deg, ${color1}, ${color2}, ${color3})`;
    document.getElementById('settingButton').style.background = `linear-gradient(45deg, ${color3}, ${color2}, ${color1})`;
}
  
  setInterval(setGradient, 5000); // Change gradient every 5 seconds
  
  window.onload = setGradient; // Initial gradient setup
  

});