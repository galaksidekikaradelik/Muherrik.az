// BU KODU HƏR SƏHİFƏNİN JAVASCRIPT FAYLINA ƏLAVƏ EDİN

// Səhifə yüklənəndə istifadəçi adını yenilə
document.addEventListener('DOMContentLoaded', function() {
    updateUserDisplay();
});

// İstifadəçi məlumatını yoxla və görüntünü yenilə
function updateUserDisplay() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const hesabLink = document.querySelector('a[href="hesab.html"]');
    
    if (hesabLink && currentUser) {
        hesabLink.textContent = `👤 ${currentUser.name}`;
        hesabLink.style.color = '#f4f4f4';
        hesabLink.style.fontWeight = 'bold';
    }
}

// Əgər səhifədə artıq loadCurrentUser() funksiyası varsa, onu belə dəyişdirin:
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





const searchInput = document.getElementById('searchInput');
const aksesuarCards = document.querySelectorAll('.aksesuar-card');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let hasResults = false;

        aksesuarCards.forEach(card => {
            const aksesuarName = card.querySelector('p').textContent.toLowerCase();
            if (aksesuarName.includes(searchTerm)) {
                card.style.display = 'flex';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });


        if (!hasResults) {
            let noResultMsg = document.getElementById('noResultAksesuar');
            if (!noResultMsg) {
                noResultMsg = document.createElement('p');
                noResultMsg.id = 'noResultAksesuar';
                noResultMsg.style.cssText = 'text-align:center; font-size:18px; margin:20px; grid-column: 1/-1;';
                noResultMsg.textContent = 'Heç bir aksesuar tapılmadı 😕';
                document.querySelector('.aksesuar').appendChild(noResultMsg);
            }
            noResultMsg.style.display = 'block';
        } else {
            const noResultMsg = document.getElementById('noResultAksesuar');
            if (noResultMsg) {
                noResultMsg.style.display = 'none';
            }
        }
    });
}

const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'aksesuarModal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body">
            <div class="modal-left">
                <img id="modalImg" src="" alt="Aksesuar şəkli">
            </div>
            <div class="modal-right">
                <h2 id="modalPrice" class="modal-price"></h2>
                <h1 id="modalName" class="modal-name"></h1>
                
                <div class="modal-specs">
                    <div class="spec-item">
                        <span class="spec-label">📦 Kateqoriya:</span>
                        <span id="modalCategory" class="spec-value">Aksesuar</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">✅ Vəziyyət:</span>
                        <span id="modalCondition" class="spec-value">Yeni</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">🚚 Çatdırılma:</span>
                        <span id="modalDelivery" class="spec-value">Var</span>
                    </div>
                </div>
                
                <div class="modal-description">
                    <h3>Ətraflı məlumat</h3>
                    <p id="modalDescription"></p>
                </div>
                
                <div class="modal-actions">
                    <button class="contact-btn">📞 Əlaqə saxla</button>
                    <button class="favorite-btn">❤️ Seçilmişlərə əlavə et</button>
                </div>
            </div>
        </div>
    </div>
`;
document.body.appendChild(modal);

const modalClose = modal.querySelector('.modal-close');
const modalImg = modal.querySelector('#modalImg');
const modalPrice = modal.querySelector('#modalPrice');
const modalName = modal.querySelector('#modalName');
const modalDescription = modal.querySelector('#modalDescription');

const aksesuarDetails = {
    'Baqaj jalüzü': {
        description: 'Keyfiyyətli baqaj jalüzü. Maşınınızın baqajını günəşdən qoruyur. Asanlıqla quraşdırılır, universal ölçü.'
    },
    'Bqaj jalüzü': {
        description: 'Premium baqaj jalüzü. Davamlı material, uzunmüddətli istifadə üçün. Müxtəlif rənglər mövcuddur.'
    },
    'Avtomobil çadır': {
        description: 'Avtomobil üçün qoruyucu çadır. Su keçirməz material, günəşdən və yağışdan qoruyur. Kompakt və rahat.'
    },
    '"Jeep Wrangler" çadırı': {
        description: 'Jeep Wrangler üçün xüsusi çadır. Davamlı və keyfiyyətli. Kəmping və off-road səfərlər üçün ideal.'
    },
    'İşıq ötürücü': {
        description: 'LED işıq ötürücü. Parlaq və enerjiyə qənaət edən. Asanlıqla quraşdırılır, uzun ömürlü.'
    },
    'Oturacaq üzlüyü A05': {
        description: 'Premium dəri oturacaq üzlüyü. Rahat və davamlı, asanlıqla təmizlənir. Universal ölçü, çox maşın markaları üçün uyğun.'
    },
    'Oturacaq üzlüyü A06': {
        description: 'Lüks oturacaq üzlüyü. Yüksək keyfiyyətli material, ortopedik dəstək. Uzun səfərlər üçün maksimum rahatlıq.'
    },
    'Səsboğucu başlığı "Akropoviç"': {
        description: 'Akropoviç brendinin orijinal səsboğucu başlığı. Sportiv səs, keyfiyyətli material. Performansı artırır.'
    },
    '"BYD QİN Plus" yan güzgüsü': {
        description: 'BYD QİN Plus üçün orijinal yan güzgü. Elektrikli tənzimləmə, isitmə funksiyası. Yeni, qutuda.'
    },
    'Kia Sorento': {
        description: 'Kia Sorento üçün yan güzgü. Keyfiyyətli, dayanıqlı. Asanlıqla quraşdırılır, orijinal kimi.'
    }
};

document.querySelectorAll('.aksesuar-card button').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.aksesuar-card');
        const img = card.querySelector('img').src;
        const price = card.querySelector('h2').textContent;
        const name = card.querySelector('p').textContent;
        
        modalImg.src = img;
        modalPrice.textContent = price;
        modalName.textContent = name;
        
        if (aksesuarDetails[name]) {
            modalDescription.textContent = aksesuarDetails[name].description;
        } else {
            modalDescription.textContent = 'Ətraflı məlumat tezliklə əlavə olunacaq.';
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

if (modalClose) {
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

modal.querySelector('.contact-btn').addEventListener('click', function() {
    alert('Əlaqə: +994 12 345 67 89');
});

modal.querySelector('.favorite-btn').addEventListener('click', function() {
    alert('Seçilmişlərə əlavə edildi! ❤️');
});