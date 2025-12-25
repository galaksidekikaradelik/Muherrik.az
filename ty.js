function clearAllAds() {
    const confirmDelete = confirm("Bütün elanları silmək istədiyinizdən əminsiniz?");
    if (confirmDelete) {

        localStorage.removeItem('userAds');
        alert("Bütün elanlar silindi!");
        location.reload(); 
    }
}


clearAllAds();