
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







const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'rentModal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body">
            <h2 id="carName"></h2>
            <p class="price" id="carPrice"></p>
            
            <div class="rental-form">
                <div class="form-group">
                    <label>Ad və Soyad</label>
                    <input type="text" id="customerName" placeholder="Adınızı daxil edin" required>
                </div>
                
                <div class="form-group">
                    <label>Telefon nömrəsi</label>
                    <input type="tel" id="customerPhone" placeholder="+994 XX XXX XX XX" required>
                </div>
                
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="customerEmail" placeholder="email@example.com">
                </div>
                
                <div class="form-group">
                    <label>Başlama tarixi</label>
                    <input type="date" id="startDate" required>
                </div>
                
                <div class="form-group">
                    <label>Bitmə tarixi</label>
                    <input type="date" id="endDate" required>
                </div>
                
                <div class="form-group">
                    <label>Sürücü vəsiqəsi</label>
                    <select id="licenseType">
                        <option value="b">B kateqoriya</option>
                        <option value="c">C kateqoriya</option>
                        <option value="d">D kateqoriya</option>
                    </select>
                </div>
            </div>
            
            <div class="rental-info">
                <h4>İcarə məlumatı</h4>
                <div class="info-item">
                    <span>Günlük qiymət:</span>
                    <strong id="dailyRate">0 AZN</strong>
                </div>
                <div class="info-item">
                    <span>Gün sayı:</span>
                    <strong id="totalDays">0 gün</strong>
                </div>
                <div class="info-item" style="border-top: 2px solid #ddd; padding-top: 15px; margin-top: 10px; font-size: 18px;">
                    <span>Ümumi məbləğ:</span>
                    <strong id="totalAmount" style="color: #00B7B5;">0 AZN</strong>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="confirm-btn">✅ Sifarişi təsdiqlə</button>
                <button class="cancel-btn">❌ Ləğv et</button>
            </div>
        </div>
    </div>
`;
document.body.appendChild(modal);

const modalClose = modal.querySelector('.modal-close');
const cancelBtn = modal.querySelector('.cancel-btn');
const confirmBtn = modal.querySelector('.confirm-btn');

const carData = {
    'BMW X5': { 
        price: 120,
        description: 'Lüks SUV, tam avadanlıqlı, GPS naviqasiya, dəri salon'
    },
    'Mercedes C200': { 
        price: 100,
        description: 'Premium sedan, rahat və təhlükəsiz, ideal biznes səfərlər üçün'
    },
    'Toyota Prado': { 
        price: 110,
        description: 'Güclü off-road avtomobil, ailə səfərləri üçün mükəmməl'
    },
    'Hyundai Elantra': { 
        price: 70,
        description: 'Ekonomik və etibarlı, şəhər üçün ideal'
    },
    'Kia Sportage': { 
        price: 90,
        description: 'Müasir crossover, geniş salon, komfortlu'
    },
    'Chevrolet Malibu': { 
        price: 85,
        description: 'Rahat sedan, müasir təhlükəsizlik sistemləri'
    },
    'Nissan Patrol': { 
        price: 130,
        description: 'Premium SUV, güclü mühərrik, lüks intерyer'
    },
    'Volkswagen Passat': { 
        price: 80,
        description: 'Klassik sedan, etibarlı və komfortlu'
    },
    'Aston Martin DB11': { 
        price: 500,
        description: 'Ekslüziv supercar, V12 mühərrik, lüks və yüksək performans'
    }
}

let selectedCar = null;

document.querySelectorAll('.car-card button').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.car-card');
        const carName = card.querySelector('h3').textContent;
        const carPrice = card.querySelector('p').textContent;
        
        selectedCar = carData[carName];
        
        modal.querySelector('#carName').textContent = carName;
        modal.querySelector('#carPrice').textContent = carPrice;
        modal.querySelector('#dailyRate').textContent = selectedCar.price + ' AZN';
        
        const today = new Date().toISOString().split('T')[0];
        modal.querySelector('#startDate').value = today;
        modal.querySelector('#startDate').min = today;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        calculateTotal();
    });
});

modal.querySelector('#startDate').addEventListener('change', function() {
    const endDateInput = modal.querySelector('#endDate');
    endDateInput.min = this.value;
    if (endDateInput.value && endDateInput.value < this.value) {
        endDateInput.value = this.value;
    }
    calculateTotal();
});

modal.querySelector('#endDate').addEventListener('change', calculateTotal);

function calculateTotal() {
    const startDate = modal.querySelector('#startDate').value;
    const endDate = modal.querySelector('#endDate').value;
    
    if (startDate && endDate && selectedCar) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        const total = selectedCar.price * diffDays;
        
        modal.querySelector('#totalDays').textContent = diffDays + ' gün';
        modal.querySelector('#totalAmount').textContent = total + ' AZN';
    }
}

confirmBtn.addEventListener('click', function() {
    const name = modal.querySelector('#customerName').value;
    const phone = modal.querySelector('#customerPhone').value;
    const startDate = modal.querySelector('#startDate').value;
    const endDate = modal.querySelector('#endDate').value;
    
    if (!name || !phone || !startDate || !endDate) {
        alert('⚠️ Zəhmət olmasa bütün məlumatları doldurun!');
        return;
    }
    
    const carName = modal.querySelector('#carName').textContent;
    const totalAmount = modal.querySelector('#totalAmount').textContent;
    
    alert(`✅ Sifarişiniz qəbul edildi!

🚗 Avtomobil: ${carName}
👤 Ad: ${name}
📞 Telefon: ${phone}
📅 Tarix: ${startDate} - ${endDate}
💰 Ümumi məbləğ: ${totalAmount}

Tezliklə sizinlə əlaqə saxlanılacaq.`);
    
    closeModal();
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    modal.querySelectorAll('input').forEach(input => {
        if (input.type !== 'date') {
            input.value = '';
        }
    });
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});