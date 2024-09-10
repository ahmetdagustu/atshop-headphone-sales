import { products } from './products.js';
import { convertPrices, createProductHTML, showSubscribeMessage } from './common.js';
// Para birimi değiştiğinde fiyatları güncelleme
document.addEventListener('DOMContentLoaded', function () {
    const currencySelect = document.getElementById('flag');
    if (currencySelect) {
        // Sayfa yüklendiğinde, localStorage'dan seçilen para birimini al
        const savedCurrency = localStorage.getItem('selectedCurrency');
        if (savedCurrency) {
            currencySelect.value = savedCurrency;
            convertPrices(savedCurrency, products);
        }

        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;

            // Seçilen para birimini Local Storage'a kaydet
            localStorage.setItem('selectedCurrency', selectedCurrency);

            // URL'den ürün ID'sini al
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'), 10);

            // Seçili ürünü bul
            const selectedProduct = products.find((p) => p.id === productId);

            // Fiyatları güncelle
            await convertPrices(selectedCurrency, products, selectedProduct);
        });
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);
    const selectedProduct = products.find((p) => p.id === productId);

    // Para birimi seçimini yönet
    await handleCurrencySelection(products, selectedProduct);
});


document.addEventListener('DOMContentLoaded', function () {
    // Döviz Kuru Seçimi
    const currencySelect = document.getElementById('flag');
    if (currencySelect) {
        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;
            await convertPrices(selectedCurrency, products);
        });
    }

    // Abonelik mesajı gösteren buton
    const subscribeButton = document.getElementById('subscribeButton');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', showSubscribeMessage);
    }

    // Ürünlerin görüntülenmesi
    const productRow = document.getElementById('productRow');
    let currentPage = 1;
    const productsPerPage = window.innerWidth <= 768 ? 8 : 12;
    const pagination = document.getElementById('pagination');

    function displayProducts(products, page) {
        productRow.innerHTML = '';
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const productsToDisplay = products.slice(start, end);

        if (productsToDisplay.length === 0) {
            productRow.innerHTML = '<div class="col-md-12"><p>No products match the selected criteria.</p></div>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add("col-12", "col-md-6", "col-lg-4", "models", "models-img", "shop");
        
            productCard.innerHTML = createProductHTML(product);
            productRow.appendChild(productCard);
        
            // Sadece mobilde Swiper'ı başlat
            if (window.innerWidth <= 767) {
                const swiper = new Swiper(productCard.querySelector('.swiper-container'), {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    loop: true,
                    autoplay: false,
                });
            }
        
            // onSale: false olan ürünlerde "Notify Me" butonu göster, diğer butonları gizle
            if (!product.onSale) {
                // on-sale-false class ekleyelim
                productCard.classList.add('on-sale-false');
        
                const shopNowBtn = productCard.querySelector('.shop-now');
                const cartBtn = productCard.querySelector('.cart-btn-1');
                const likeBtn = productCard.querySelector('.like-btn-1');
        
                // Orijinal butonları gizle
                shopNowBtn.style.display = 'none';
                cartBtn.style.display = 'none';
                likeBtn.style.display = 'none';
        
                // "Notify Me" butonunu oluştur
                const notifyBtn = document.createElement('button');
                notifyBtn.classList.add('btn', 'btn-dark', 'notify-btn');
                notifyBtn.textContent = 'Notify Me';
        
                // "Notify Me" butonunu ekleyelim
                productCard.querySelector('.detaly span').appendChild(notifyBtn);
        
                // "Notify Me" butonuna tıklama olayı ekleyelim
                notifyBtn.addEventListener('click', function () {
                    showNotification('You will be notified when the product is back in stock.');
                });
            }
        
            // SHOP NOW butonuna basıldığında ürün sayfasına yönlendirme
            productCard.querySelector('.shop-now').addEventListener('click', function () {
                const productId = this.getAttribute('data-product-id');
                window.location.href = `shop-page.html?id=${productId}`;
            });
        });
        
        // Bildirim fonksiyonu
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.top = '50%';
            notification.style.left = '50%';
            notification.style.transform = 'translate(-50%, -50%)';
            notification.style.backgroundColor = '#f5f5f5'; 
            notification.style.color = '#000';
            notification.style.padding = '15px 30px';
            notification.style.borderRadius = '8px';
            notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '1000';
            notification.textContent = message;
        
            document.body.appendChild(notification);
        
            setTimeout(() => {
                notification.remove();
            }, 4000); // 4 saniye sonra mesajı kaldır
        }
        
        

        setupPagination(products.length);
    }

    // Sayfalama fonksiyonu
    function setupPagination(totalProducts) {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        const prevPageItem = document.createElement('li');
        prevPageItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevPageItem.innerHTML = `<a class="page-link" href="#">Previous</a>`;
        prevPageItem.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProducts(products, currentPage);
            }
        });
        pagination.appendChild(prevPageItem);

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageItem.addEventListener('click', () => {
                currentPage = i;
                displayProducts(products, currentPage);
            });
            pagination.appendChild(pageItem);
        }

        const nextPageItem = document.createElement('li');
        nextPageItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextPageItem.innerHTML = `<a class="page-link" href="#">Next</a>`;
        nextPageItem.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts(products, currentPage);
            }
        });
        pagination.appendChild(nextPageItem);
    }

    // Ürünleri ilk sayfada göster
    displayProducts(products, currentPage);

    // Filtreleme işlemi
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    function filterProducts() {
        currentPage = 1; // Filtreleme yapıldığında sayfa numarasını sıfırla

        const selectedCategories = [];
        const selectedBrands = [];
        const selectedColors = [];
        const selectedRatings = [];
        let minPrice = parseFloat(minPriceInput.value) || 0;
        let maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        let hasMicrophone = null;

        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                if (checkbox.id.startsWith('wireless') || checkbox.id.startsWith('in-ear') ||
                    checkbox.id.startsWith('over-ear') || checkbox.id.startsWith('sport')) {
                    selectedCategories.push(checkbox.nextElementSibling.textContent);
                } else if (checkbox.id.startsWith('jbl') || checkbox.id.startsWith('beats') ||
                    checkbox.id.startsWith('logitech') || checkbox.id.startsWith('samsung') ||
                    checkbox.id.startsWith('sony')) {
                    selectedBrands.push(checkbox.nextElementSibling.textContent);
                } else if (checkbox.id.startsWith('blue') || checkbox.id.startsWith('white') ||
                    checkbox.id.startsWith('pink') || checkbox.id.startsWith('yellow')) {
                    selectedColors.push(checkbox.nextElementSibling.textContent);
                } else if (checkbox.id.startsWith('1-star') || checkbox.id.startsWith('2-stars') ||
                    checkbox.id.startsWith('3-stars') || checkbox.id.startsWith('4-stars') ||
                    checkbox.id.startsWith('4.5-stars') || checkbox.id.startsWith('5-stars')) {
                    selectedRatings.push(parseFloat(checkbox.nextElementSibling.textContent));
                } else if (checkbox.id === 'with-microphone') {
                    hasMicrophone = true;
                } else if (checkbox.id === 'without-microphone') {
                    hasMicrophone = false;
                }
            }
        });

        const filteredProducts = products.filter(product => {
            const inCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const inBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            const inColor = selectedColors.length === 0 || selectedColors.includes(product.color);
            const inRating = selectedRatings.length === 0 || selectedRatings.some(rating => product.rating >= rating);
            const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
            const matchesMicrophone = hasMicrophone === null || product.microphone === hasMicrophone;

            return inCategory && inBrand && inColor && inRating && inPriceRange && matchesMicrophone;
        });

        displayProducts(filteredProducts, currentPage);
    }

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    minPriceInput.addEventListener('input', filterProducts);
    maxPriceInput.addEventListener('input', filterProducts);

    // Sıralama işlemi
    document.getElementById('sort-options').addEventListener('change', function () {
        const sortBy = this.value;
        sortAndRenderProducts(sortBy);
    });

    function sortAndRenderProducts(sortBy) {
        let sortedProducts = [...products];

        switch (sortBy) {
            case 'recommended':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowestPrice':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'highestPrice':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'bestSelling':
                sortedProducts.sort((a, b) => b.unitsSold - a.unitsSold);
                break;
            case 'newest':
                sortedProducts.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                break;
            case 'mostReviewed':
                sortedProducts.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
        }

        displayProducts(sortedProducts, 1);
    }

    // Ekran boyutu değiştiğinde ürün sayısını güncelle
    window.addEventListener('resize', () => {
        displayProducts(products, currentPage);
    });
});
