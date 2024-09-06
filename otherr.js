import { products } from './products.js';
let totalPrice = 0;

async function getExchangeRate(toCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await response.json();
    return data.rates[toCurrency];
}

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
        const productDiv = document.createElement("div");
        productDiv.classList.add("col-12", "col-md-6", "col-lg-4", "models", "models-img", "shop");
        
        productDiv.innerHTML = `
           <div class="product-image-container">
             <!-- Mobilde kaydırma için swiper, PC'de sadece resim -->
             <div class="swiper-container product-slider d-md-none">
               <div class="swiper-wrapper">
                 <div class="swiper-slide">
                   <img class="img-fluid first-image" src="${product.image}" alt="${product.name}"/>
                 </div>
                 <div class="swiper-slide">
                   <img class="img-fluid second-image" src="${product.image2}" alt="${product.name}"/>
                 </div>
               </div>
               <!-- Pagination (kaydırma noktaları) -->
               <div class="swiper-pagination"></div>
             </div>
    
             <!-- PC'de hover efekti için -->
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
    
        targetRow.appendChild(productDiv);
    
       // Sadece mobilde Swiper'ı başlat
        if (window.innerWidth <= 767) {
            const swiper = new Swiper(productDiv.querySelector('.swiper-container'), {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                loop: true,
                autoplay: false,         
            });
        }

    
        const btnShopNow = productDiv.querySelector(".shop-now");
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
        <div class="card" style="border: none; background-color: #f1f1f1">
            <div class="row shop-clc-card">
            <div class="col-8">
                <div class="card-body d">
                <h5 class="card-title">${category.name}</h5>
                <a href="#" class="btn btn-dark shop-clc" data-category="${category.name}">SHOP COLLECTION</a>
                </div>
            </div>
            <div class="col-4">
                <img src="${product.image}" class="img-fluid" alt="${product.name}"/>
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

    productContainer.innerHTML = `
        <div class="row align-content-center">
            <div class="col-4">
                <img class="img-fluid" src="${product.image}" alt="${product.name}"/>
            </div>
            <div class="col-8">
                <h2>${product.name}</h2>
                <p>${product.description.substring(0, 100)}...</p>
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
