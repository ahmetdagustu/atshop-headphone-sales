import { products } from './products.js';

// Döviz kuru alma fonksiyonu
async function getExchangeRate(toCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await response.json();
    return data.rates[toCurrency];
}

// Fiyatları çevirme ve HTML güncelleme fonksiyonu
async function convertPrices(currency) {
    const rate = await getExchangeRate(currency);

    products.forEach(product => {
        const convertedPrice = Math.round(product.price * rate);
        const convertedOriginalPrice = Math.round(product.originalPrice * rate);

        document.querySelectorAll(`#price-${product.id}`).forEach((el) => {
            el.innerText = `${getCurrencySymbol(currency)}${convertedPrice}`;
        });

        document.querySelectorAll(`#originalPrice-${product.id}`).forEach((el) => {
            el.innerHTML = `<del>${getCurrencySymbol(currency)}${convertedOriginalPrice}</del>`;
        });
    });
}

// Para birimi sembolünü getiren fonksiyon
function getCurrencySymbol(currency) {
    switch (currency) {
        case 'TRY':
            return '₺';
        case 'EUR':
            return '€';
        case 'USD':
        default:
            return '$';
    }
}

// Para birimi değiştiğinde fiyatları güncelleme
document.addEventListener('DOMContentLoaded', function () {
    const currencySelect = document.getElementById('flag');
    if (currencySelect) {
        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;
            await convertPrices(selectedCurrency);
        });
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const productRow = document.getElementById('productRow');
    let currentPage = 1;
    const productsPerPage = window.innerWidth <= 768 ? 8 : 12;
    const pagination = document.getElementById('pagination');

    // Ürünlerin görüntülenmesi
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
            productCard.className = 'col-md-4';
            productCard.classList.add("col-12", "col-md-6", "col-lg-4", "models", "models-img", "shop");

            productCard.innerHTML = `
           <div class="product-image-container">
             <div class="swiper-container product-slider d-md-none">
               <div class="swiper-wrapper">
                 <div class="swiper-slide">
                   <img class="img-fluid first-image" src="${product.image}" alt="${product.name}"/>
                 </div>
                 <div class="swiper-slide">
                   <img class="img-fluid second-image" src="${product.image2}" alt="${product.name}"/>
                 </div>
               </div>
               <div class="swiper-pagination"></div>
             </div>
             <img class="img-fluid first-image d-none d-md-block" src="${product.image}" alt="${product.name}"/>
             <img class="img-fluid second-image d-none d-md-block" src="${product.image2}" alt="${product.name}"/>
           </div>
           
           <div class="detaly d-inline">
             <span class="head z-3">
               <button class="btn btn-dark shop-now" data-product-id="${product.id}">SHOP NOW</button>
               <button class="btn btn-dark btn-dark-1 cart-btn-1">
                 <i class="fa-solid fa-cart-shopping"></i>
               </button>
               <button class="btn btn-dark like-btn-1" data-product-id="${product.id}">
                 <i class="fa-solid fa-heart"></i>
               </button>
             </span>
           </div>
           
           <div class="text-center">
             <p class="card-title-1">${product.name}</p>
             <p>
               <del id="originalPrice-${product.id}" class="">$${product.originalPrice}</del>
               <span id="price-${product.id}" class="px-2 fw-bold price" style="color: red">$${product.price}</span>
             </p>
           </div>
        `;
    
        productRow.appendChild(productCard);
    
        // Sadece mobilde Swiper'ı başlat
        if (window.innerWidth <= 767) {
            const swiper = new Swiper(productCard.querySelector('.swiper-container'), {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true, // Sonsuz kaydırma
            // Otomatik kaydırmayı kaldırıyoruz, böylece kullanıcı manuel kaydırabilir
            autoplay: false,
            });
        }


            // SHOP NOW butonuna basıldığında ürün sayfasına yönlendirme
            productCard.querySelector('.shop-now').addEventListener('click', function () {
                const productId = this.getAttribute('data-product-id');
                window.location.href = `shop-page.html?id=${productId}`;
            });
        });

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

// Email abonelik işlemi
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('subscribeButton').addEventListener('click', showSubscribeMessage);
});

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const showSubscribeMessage = () => {
    const emailInput = document.getElementById('emailInput').value.trim();

    if (!validateEmail(emailInput)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert(`Subscribed successfully with email: ${emailInput}`);
};

// Filtre açma/kapama fonksiyonu
document.getElementById('filter-toggle').addEventListener('click', function() {
    const filterSection = document.getElementById('filter-section');
    const applyFilterBtn = document.getElementById('apply-filter');
    const filterToggleBtn = document.getElementById('filter-toggle');

    if (filterSection.style.display === 'none' || filterSection.style.display === '') {
        filterSection.style.display = 'block';
        applyFilterBtn.style.display = 'block';
        filterToggleBtn.style.display = 'none'; 
    }
});

document.getElementById('apply-filter').addEventListener('click', function() {
    const filterSection = document.getElementById('filter-section');
    const applyFilterBtn = document.getElementById('apply-filter');
    const filterToggleBtn = document.getElementById('filter-toggle');
    
    filterSection.style.display = 'none';
    applyFilterBtn.style.display = 'none';
    filterToggleBtn.style.display = 'block';
});
