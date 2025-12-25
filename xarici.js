
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




const searchInput = document.getElementById('searchInput');
const xariciCards = document.querySelectorAll('.xarici');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let hasResults = false;

        xariciCards.forEach(card => {
            const itemName = card.querySelector('p').textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (!hasResults) {
            let noResultMsg = document.getElementById('noResultXarici');
            if (!noResultMsg) {
                noResultMsg = document.createElement('p');
                noResultMsg.id = 'noResultXarici';
                noResultMsg.style.cssText = 'text-align:center; font-size:18px; margin:20px; grid-column: 1/-1;';
                noResultMsg.textContent = 'Heç bir xarici hissə tapılmadı 😕';
                document.querySelector('.xarici-hisse').appendChild(noResultMsg);
            }
            noResultMsg.style.display = 'block';
        } else {
            const noResultMsg = document.getElementById('noResultXarici');
            if (noResultMsg) {
                noResultMsg.style.display = 'none';
            }
        }
    });
}

const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'xariciModal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body">
            <div class="modal-left">
                <img id="modalImg" src="" alt="Xarici hissə şəkli">
            </div>
            <div class="modal-right">
                <h2 id="modalPrice" class="modal-price"></h2>
                <h1 id="modalName" class="modal-name"></h1>
                
                <div class="modal-specs">
                    <div class="spec-item">
                        <span class="spec-label">🔧 Kateqoriya:</span>
                        <span id="modalCategory" class="spec-value">Xarici hissə</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">✅ Vəziyyət:</span>
                        <span id="modalCondition" class="spec-value">Yeni</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">🚚 Çatdırılma:</span>
                        <span id="modalDelivery" class="spec-value">Var</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">🔨 Quraşdırma:</span>
                        <span id="modalInstallation" class="spec-value">Xidmət mövcuddur</span>
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

const xariciDetails = {
    'Bufer': {
        price: '101 manat',
        description: 'Keyfiyyətli avtomobil buferi. Gövdəni zərbələrdən qoruyur, estetik görünüş verir. Davamlı plastik material, rəngə davamlı. Asanlıqla quraşdırılır, bütün bərkitmələr daxildir.'
    },
    'Bufer': {
        price: '300 manat',
        description: 'Premium avtomobil buferi. Yüksək keyfiyyətli material, güclü zərbə udma. Orijinal dizayn, mükəmməl uyğunluq. Rəng seçimləri mövcuddur, uzun istifadə müddəti.'
    },
    'BYD QIN plus fara': {
        price: '100 manat',
        description: 'BYD QIN Plus üçün orijinal fara. LED texnologiya, parlaq işıqlandırma. Gecə sürüşü təhlükəsiz edir. Su keçirməz korpus, uzun ömürlü. Zavod keyfiyyəti, zəmanətli.'
    },
    'Chevrolet Malibu fara': {
        price: '130 manat',
        description: 'Chevrolet Malibu üçün orijinal fara. Yüksək keyfiyyətli işıqlandırma sistemi. Modern dizayn, parlaq LED lampalar. Asanlıqla quraşdırılır, elektrik bağlantıları hazırdır.'
    },
    'Radiator barmaqlığı 100': {
        price: '100 manat',
        description: 'Avtomobil üçün radiator barmaqlığı. Radiatoru zərbələrdən və zədələnmələrdən qoruyur. Xrom örtüklü, parlaq görünüş. Davamlı material, korroziyaya davamlı.'
    },
    'Radiator barmaqlığı': {
        price: '110 manat',
        description: 'Premium radiator barmaqlığı. Lüks dizayn, yüksək keyfiyyətli plastik. Avtomobilin ön görünüşünü yaxşılaşdırır. Asanlıqla quraşdırılır, mükəmməl uyğunluq.'
    },
    'Sükan': {
        price: '300 manat',
        description: 'Multifunksional avtomobil sükanı. Audio və kruiz-kontrol düymələri ilə. Yüksək keyfiyyətli dəri örtük, ergonomik dizayn. Isitmə funksiyası, rahat tutacaq.'
    },
    'Sükan': {
        price: '350 manat',
        description: 'Premium avtomobil sükanı. Sportiv dizayn, dəri və karbon kombinasiyası. Bütün idarəetmə düymələri ilə, Bluetooth əlaqə. Vibrasiya funksiyası, ideal tutuş.'
    },
    'BMW f10 f30 f36 f15 sükan': {
        price: '400 manat',
        description: 'BMW seriyası üçün orijinal sükan. M-Sport dizayn, premium dəri. Paddle shift dəstəyi, multimediaya nəzarət. Isitmə funksiyası, mükəmməl keyfiyyət. Zavod standartlarına uyğun.'
    },
    'Təkər': {
        price: '850 manat',
        description: 'Keyfiyyətli avtomobil təkəri (4 ədəd). Yüksək keyfiyyətli rezin, uzun ömürlü. Yaş və quru yolda mükəmməl tutma. Səs-küysüz hərəkət, yanacağa qənaət.'
    },
    'Təkər': {
        price: '900 manat',
        description: 'Premium avtomobil təkər dəsti (4 ədəd). Alüminium disklər, yüngül və davamlı. Sportiv dizayn, müxtəlif ölçülər. Balanslaşdırılmış, təhlükəsiz sürüş təmin edir.'
    },
    'Təkər': {
        price: '650 manat',
        description: 'Universal avtomobil təkəri (4 ədəd). Qış və yay rezimlərində istifadə oluna bilər. Keyfiyyətli material, uzun istifadə müddəti. Çox model maşınlara uyğun gəlir.'
    }
};

document.querySelectorAll('.xarici button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.xarici');
        const img = card.querySelector('img').src;
        const price = card.querySelector('h2').textContent;
        const name = card.querySelector('p').textContent;
        
        modalImg.src = img;
        modalPrice.textContent = price;
        modalName.textContent = name;
        
        if (xariciDetails[name]) {
            modalDescription.textContent = xariciDetails[name].description;
        } else {
            modalDescription.textContent = 'Xarici hissələr haqqında ətraflı məlumat tezliklə əlavə olunacaq. Keyfiyyət və orijinallıq zəmanəti verilir. Quraşdırma xidməti mövcuddur.';
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.xarici').forEach(card => {
    card.addEventListener('click', function() {
        this.querySelector('button').click();
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
    alert('📞 Əlaqə məlumatları:\n\nTelefon: +994 12 345 67 89\nWhatsApp: +994 50 123 45 67\nEmail: info@muherrik.az\n\nİş saatları: 09:00 - 18:00');
});

modal.querySelector('.favorite-btn').addEventListener('click', function() {
    const itemName = modalName.textContent;
    alert(`❤️ "${itemName}" seçilmişlərə əlavə edildi!\n\nSeçilmişlərinizi "Hesabım" bölməsindən görə bilərsiniz.`);
});