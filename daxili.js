


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
const daxiliCards = document.querySelectorAll('.daxili');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let hasResults = false;

        daxiliCards.forEach(card => {
            const itemName = card.querySelector('p').textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (!hasResults) {
            let noResultMsg = document.getElementById('noResultDaxili');
            if (!noResultMsg) {
                noResultMsg = document.createElement('p');
                noResultMsg.id = 'noResultDaxili';
                noResultMsg.style.cssText = 'text-align:center; font-size:18px; margin:20px; grid-column: 1/-1;';
                noResultMsg.textContent = 'Heç bir daxili hissə tapılmadı 😕';
                document.querySelector('.daxili-hisse').appendChild(noResultMsg);
            }
            noResultMsg.style.display = 'block';
        } else {
            const noResultMsg = document.getElementById('noResultDaxili');
            if (noResultMsg) {
                noResultMsg.style.display = 'none';
            }
        }
    });
}


const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'daxiliModal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body">
            <div class="modal-left">
                <img id="modalImg" src="" alt="Daxili hissə şəkli">
            </div>
            <div class="modal-right">
                <h2 id="modalPrice" class="modal-price"></h2>
                <h1 id="modalName" class="modal-name"></h1>
                
                <div class="modal-specs">
                    <div class="spec-item">
                        <span class="spec-label">🔧 Kateqoriya:</span>
                        <span id="modalCategory" class="spec-value">Daxili hissə</span>
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


const daxiliDetails = {
    'Changan A06 sükan dartısı': {
        price: '60 manat',
        description: 'Changan A06 üçün orijinal sükan dartısı. Keyfiyyətli material, ergonomik dizayn. Sürüş rahatlığını artırır, əlləri yorulmaqdan qoruyur. Asanlıqla quraşdırılır.'
    },
    'Jaguar F-pace sükan dartısı': {
        price: '45 manat',
        description: 'Jaguar F-pace üçün premium sükan dartısı. Lüks dəri örtük, ideal tutuş. Salonun görünüşünü yaxşılaşdırır. Anti-sürüşmə səthli, uzunmüddətli istifadə üçün.'
    },
    'BMW G30 üçün sükan mexanizmi': {
        price: '100 manat',
        description: 'BMW G30 üçün orijinal sükan mexanizmi. Yüksək keyfiyyətli komponent, düzgün idarəetmə təmin edir. Hidroavtomat sistem, rahat və dəqiq sürüş.'
    },
    'Chevrolet Cruze üçün sükan mexanizmi': {
        price: '500 manat',
        description: 'Chevrolet Cruze üçün tam sükan mexanizmi. Elektrik gücləndiricisi ilə, yüngül idarəetmə. Yüksək keyfiyyətli, zavod standartlarına uyğun. Zəmanət ilə.'
    },
    'Akkumulyator 75': {
        price: '75 manat',
        description: 'Universal avtomobil akkumulyatoru. Yüksək tutum, uzun xidmət müddəti. Soyuq havada da etibarlı işləyir. 12V, müxtəlif modellərlə uyğun gəlir.'
    },
    'Akkumulyator 80': {
        price: '80 manat',
        description: 'Güclü avtomobil akkumulyatoru. Premium keyfiyyət, tez şarj olur. Həssas elektronika üçün sabit gərginlik. Təhlükəsizlik qapaqcıqları ilə, 2 il zəmanət.'
    },
    'Ford üçün radiator': {
        price: '150 manat',
        description: 'Ford modelləri üçün orijinal radiator. Mühərriki optimal temperaturda saxlayır. Alüminium konstruksiya, korroziyaya davamlı. Uzunömürlü, etibarlı soyutma sistemi.'
    },
    'BYD Destroyer 05 üçün radiator': {
        price: '80 manat',
        description: 'BYD Destroyer 05 üçün xüsusi radiator. Yüksək effektivliyə malik soyutma sistemi. Keyfiyyətli material, asanlıqla quraşdırılır. Zavod standartlarına tam uyğundur.'
    },
    'BYD Destroyer üçün əyləc diski': {
        price: '80 manat',
        description: 'BYD Destroyer üçün əyləc diski. Yüksək keyfiyyətli polad, güclü əyləc təmin edir. İstilik davamlı, deformasiyaya qarşı. Təhlükəsiz dayanma üçün.'
    },
    'Changa Uni-V üçün əyləc diski': {
        price: '80 manat',
        description: 'Changa Uni-V üçün orijinal əyləc diski. Dəqiq ölçülər, mükəmməl uyğunluq. Uzun istifadə müddəti, az köhnəlir. Səs-küysüz işləyir, rahat əyləc.'
    },
    'Daewoo Matiz sükan mexanizmi': {
        price: '175 manat',
        description: 'Daewoo Matiz üçün tam sükan mexanizmi. Zavod keyfiyyəti, etibarlı idarəetmə. Bütün lazımi komponentlərlə, quraşdırma təlimatlı. Uzunmüddətli zəmanət.'
    },
    'Toyota Prado su radiatoru': {
        price: '160 manat',
        description: 'Toyota Prado üçün orijinal su radiatoru. Yüksək keyfiyyətli material, effektiv soyutma. Mühərrikin həddindən artıq istiləşməsinin qarşısını alır. Uzun xidmət müddəti.'
    }
};


document.querySelectorAll('.daxili button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.daxili');
        const img = card.querySelector('img').src;
        const price = card.querySelector('h2').textContent;
        const name = card.querySelector('p').textContent;
        
        modalImg.src = img;
        modalPrice.textContent = price;
        modalName.textContent = name;
        
        if (daxiliDetails[name]) {
            modalDescription.textContent = daxiliDetails[name].description;
        } else {
            modalDescription.textContent = 'Daxili hissələr haqqında ətraflı məlumat tezliklə əlavə olunacaq. Keyfiyyət və orijinallıq zəmanəti verilir. Quraşdırma xidməti mövcuddur.';
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});


document.querySelectorAll('.daxili').forEach(card => {
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