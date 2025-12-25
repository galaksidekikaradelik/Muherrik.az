
let currentUser = null;


document.addEventListener('DOMContentLoaded', function() {
    loadCurrentUser();
    initializeForm();
});


function loadCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
            updateUIForLoggedInUser();
        } catch (e) {
            localStorage.removeItem('currentUser');
        }
    }
}


function checkLogin() {
    return currentUser !== null;
}


function showLoginModal() {

    const existingModal = document.querySelector('.auth-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-content">
            <span class="auth-close">&times;</span>
            
            
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Daxil ol</button>
                <button class="auth-tab" data-tab="register">Qeydiyyat</button>
            </div>
            
            
            <div class="auth-form" id="loginForm">
                <h2>Hesaba daxil ol</h2>
                <input type="email" id="loginEmail" placeholder="Email">
                <input type="password" id="loginPassword" placeholder="Şifrə">
                <button id="loginBtn">Daxil ol</button>
            </div>
            
            
            <div class="auth-form hidden" id="registerForm">
                <h2>Qeydiyyatdan keç</h2>
                <input type="text" id="registerName" placeholder="Ad və Soyad">
                <input type="email" id="registerEmail" placeholder="Email">
                <input type="password" id="registerPassword" placeholder="Şifrə">
                <input type="password" id="registerPasswordConfirm" placeholder="Şifrəni təsdiqlə">
                <button id="registerBtn">Qeydiyyatdan keç</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);


    modal.querySelector('.auth-close').addEventListener('click', () => {
        modal.remove();
    });

 
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });


    const tabs = modal.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            

            const targetTab = tab.dataset.tab;
            modal.querySelectorAll('.auth-form').forEach(form => {
                form.classList.add('hidden');
            });
            
            if (targetTab === 'login') {
                document.getElementById('loginForm').classList.remove('hidden');
            } else {
                document.getElementById('registerForm').classList.remove('hidden');
            }
        });
    });


    document.getElementById('loginBtn').addEventListener('click', () => {
        handleLogin(modal);
    });


    document.getElementById('registerBtn').addEventListener('click', () => {
        handleRegister(modal);
    });


    modal.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const activeForm = modal.querySelector('.auth-form:not(.hidden)');
                if (activeForm.id === 'loginForm') {
                    handleLogin(modal);
                } else {
                    handleRegister(modal);
                }
            }
        });
    });
}


function handleRegister(modal) {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value.trim();


    if (!name || !email || !password || !passwordConfirm) {
        alert('Xahiş edirik bütün məlumatları doldurun!');
        return;
    }

    if (name.length < 3) {
        alert('Ad ən azı 3 simvoldan ibarət olmalıdır!');
        return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Xahiş edirik düzgün email daxil edin!');
        return;
    }


    if (password.length < 6) {
        alert('Şifrə ən azı 6 simvoldan ibarət olmalıdır!');
        return;
    }


    if (password !== passwordConfirm) {
        alert('Şifrələr uyğun gəlmir!');
        return;
    }


    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email]) {
        alert('Bu email ilə artıq hesab mövcuddur! Daxil olun.');
        return;
    }


    users[email] = {
        name: name,
        email: email,
        password: password, 
        registerDate: new Date().toISOString()
    };
    localStorage.setItem('users', JSON.stringify(users));


    currentUser = {
        name: name,
        email: email,
        loginDate: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    modal.remove();
    alert(`Qeydiyyat uğurlu! Xoş gəlmisiniz, ${name}!`);
    updateUIForLoggedInUser();
}


function handleLogin(modal) {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();


    if (!email || !password) {
        alert('Xahiş edirik email və şifrəni daxil edin!');
        return;
    }


    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[email];

    if (!user) {
        alert('Bu email ilə hesab tapılmadı! Əvvəlcə qeydiyyatdan keçin.');
        return;
    }

    if (user.password !== password) {
        alert('Yanlış şifrə!');
        return;
    }


    currentUser = {
        name: user.name,
        email: user.email,
        loginDate: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    modal.remove();
    alert(`Xoş gəlmisiniz, ${user.name}!`);
    updateUIForLoggedInUser();
}


function updateUIForLoggedInUser() {
    const hesabLink = document.querySelector('a[href="hesab.html"]');
    if (hesabLink && currentUser) {
        hesabLink.textContent = `👤 ${currentUser.name}`;
        hesabLink.style.color = '#f4f4f4';
        hesabLink.style.fontWeight = 'bold';
    }
}


function initializeForm() {
    const categorySelect = document.getElementById('carCategory');
    const kmInput = document.getElementById('carKm');
    const addCarBtn = document.getElementById('addCarBtn');

    if (!categorySelect || !kmInput || !addCarBtn) {
        return;
    }

    kmInput.style.display = 'none';
    kmInput.required = false;

    categorySelect.addEventListener('change', function() {
        if (this.value === 'masin') {
            kmInput.style.display = 'block';
            kmInput.required = true;
        } else {
            kmInput.style.display = 'none';
            kmInput.required = false;
            kmInput.value = '';
        }
    });

    addCarBtn.addEventListener('click', handleAddAd);
}


function handleAddAd() {
    if (!checkLogin()) {
        alert('Elan əlavə etmək üçün əvvəlcə hesaba daxil olmalısınız!');
        showLoginModal();
        return;
    }

    const brand = document.getElementById('carBrand').value.trim();
    const category = document.getElementById('carCategory').value;
    const model = document.getElementById('carModel').value.trim();
    const year = document.getElementById('carYear').value.trim();
    const price = document.getElementById('carPrice').value.trim();
    const km = document.getElementById('carKm').value.trim();
    const imageFile = document.getElementById('carImage').files[0];

    if (!brand || !category || !model || !year || !price) {
        alert('Xahiş edirik bütün məlumatları doldurun!');
        return;
    }

    if (category === 'masin' && !km) {
        alert('Maşın üçün km məlumatı mütləqdir!');
        return;
    }

    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 1) {
        alert(`Xahiş edirik düzgün il daxil edin (1900 - ${currentYear + 1})!`);
        return;
    }

    if (price <= 0) {
        alert('Xahiş edirik düzgün qiymət daxil edin!');
        return;
    }

    if (imageFile) {
        if (imageFile.size > 5 * 1024 * 1024) {
            alert('Şəkil ölçüsü 5MB-dan böyük olmamalıdır!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const newAd = {
                id: Date.now(),
                brand: brand,
                category: category,
                model: model,
                year: year,
                price: price,
                km: km || 'N/A',
                image: e.target.result,
                ownerName: currentUser.name,
                ownerEmail: currentUser.email,
                date: new Date().toLocaleDateString('az-AZ')
            };

            saveAd(newAd);
            clearForm();
            alert('Elan uğurla əlavə edildi! Profilinizdən idarə edə bilərsiniz.');
            redirectToCategory(category);
        };

        reader.onerror = function() {
            alert('Şəkil yüklənərkən xəta baş verdi. Yenidən cəhd edin.');
        };

        reader.readAsDataURL(imageFile);
    } else {
        alert('Xahiş edirik şəkil əlavə edin!');
    }
}

function saveAd(ad) {
    let userAds = JSON.parse(localStorage.getItem('userAds')) || {};
    
    if (!userAds[currentUser.email]) {
        userAds[currentUser.email] = [];
    }
    
    userAds[currentUser.email].push(ad);
    localStorage.setItem('userAds', JSON.stringify(userAds));
}

function clearForm() {
    document.getElementById('carBrand').value = '';
    document.getElementById('carCategory').value = '';
    document.getElementById('carModel').value = '';
    document.getElementById('carYear').value = '';
    document.getElementById('carPrice').value = '';
    document.getElementById('carKm').value = '';
    document.getElementById('carImage').value = '';
    document.getElementById('carKm').style.display = 'none';
}

function redirectToCategory(category) {
    const categoryPages = {
        'masin': 'index.html',
        'xarici': 'xarici.html',
        'daxili': 'daxili.html',
        'aksesuar': 'aksesuar.html'
    };
    
    const confirmRedirect = confirm('Əlavə etdiyiniz elanı görmək istəyirsiniz?');
    if (confirmRedirect && categoryPages[category]) {
        window.location.href = categoryPages[category];
    }
}

const authStyle = document.createElement('style');
authStyle.textContent = `
    .auth-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
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
    
    .auth-content {
        background: white;
        padding: 0;
        border-radius: 20px;
        width: 90%;
        max-width: 450px;
        position: relative;
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
        animation: slideUp 0.4s ease;
        overflow: hidden;
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(50px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .auth-close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 32px;
        cursor: pointer;
        color: #666;
        transition: all 0.3s ease;
        z-index: 10;
        line-height: 1;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    
    .auth-close:hover {
        color: #ff4444;
        background: rgba(255, 68, 68, 0.1);
        transform: rotate(90deg);
    }
    
    .auth-tabs {
        display: flex;
        background: #f5f5f5;
        padding: 10px;
    }
    
    .auth-tab {
        flex: 1;
        padding: 15px;
        border: none;
        background: transparent;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 10px;
        color: #666;
    }
    
    .auth-tab.active {
        background: white;
        color: #00B7B5;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .auth-form {
        padding: 40px;
        animation: fadeIn 0.3s ease;
    }
    
    .auth-form.hidden {
        display: none;
    }
    
    .auth-form h2 {
        color: #005461;
        margin-bottom: 25px;
        font-size: 26px;
        text-align: center;
    }
    
    .auth-form input {
        width: 100%;
        padding: 15px;
        margin-bottom: 15px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 15px;
        transition: all 0.3s ease;
        box-sizing: border-box;
    }
    
    .auth-form input:focus {
        border: 2px solid #00B7B5;
        outline: none;
        box-shadow: 0 0 0 4px rgba(0, 183, 181, 0.1);
    }
    
    .auth-form button {
        width: 100%;
        padding: 16px;
        background: linear-gradient(135deg, #00B7B5, #009e9c);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 17px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 10px;
    }
    
    .auth-form button:hover {
        background: linear-gradient(135deg, #009e9c, #007d7b);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 183, 181, 0.3);
    }
    
    .auth-form button:active {
        transform: translateY(0);
    }
    
    @media (max-width: 500px) {
        .auth-content {
            width: 95%;
            margin: 20px;
        }
        
        .auth-form {
            padding: 30px 20px;
        }
        
        .auth-tab {
            font-size: 14px;
            padding: 12px;
        }
    }
`;
document.head.appendChild(authStyle);