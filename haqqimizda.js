
document.addEventListener('DOMContentLoaded', function() {
    updateUserDisplay();
});


function updateUserDisplay() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const hesabLink = document.querySelector('a[href="hesab.html"]');
    
    if (hesabLink && currentUser) {
        hesabLink.textContent = `👤 ${currentUser.name}`;
        hesabLink.style.color = '#f4f4f4';
        hesabLink.style.fontWeight = 'bold';
    }
}


function loadCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        try {
            const currentUser = JSON.parse(userData);
            updateUserDisplayForUser(currentUser);
        } catch (e) {
            localStorage.removeItem('currentUser');
        }
    }
}

function updateUserDisplayForUser(user) {
    const hesabLink = document.querySelector('a[href="hesab.html"]');
    if (hesabLink && user) {
        hesabLink.textContent = `👤 ${user.name}`;
        hesabLink.style.color = '#00B7B5';
        hesabLink.style.fontWeight = 'bold';
    }
}