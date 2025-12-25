


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




document.addEventListener('DOMContentLoaded', function() {
    initProfilePage();
});

function initProfilePage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profileContainer = document.querySelector('.profile-container') || document.body;

    if (!currentUser) {
        showLoginModal();
    } else {
        loadUserProfile(currentUser, profileContainer);
    }
}

// Modal göstərmə funksiyası
function showLoginModal() {
    const modalHTML = `
        <div class="login-modal" id="loginModal">
            <div class="login-content">
                <span class="login-close" onclick="closeLoginModal()">&times;</span>
                <h2 id="modalTitle">Daxil ol</h2>
                
                <div id="loginForm">
                    <input type="email" id="loginEmail" placeholder="E-poçt" required>
                    <input type="password" id="loginPassword" placeholder="Şifrə" required>
                    <button onclick="loginUser()">Daxil ol</button>
                    <p style="text-align: center; margin-top: 15px; color: #666;">
                        Hesabınız yoxdur? 
                        <a href="#" onclick="showRegisterForm()" style="color: #00B7B5; font-weight: bold;">Qeydiyyatdan keç</a>
                    </p>
                </div>
                
                <div id="registerForm" style="display: none;">
                    <input type="text" id="registerName" placeholder="Ad Soyad" required>
                    <input type="email" id="registerEmail" placeholder="E-poçt" required>
                    <input type="password" id="registerPassword" placeholder="Şifrə" required>
                    <input type="password" id="registerConfirmPassword" placeholder="Şifrəni təsdiqlə" required>
                    <button onclick="registerUser()">Qeydiyyatdan keç</button>
                    <p style="text-align: center; margin-top: 15px; color: #666;">
                        Artıq hesabınız var? 
                        <a href="#" onclick="showLoginForm()" style="color: #00B7B5; font-weight: bold;">Daxil ol</a>
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.remove();
    }
    window.location.href = 'index.html';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Qeydiyyat';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Daxil ol';
}

function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!email || !password) {
        alert('⚠️ Bütün xanaları doldurun!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Bütün istifadəçilər:', users); // Debug
    console.log('Daxil edilən email:', email); // Debug
    console.log('Daxil edilən şifrə:', password); // Debug
    
    const user = users.find(u => u.email === email && u.password === password);
    console.log('Tapılan istifadəçi:', user); // Debug
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('✅ Uğurla daxil oldunuz!');
        location.reload();
    } else {
        alert('❌ E-poçt və ya şifrə yanlışdır!');
    }
}

function registerUser() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
    
    if (!name || !email || !password || !confirmPassword) {
        alert('⚠️ Bütün xanaları doldurun!');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('❌ Şifrələr uyğun gəlmir!');
        return;
    }
    
    if (password.length < 6) {
        alert('❌ Şifrə ən azı 6 simvoldan ibarət olmalıdır!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === email)) {
        alert('❌ Bu e-poçt artıq qeydiyyatdan keçib!');
        return;
    }
    
    const newUser = { 
        name: name, 
        email: email, 
        password: password 
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    console.log('Yeni istifadəçi qeydiyyatdan keçdi:', newUser); // Debug
    console.log('Bütün istifadəçilər:', users); // Debug
    
    alert('✅ Qeydiyyat uğurla tamamlandı!');
    location.reload();
}

function loadUserProfile(currentUser, container) {
    const userAds = JSON.parse(localStorage.getItem('userAds')) || {};
    const myAds = userAds[currentUser.email] || [];

    const profileHTML = `
        <div class="profile-header">
            <h1>👤 ${currentUser.name || currentUser.email}</h1>
            <button onclick="logout()" class="logout-btn">Çıxış</button>
        </div>
        
        <div class="profile-stats">
            <div class="stat-card">
                <h3>${myAds.length}</h3>
                <p>Aktiv elan</p>
            </div>
            <div class="stat-card">
                <h3>${myAds.filter(ad => ad.category === 'masin').length}</h3>
                <p>Maşın elanı</p>
            </div>
            <div class="stat-card">
                <h3>${myAds.filter(ad => ad.category !== 'masin').length}</h3>
                <p>Hissə elanı</p>
            </div>
        </div>

        <h2>📋 Mənim elanlarım</h2>
        <div class="user-ads-container" id="userAds">
            ${myAds.length === 0 ? 
                '<p class="no-ads">Hələ heç bir elan əlavə etməmisiniz. <a href="elan.html">Elan əlavə et</a></p>' : 
                myAds.map(ad => createAdCard(ad)).join('')
            }
        </div>
    `;

    container.innerHTML = profileHTML;

    document.querySelectorAll('.delete-ad-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const adId = parseInt(this.dataset.adId);
            deleteAd(adId);
        });
    });
}

function createAdCard(ad) {
    const kmDisplay = ad.category === 'masin' ? `<p>🛣️ Gedilən yol: ${ad.km} km</p>` : '';
    
    return `
        <div class="ad-card" data-category="${ad.category}">
            <img src="${ad.image}" alt="${ad.brand} ${ad.model}" onerror="this.src='https://via.placeholder.com/300x200?text=Şəkil+Yoxdur'">
            <div class="ad-info">
                <h3>${ad.brand} ${ad.model}</h3>
                <p class="ad-price">${ad.price} ₼</p>
                <p>📅 İl: ${ad.year}</p>
                ${kmDisplay}
                <p>📁 Kateqoriya: ${getCategoryName(ad.category)}</p>
                <p class="ad-date">Tarix: ${ad.date}</p>
                <button class="delete-ad-btn" data-ad-id="${ad.id}">🗑️ Sil</button>
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const names = {
        'masin': 'Maşın',
        'xarici': 'Xarici hissə',
        'daxili': 'Daxili hissə',
        'aksesuar': 'Aksesuar'
    };
    return names[category] || category;
}

function deleteAd(adId) {
    const confirmDelete = window.confirm('Bu elanı silmək istədiyinizdən əminsiniz?');
    
    if (confirmDelete) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let userAds = JSON.parse(localStorage.getItem('userAds')) || {};
        
        if (userAds[currentUser.email]) {
            userAds[currentUser.email] = userAds[currentUser.email].filter(ad => ad.id !== adId);
            localStorage.setItem('userAds', JSON.stringify(userAds));
            
            alert('Elan uğurla silindi!');
            location.reload();
        }
    }
}

function logout() {
    const confirmLogout = window.confirm('Çıxış etmək istədiyinizdən əminsiniz?');
    
    if (confirmLogout) {
        localStorage.removeItem('currentUser');
        alert('Uğurla çıxış etdiniz!');
        window.location.href = 'index.html';
    }
}

const profileStyle = document.createElement('style');
profileStyle.textContent = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
    }
    
    .profile-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
    }
    
    .profile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, #005461, #00B7B5);
        color: white;
        padding: 30px;
        border-radius: 15px;
        margin-bottom: 30px;
        box-shadow: 0 5px 15px rgba(0, 84, 97, 0.3);
    }
    
    .profile-header h1 {
        margin: 0;
        font-size: 32px;
    }
    
    .logout-btn {
        background: white;
        color: #005461;
        border: none;
        padding: 12px 25px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .logout-btn:hover {
        background: #f0f0f0;
        transform: scale(1.05);
    }
    
    .profile-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
    }
    
    .stat-card {
        background: white;
        border: 2px solid #00B7B5;
        border-radius: 10px;
        padding: 25px;
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 183, 181, 0.2);
    }
    
    .stat-card h3 {
        font-size: 42px;
        color: #00B7B5;
        margin: 0 0 10px 0;
    }
    
    .stat-card p {
        font-size: 16px;
        color: #666;
        margin: 0;
    }
    
    h2 {
        color: #005461;
        font-size: 28px;
        margin-bottom: 20px;
    }
    
    .user-ads-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    
    .ad-card {
        background: white;
        border: 1px solid #ddd;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .ad-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    
    .ad-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    
    .ad-info {
        padding: 15px;
    }
    
    .ad-info h3 {
        color: #005461;
        margin: 0 0 10px 0;
        font-size: 20px;
    }
    
    .ad-price {
        color: #00B7B5;
        font-size: 24px;
        font-weight: bold;
        margin: 10px 0;
    }
    
    .ad-info p {
        margin: 5px 0;
        color: #666;
        font-size: 14px;
    }
    
    .ad-date {
        font-size: 12px;
        color: #999;
        margin-top: 10px;
    }
    
    .delete-ad-btn {
        width: 100%;
        padding: 10px;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 15px;
        transition: all 0.3s ease;
    }
    
    .delete-ad-btn:hover {
        background: #cc0000;
        transform: scale(1.02);
    }
    
    .no-ads {
        text-align: center;
        color: #666;
        font-size: 18px;
        padding: 40px;
        grid-column: 1 / -1;
        background: white;
        border-radius: 10px;
    }
    
    .no-ads a {
        color: #00B7B5;
        text-decoration: none;
        font-weight: bold;
    }
    
    .no-ads a:hover {
        text-decoration: underline;
    }
    
    .login-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .login-content {
        background: white;
        padding: 40px;
        border-radius: 20px;
        width: 90%;
        max-width: 450px;
        position: relative;
        animation: slideUp 0.4s ease;
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .login-close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 35px;
        cursor: pointer;
        color: #666;
        transition: all 0.3s ease;
    }
    
    .login-close:hover {
        color: #00B7B5;
        transform: rotate(90deg);
    }
    
    .login-content h2 {
        color: #005461;
        margin-bottom: 25px;
        font-size: 28px;
    }
    
    .login-content input {
        width: 100%;
        padding: 14px;
        margin-bottom: 15px;
        border: 2px solid #ddd;
        border-radius: 10px;
        font-size: 15px;
        box-sizing: border-box;
        transition: border 0.3s ease;
    }
    
    .login-content input:focus {
        border: 2px solid #00B7B5;
        outline: none;
    }
    
    .login-content button {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #00B7B5, #009e9c);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 183, 181, 0.3);
    }
    
    .login-content button:hover {
        background: linear-gradient(135deg, #009e9c, #007d7b);
        transform: translateY(-2px);
        box-shadow: 0 7px 20px rgba(0, 183, 181, 0.4);
    }
    
    @media (max-width: 768px) {
        .profile-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
        }
        
        .profile-header h1 {
            font-size: 24px;
        }
        
        .user-ads-container {
            grid-template-columns: 1fr;
        }
        
        .profile-stats {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(profileStyle);