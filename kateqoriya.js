
document.addEventListener('DOMContentLoaded', function() {
    updateUserDisplay();
});

function updateUserDisplay() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const hesabLink = document.querySelector('a[href="hesab.html"]');
    
    if (hesabLink && currentUser) {
        hesabLink.textContent = `👤 ${currentUser.name}`;
        hesabLink.style.color = '#00B7B5';
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
    loadAdsForCurrentPage();
});

function loadAdsForCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const pageCategories = {
        'index.html': 'masin',           
        'xarici.html': 'xarici',    
        'daxili.html': 'daxili',    
        'aksesuar.html': 'aksesuar' 
    };
    
    const category = pageCategories[currentPage];
    
    if (category) {
        displayAdsForCategory(category);
    }
}

function displayAdsForCategory(category) {
    const userAds = JSON.parse(localStorage.getItem('userAds')) || {};
    
    let allAds = [];
    for (let email in userAds) {
        if (userAds.hasOwnProperty(email)) {
            allAds = allAds.concat(userAds[email]);
        }
    }
    
    const categoryAds = allAds.filter(ad => ad.category === category);
    
    categoryAds.sort((a, b) => b.id - a.id);
    
    const adsContainer = document.getElementById('adsContainer') || 
                         document.querySelector('.ads-container') || 
                         document.querySelector('.products-grid');
    
    if (!adsContainer) {
        console.warn('Elan göstərmək üçün container tapılmadı!');
        return;
    }
    
    if (categoryAds.length === 0) {
        adsContainer.innerHTML = `
            <div class="no-ads-message">
                <h3>😔 Hal-hazırda bu kateqoriyada elan yoxdur</h3>
                <p>Birinci siz elan əlavə edin!</p>
                <a href="index-elan.html" class="add-ad-link">Elan əlavə et</a>
            </div>
        `;
        return;
    }
    
    adsContainer.innerHTML = categoryAds.map(ad => createAdCardForDisplay(ad)).join('');
    
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const ownerEmail = this.dataset.email;
            const ownerName = this.dataset.name;
            showContactModal(ownerName, ownerEmail);
        });
    });
}

function createAdCardForDisplay(ad) {
    const kmDisplay = ad.category === 'masin' ? 
        `<div class="ad-detail">
            <span class="detail-icon">🛣️</span>
            <span class="detail-text">Gedilən yol: ${ad.km} km</span>
        </div>` : '';
    
    return `
        <div class="ad-card" data-category="${ad.category}">
            <div class="ad-image-container">
                <img src="${ad.image}" alt="${ad.brand} ${ad.model}" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=Şəkil+Yoxdur'">
                <span class="ad-category-badge">${getCategoryName(ad.category)}</span>
            </div>
            <div class="ad-body">
                <h3 class="ad-title">${ad.brand} ${ad.model}</h3>
                <p class="ad-price">${formatPrice(ad.price)} ₼</p>
                
                <div class="ad-details">
                    <div class="ad-detail">
                        <span class="detail-icon">📅</span>
                        <span class="detail-text">İl: ${ad.year}</span>
                    </div>
                    ${kmDisplay}
                    <div class="ad-detail">
                        <span class="detail-icon">👤</span>
                        <span class="detail-text">${ad.ownerName}</span>
                    </div>
                    <div class="ad-detail">
                        <span class="detail-icon">📆</span>
                        <span class="detail-text">${ad.date}</span>
                    </div>
                </div>
                
                <button class="contact-btn" data-email="${ad.ownerEmail}" data-name="${ad.ownerName}">
                    📞 Əlaqə saxla
                </button>
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

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showContactModal(ownerName, ownerEmail) {
    const existingModal = document.querySelector('.contact-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="contact-content">
            <span class="contact-close">&times;</span>
            <h2>Əlaqə məlumatları</h2>
            <div class="contact-info">
                <div class="contact-item">
                    <span class="contact-icon">👤</span>
                    <div>
                        <p class="contact-label">Ad və Soyad</p>
                        <p class="contact-value">${ownerName}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <div>
                        <p class="contact-label">Email</p>
                        <p class="contact-value">${ownerEmail}</p>
                    </div>
                </div>
            </div>
            <button onclick="window.location.href='mailto:${ownerEmail}'" class="email-btn">
                ✉️ Email göndər
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.contact-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

const displayStyle = document.createElement('style');
displayStyle.textContent = `
    /* Elan kartları */
    .ads-container, .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
    }
    
    .ad-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .ad-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 25px rgba(0, 183, 181, 0.2);
    }
    
    .ad-image-container {
        position: relative;
        width: 100%;
        height: 220px;
        overflow: hidden;
    }
    
    .ad-image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .ad-card:hover .ad-image-container img {
        transform: scale(1.1);
    }
    
    .ad-category-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(0, 183, 181, 0.95);
        color: white;
        padding: 6px 15px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .ad-body {
        padding: 20px;
    }
    
    .ad-title {
        color: #005461;
        font-size: 20px;
        margin: 0 0 10px 0;
        font-weight: bold;
    }
    
    .ad-price {
        color: #00B7B5;
        font-size: 26px;
        font-weight: bold;
        margin: 10px 0 15px 0;
    }
    
    .ad-details {
        margin: 15px 0;
    }
    
    .ad-detail {
        display: flex;
        align-items: center;
        margin: 8px 0;
        color: #666;
        font-size: 14px;
    }
    
    .detail-icon {
        font-size: 18px;
        margin-right: 10px;
        width: 25px;
    }
    
    .detail-text {
        flex: 1;
    }
    
    .contact-btn {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #00B7B5, #009e9c);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 15px;
    }
    
    .contact-btn:hover {
        background: linear-gradient(135deg, #009e9c, #007d7b);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 183, 181, 0.3);
    }
    
    /* Elan yoxdur mesajı */
    .no-ads-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .no-ads-message h3 {
        color: #005461;
        font-size: 28px;
        margin-bottom: 15px;
    }
    
    .no-ads-message p {
        color: #666;
        font-size: 18px;
        margin-bottom: 25px;
    }
    
    .add-ad-link {
        display: inline-block;
        padding: 15px 35px;
        background: linear-gradient(135deg, #00B7B5, #009e9c);
        color: white;
        text-decoration: none;
        border-radius: 10px;
        font-weight: bold;
        font-size: 16px;
        transition: all 0.3s ease;
    }
    
    .add-ad-link:hover {
        background: linear-gradient(135deg, #009e9c, #007d7b);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 183, 181, 0.3);
    }
    
    /* Əlaqə modalı */
    .contact-modal {
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
    
    .contact-content {
        background: white;
        padding: 40px;
        border-radius: 20px;
        width: 90%;
        max-width: 450px;
        position: relative;
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
        animation: slideUp 0.4s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
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
    
    .contact-close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 32px;
        cursor: pointer;
        color: #666;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    
    .contact-close:hover {
        color: #ff4444;
        background: rgba(255, 68, 68, 0.1);
        transform: rotate(90deg);
    }
    
    .contact-content h2 {
        color: #005461;
        margin-bottom: 30px;
        font-size: 26px;
        text-align: center;
    }
    
    .contact-info {
        margin-bottom: 25px;
    }
    
    .contact-item {
        display: flex;
        align-items: flex-start;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 10px;
        margin-bottom: 15px;
    }
    
    .contact-icon {
        font-size: 28px;
        margin-right: 15px;
    }
    
    .contact-label {
        font-size: 12px;
        color: #999;
        margin: 0 0 5px 0;
        text-transform: uppercase;
        font-weight: 600;
    }
    
    .contact-value {
        font-size: 16px;
        color: #333;
        margin: 0;
        font-weight: 600;
    }
    
    .email-btn {
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
    }
    
    .email-btn:hover {
        background: linear-gradient(135deg, #009e9c, #007d7b);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 183, 181, 0.3);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .ads-container, .products-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 15px;
        }
        
        .ad-card {
            max-width: 100%;
        }
        
        .contact-content {
            width: 95%;
            padding: 30px 20px;
        }
    }
`;
document.head.appendChild(displayStyle);