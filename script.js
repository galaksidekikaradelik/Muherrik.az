
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
const carCards = document.querySelectorAll('.car-card');
const noResult = document.getElementById('noResult');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let hasResults = false;

        carCards.forEach(card => {
            const carName = card.querySelector('h3').textContent.toLowerCase();
            if (carName.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResult) {
            noResult.style.display = hasResults ? 'none' : 'block';
        }
    });
}

const modal = document.getElementById('carModal');
const modalClose = document.querySelector('.modal-close');
const modalImg = document.getElementById('modalImg');
const modalPrice = document.getElementById('modalPrice');
const modalName = document.getElementById('modalName');
const modalYear = document.getElementById('modalYear');
const modalEngine = document.getElementById('modalEngine');
const modalMileage = document.getElementById('modalMileage');
const modalDescription = document.getElementById('modalDescription');

const carDetails = {
    'BMW 528': {
        description: 'Əla vəziyyətdə BMW 528. Bütün avadanlıqlar işləkdir. Yeni təmirlənib, tam baxılıb. Rəng: Qara. Sənədlər qaydasında.'
    },
    'BYD Destroyer 05': {
        description: 'Sıfır BYD Destroyer 05. Hibrid mühərrik, ekonomik yanacaq sərfiyyatı. Tam avadanlıqlı, panorama dam, dəri salon.'
    },
    'Changan Qiyuan Q05': {
        description: 'Yeni Changan Qiyuan Q05. Müasir texnologiyalar, geniş salon, böyük baqaj. Zəmanət daxildir.'
    },
    'Citroen C-Flysee': {
        description: 'Citroen C-Flysee, rahat və ekonomik avtomobil. Şəhər üçün ideal. Texniki vəziyyəti əladır.'
    },
    'Honda CR-V': {
        description: 'Honda CR-V 2022, az qaçılmış. Tam opsion, dəri salon, kondisioner, park assist. Qəza-bəza yoxdur.'
    },
    'Hyundai Elantra': {
        description: 'Hyundai Elantra, etibarlı və dayanıqlı avtomobil. Mühərrik və transmissiya problemsizdir.'
    },
    'Mercedes GL Matic': {
        description: 'Mercedes GL Matic, güclü və lüks avtomobil. Tam opsion, adaptiv asma, havalandırma. Premium klass.'
    },
    'Nissan Magnite': {
        description: 'Sıfır Nissan Magnite. Kompakt crossover, şəhər üçün ideal. Rəqəmsal panel, multimedia sistem.'
    },
    'Peugeot 406': {
        description: 'Peugeot 406, klassik və etibarlı avtomobil. Əla qiymət, yaxşı vəziyyətdə.'
    },
    'Porsche Panamera Turbo': {
        description: 'Porsche Panamera Turbo, az qaçılmış, eksklüziv avtomobil. 550 at gücü, maksimum komfort və performans.'
    },
    'Toyota Land Crusier Prado': {
        description: 'Toyota Land Cruiser Prado, off-road üçün əla. Etibarlı mühərrik, güclü asma. Ailə üçün ideal.'
    },
    'KIA K5': {
        description: 'KIA K5 2023, az qaçılmış, ideal vəziyyətdə. Premium intерyer, böyük ekran, bütün təhlükəsizlik sistemləri.'
    }
};

document.querySelectorAll('.car-card button').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.car-card');
        const img = card.querySelector('img').src;
        const price = card.querySelector('h2').textContent;
        const name = card.querySelector('h3').textContent;
        const specs = card.querySelector('p').textContent.split(', ');
        
        modalImg.src = img;
        modalPrice.textContent = price;
        modalName.textContent = name;
        modalYear.textContent = specs[0];
        modalEngine.textContent = specs[1];
        modalMileage.textContent = specs[2];
        
        
        if (carDetails[name]) {
            modalDescription.textContent = carDetails[name].description;
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