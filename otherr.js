import { products } from './products.js';
import { convertPrices, createProductHTML, showSubscribeMessage } from './common.js';
import { handleCurrencySelection } from './common.js';


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


const productRow = document.getElementById('productRow');
const bestSellingProductRow = document.getElementById('bestSellingProductRow');



function sortProductsByDate(products) {
    return products.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
}

function filterAndSortBestSellingProducts(products) {
    return products
        .filter(product => product.onSale)
        .sort((a, b) => b.unitsSold - a.unitsSold);
}

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


window.goToProduct = function (productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};

const carouselContainer = document.querySelector('.carousel-inner');
const shopCollectionContainer = document.querySelector('.shop-collection .row');

function getRandomIndexes(arrayLength, numberOfItems) {
    const indexes = new Set();
    while (indexes.size < numberOfItems) {
        const randomIndex = Math.floor(Math.random() * arrayLength);
        indexes.add(randomIndex);
    }
    return Array.from(indexes);
}

function createCarouselItems(products) {
    const randomIndexes = getRandomIndexes(products.length, 3);

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

    document.querySelectorAll('.shop-now').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const productId = this.getAttribute('data-product-id');
            window.location.href = `shop-page.html?id=${productId}`;
        });
    });
}
function createShopCollections(products) {
    const categories = [
        { name: 'Sport Headphones', className: 'shop-clcsport' },
        { name: 'Over-ear Headphone', className: 'shop-clcoverear' },
        { name: 'In-ear Headphone', className: 'shop-clcinear' },
    ];

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
      
        document.querySelectorAll('.shop-clc').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const categoryName = this.getAttribute('data-category').trim().toLowerCase();
                window.location.href = `filter.html?category=${encodeURIComponent(categoryName)}`;
            });
        });
    });
}

document.getElementById('viewAllBestSellingButton').addEventListener('click', function () {
    window.location.href = 'filter.html';
});

document.getElementById('viewAllButton').addEventListener('click', function () {
    window.location.href = 'filter.html';
});


function displayRandomProduct() {
    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];

    const productContainer = document.getElementById('dynamic-product');

    // Ekran genişliğine göre açıklamayı ayarlayan fonksiyon
    function getDescriptionText() {
        if (window.innerWidth <= 768) {
            // Mobilde sadece ilk cümleyi göster
            return product.description.split(".")[0] + "...";
        } else {
            // PC'de tam açıklamayı göster
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

// Sayfa yüklendiğinde ve pencere boyutu değiştiğinde açıklamayı güncelle
window.addEventListener('resize', displayRandomProduct);
displayRandomProduct();





document.addEventListener('DOMContentLoaded', function () {
    const currencySelect = document.getElementById('flag');
    if (currencySelect) {
        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;
            await convertPrices(selectedCurrency);
        });
    }

    renderLatestProducts(products, productRow);
    renderBestSellingProducts(products, bestSellingProductRow);

    const sportBtn = document.querySelector('.shop-clcsport');
    if (sportBtn) {
        sportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'filter.html?category=sport';
        });
    }

    const overEarBtn = document.querySelector('.shop-clcoverear');
    if (overEarBtn) {
        overEarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'filter.html?category=over-ear';
        });
    }

    const inEarBtn = document.querySelector('.shop-clcinear');
    if (inEarBtn) {
        inEarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'filter.html?category=in-ear';
        });
    }

    createCarouselItems(products);
    createShopCollections(products);

    displayRandomProduct();
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('subscribeButton').addEventListener('click', showSubscribeMessage);
});