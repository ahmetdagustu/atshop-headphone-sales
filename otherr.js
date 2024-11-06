import { convertPrices, createProductHTML, showSubscribeMessage } from './common.js';
import { handleCurrencySelection } from './common.js';

// Zaman aşımı fonksiyonu
function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
}

// Global products değişkenini tanımlıyoruz
let products = [];

// API'den veriyi çekiyoruz ve ardından işlemleri başlatıyoruz
console.log("API isteği başlatılıyor...");
fetchWithTimeout('http://localhost:3000/products')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("API isteği başarılı, veri alındı.");
        return response.json();
    })
    .then(data => {
        console.log("Veri işleniyor...");
        products = data; // Global products değişkenine veriyi atıyoruz

        // Ürün verisi geldikten sonra aşağıdaki fonksiyonları çalıştırıyoruz
        renderLatestProducts(products, productRow);
        renderBestSellingProducts(products, bestSellingProductRow);
        createCarouselItems(products);
        createShopCollections(products);
        displayRandomProduct(); // Son olarak rastgele bir ürün gösteriyoruz
    })
    .catch(error => console.error('Veri çekilirken hata oluştu:', error));

// Para birimi değiştiğinde fiyatları güncelleme
document.addEventListener('DOMContentLoaded', function () {
    const currencySelect = document.getElementById('flag');
    if (currencySelect) {
        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;
            localStorage.setItem('selectedCurrency', selectedCurrency); // Seçilen para birimini kaydet
            await convertPrices(selectedCurrency, products);
        });
    }
});

// Event listener'lar ve diğer işlemler
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('viewAllBestSellingButton').addEventListener('click', function () {
        window.location.href = 'filter.html';
    });

    document.getElementById('viewAllButton').addEventListener('click', function () {
        window.location.href = 'filter.html';
    });

    document.querySelectorAll('.shop-now').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const productId = this.getAttribute('data-product-id');
            window.location.href = `shop-page.html?id=${productId}`;
        });
    });

    document.getElementById('subscribeButton').addEventListener('click', showSubscribeMessage);
});

// Fonksiyonlar
function displayRandomProduct() {
    if (!products || products.length === 0) {
        console.error('Ürün listesi boş veya tanımlı değil.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];
    const productContainer = document.getElementById('dynamic-product');

    function getDescriptionText() {
        if (window.innerWidth <= 768) {
            return product.description.split(".")[0] + "...";
        } else {
            return product.description;
        }
    }

    productContainer.innerHTML = `
        <div class="row align-content-center">
            <div class="col-4">
                <img class="img-fluid" src="${product.image}" alt="${product.name}"/>
            </div>
            <div class="col-8">
                <h2>${product.name}</h2>
                <p>${getDescriptionText()}</p>
                <button class="btn btn-dark shop-now btn-lg" data-product-id="${product.id}">SHOP NOW</button>
            </div>
        </div>
    `;

    const shopNowButton = productContainer.querySelector('.shop-now');
    shopNowButton.addEventListener('click', function () {
        const productId = this.getAttribute('data-product-id');
        window.location.href = `shop-page.html?id=${productId}`;
    });
}

// Ürünleri sıralama ve filtreleme fonksiyonları
function sortProductsByDate(products) {
    return products.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
}

function filterAndSortBestSellingProducts(products) {
    return products
        .filter(product => product.onSale)
        .sort((a, b) => b.unitsSold - a.unitsSold);
}

// Ürünleri render etme fonksiyonları
function renderProducts(products, targetRow) {
    const screenWidth = window.innerWidth;
    let displayedProducts = products;

    if (screenWidth <= 767) {
        displayedProducts = products.slice(0, 4);
    }

    displayedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-12", "col-md-6", "col-lg-4", "models", "models-img", "shop");
        
       // createProductHTML fonksiyonunu çağırarak HTML'yi oluştur
       productCard.innerHTML = createProductHTML(product);
    
        targetRow.appendChild(productCard);
    
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
    
        const btnShopNow = productCard.querySelector(".shop-now");
        btnShopNow.addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            goToProduct(productId);
        });
    });      
}

function renderLatestProducts(products, targetRow) {
    const sortedProducts = sortProductsByDate(products);
    renderProducts(sortedProducts.slice(0, 8), targetRow);
}

function renderBestSellingProducts(products, targetRow) {
    const bestSellingProducts = filterAndSortBestSellingProducts(products);
    renderProducts(bestSellingProducts.slice(0, 8), targetRow);
}

// Carousel ve koleksiyon öğelerini oluşturma fonksiyonları
function createCarouselItems(products) {
    const randomIndexes = getRandomIndexes(products.length, 3);
    const carouselContainer = document.querySelector('.carousel-inner');

    randomIndexes.forEach((index, i) => {
        const product = products[index];

        let limitedDescription = product.description;
        if (window.innerWidth <= 767 && limitedDescription) {
            const sentences = limitedDescription.match(/[^\.!\?]+[\.!\?]+/g);
            if (sentences) {
                limitedDescription = sentences[0];
            }
        } else if (limitedDescription) {
            const sentences = limitedDescription.match(/[^\.!\?]+[\.!\?]+/g);
            if (sentences && sentences.length > 1) {
                limitedDescription = sentences.slice(0, 2).join(" ");
            }
        }

        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item d-flex ${i === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
        <div class="col-6 align-content-center fw-bold">
            <h5 class="f-name">${product.name}</h5>
            <p class="description">${limitedDescription}</p>
            <button class="btn btn-dark shop-now" data-product-id="${product.id}">SHOP NOW</button>
        </div>
        <img class="col-6 img-1" src="${product.image}" class="d-block w-100" alt="${product.name}"/>
        `;
        carouselContainer.appendChild(carouselItem);
    });
}

function createShopCollections(products) {
    const categories = [
        { name: 'Sport Headphones', className: 'shop-clcsport' },
        { name: 'Over-ear Headphone', className: 'shop-clcoverear' },
        { name: 'In-ear Headphone', className: 'shop-clcinear' },
    ];
    const shopCollectionContainer = document.querySelector('.shop-collection .row');

    categories.forEach((category, index) => {
        const product = products[index];
        const collectionItem = document.createElement('div');
        collectionItem.className = 'col-sm-4 mb-3 mb-sm-0';

        collectionItem.innerHTML = `
        <div class="card h-100" style="border: none; background-color: #f1f1f1">
          <div class="row shop-clc-card h-100">
            <div class="col-8 d-flex flex-column justify-content-between">
              <div class="card-body">
                <h5 class="card-title">${category.name}</h5>
                <a href="#" class="btn btn-dark shop-clc mt-auto" data-category="${category.name}">SHOP COLLECTION</a>
              </div>
            </div>
            <div class="col-4 d-flex align-items-center justify-content-center" id="hide-on-small">
                <img src="${product.image}" class="img-fluid" alt="${product.name}" />
            </div>
          </div>
        </div>
      `;
      
      shopCollectionContainer.appendChild(collectionItem);
    });
}

// Yardımcı Fonksiyon
function getRandomIndexes(arrayLength, numberOfItems) {
    const indexes = new Set();
    while (indexes.size < numberOfItems) {
        const randomIndex = Math.floor(Math.random() * arrayLength);
        indexes.add(randomIndex);
    }
    return Array.from(indexes);
}

window.goToProduct = function (productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};

window.addEventListener('resize', displayRandomProduct);
