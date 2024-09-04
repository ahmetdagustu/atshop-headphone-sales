import { products } from './products.js';
let totalPrice = 0;
const cart =[];

  

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

document.getElementById('flag').addEventListener('change', async function () {
    const selectedCurrency = this.value;
    await convertPrices(selectedCurrency);
});

const productRow = document.getElementById('productRow');
const bestSellingProductRow = document.getElementById('bestSellingProductRow');

const btnCard = document.querySelector(".btn-card");
const cardList = document.querySelector(".shopping-cart-list");

const btnLike = document.querySelector(".btn-card2");
const likeList = document.querySelector(".shopping-like-list");

class Shopping {
    constructor(title, price, image) {
        this.image = image;
        this.title = title;
        this.price = price;
    }
}

class Like {
    constructor(title, image) {
        this.image = image;
        this.title = title;
    }
}

class UI {
    cardToggle() {
        btnCard.addEventListener("click", function () {
            cardList.classList.toggle("d-none");
        });

        document.addEventListener("click", function (event) {
            if (!btnCard.contains(event.target) && !cardList.contains(event.target)) {
                cardList.classList.add("d-none");
            }
        });
    }

    likeToggle() {
        btnLike.addEventListener("click", function () {
            likeList.classList.toggle("d-none");
        });

        document.addEventListener("click", function (event) {
            if (!btnLike.contains(event.target) && !likeList.contains(event.target)) {
                likeList.classList.add("d-none");
            }
        });
    }

    cardCount() {
        let cardListItem = cardList.getElementsByClassName("list-item");
        let itemCount = document.getElementById("item-count");
        itemCount.innerHTML = cardListItem.length;
    }

    likeCount() {
        let likeListItem = likeList.getElementsByClassName("list-item");
        let itemCountLike = document.getElementById("item-count-like");
        itemCountLike.innerHTML = likeListItem.length;
    }

    removeCard() {
        let btnRemove = document.querySelectorAll(".shopping-cart-list .btn-delete");
        let self = this;
        btnRemove.forEach(function (button) {
            button.addEventListener("click", function () {
                const itemToRemove = button.closest(".list-item");
                itemToRemove.remove();
                self.updateTotalPrice();
                self.cardCount();

                if (cardList.getElementsByClassName("list-item").length === 0) {
                    document.getElementById("item-count").innerHTML = 0;
                  
                }
            });
        });
    }

    removeLike() {
        let btnRemove = document.querySelectorAll(".shopping-like-list .btn-delete");
        let self = this;
        btnRemove.forEach(function (button) {
            button.addEventListener("click", function () {
                const itemToRemove = button.closest(".list-item");
                itemToRemove.remove();
                self.likeCount();

                if (likeList.getElementsByClassName("list-item").length === 0) {
                    document.getElementById("item-count-like").innerHTML = 0;
                }
            });
        });
    }

    addToCard(shopping) {
        const existingItem = Array.from(cardList.getElementsByClassName('list-item'))
            .find(item => item.querySelector('.title').textContent === shopping.title);
    
        let price = parseFloat(shopping.price.replace('$', ''));

        if (existingItem) {
            const quantityElem = existingItem.querySelector('.quantity');
            const priceElem = existingItem.querySelector('.price');
    
            let quantity = parseInt(quantityElem.textContent.replace('x', '')) || 1;
            quantity++;
            quantityElem.textContent = `x${quantity}`;
    
            const newPrice = price * quantity;
            priceElem.textContent = `$${newPrice.toFixed(2)}`;
        } else {
            const listItem = document.createElement("div");
            listItem.classList = "list-item";
    
            listItem.innerHTML = `
            <div class="row align-items-center text-black">
                <div class="col-md-2">
                    <img class="img-fluid" src="${shopping.image}" alt="">
                </div>
                <div class="col-md-4">
                    <div class="title">${shopping.title}</div>
                </div>
                <div class="col-md-2">
                    <div class="quantity">x1</div>
                </div>
                <div class="col-md-2">
                    <div class="price">$${price.toFixed(2)}</div>
                </div>
                <div class="col-md-2 text-end">
                    <button class="btn btn-delete text-danger"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            `;
    
            cardList.appendChild(listItem);
        }
    
        this.updateTotalPrice();
        this.removeCard();
        this.cardCount();
    
        updateItemCounts();
    }
    
    updateTotalPrice() {
        totalPrice = 0;
        const items = Array.from(document.querySelectorAll('.shopping-cart-list .list-item'));
        
        console.log('Items in cart:', items.length);
    
        items.forEach(item => {
            const quantityElem = item.querySelector('.quantity');
            const priceElem = item.querySelector('.price');
    
            let quantity = parseInt(quantityElem.textContent.replace('x', '')) || 1;
            let price = parseFloat(priceElem.textContent.replace('$', ''));
    
            console.log(`Item price: ${price}, Quantity: ${quantity}`);
    
            totalPrice += price;
        });
    
        console.log('Total Price:', totalPrice);
    
    }
    


    addToLike(like, btnLike) {
        const listItem = document.createElement("div");
        listItem.classList = "list-item";

        listItem.innerHTML = `
        <div class="row align-items-center text-black">
            <div class="col-md-3">
                <img class="img-fluid" src="${like.image}" alt="">
            </div>
            <div class="col-md-7">
                <div class="title">${like.title}</div>
            </div>
            <div class="col-md-2 text-end">
                <button class="btn btn-delete text-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `;

        likeList.appendChild(listItem);
        this.removeLike();
        this.likeCount();

        btnLike.classList.add("disabled");
        btnLike.textContent = "Added";

        updateItemCounts();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '50%';
        notification.style.left = '50%';
        notification.style.transform = 'translate(-50%, -50%)';
        notification.style.backgroundColor = '#333';
        notification.style.color = '#fff';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '1000';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    toggleFavorite(product, btnFavorite) {
        const favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
        const index = favoritedProducts.findIndex(fav => fav.id === product.id);

        if (index === -1) {
            favoritedProducts.push(product);
            btnFavorite.classList.add('active');
            btnFavorite.innerHTML = '<i class="fa-solid fa-heart" style="color: red;"></i>';
            this.showNotification('Added to Favorites');
        } else {
            favoritedProducts.splice(index, 1);
            btnFavorite.classList.remove('active');
            btnFavorite.innerHTML = '<i class="fa-solid fa-heart"></i>';
            this.showNotification('Removed from Favorites');
        }

        localStorage.setItem('favoritedProducts', JSON.stringify(favoritedProducts));
        this.updateFavoriteCount();

        this.updateLikeList();
    }

    updateFavoriteCount() {
        const favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
        const itemCountLike = document.getElementById('item-count-like');
        itemCountLike.innerHTML = favoritedProducts.length;
    }

    updateLikeList() {
        const favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
        const likeList = document.querySelector(".shopping-like-list");
        likeList.innerHTML = '';

        favoritedProducts.forEach(product => {
            const listItem = document.createElement("div");
            listItem.classList = "list-item";

            listItem.innerHTML = `
            <div class="row align-items-center text-black">
                <div class="col-md-3">
                    <img class="img-fluid" src="${product.image}" alt="">
                </div>
                <div class="col-md-7">
                    <div class="title">${product.name}</div>
                </div>
                <div class="col-md-2 text-end">
                    <button class="btn btn-delete text-danger"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            `;

            likeList.appendChild(listItem);

            listItem.querySelector('.btn-delete').addEventListener('click', () => {
                const index = favoritedProducts.findIndex(fav => fav.id === product.id);
                if (index !== -1) {
                    favoritedProducts.splice(index, 1);
                    localStorage.setItem('favoritedProducts', JSON.stringify(favoritedProducts));
                    this.updateFavoriteCount();
                    this.updateLikeList();

                    const btnFavoriteInCard = document.querySelector(`.like-btn-1[data-product-id="${product.id}"]`);
                    if (btnFavoriteInCard) {
                        btnFavoriteInCard.classList.remove('active');
                        btnFavoriteInCard.innerHTML = '<i class="fa-solid fa-heart"></i>';
                    }
                }
            });
        });
    }

    addToCardWithNotification(shopping) {
        this.addToCard(shopping);
        this.showNotification('Added to Cart');
    }
}

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
            <img class="img-fluid show-image first-image" src="${product.image}" alt="${product.name}"/>
            <img class="img-fluid second-image" src="${product.image2}" alt="${product.name}" />
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

        const btnShopNow = productDiv.querySelector(".shop-now");
        btnShopNow.addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            goToProduct(productId);
        });

        const btnAdd = productDiv.querySelector(".cart-btn-1");
        btnAdd.addEventListener("click", function (e) {
            let title = product.name;
            let price = `$${product.price}`;
            let image = product.image;

            let shopping = new Shopping(title, price, image);
            let ui = new UI();
            ui.addToCardWithNotification(shopping, btnAdd);

            e.preventDefault();
        });

        const btnFavorite = productDiv.querySelector(".like-btn-1");
        btnFavorite.addEventListener("click", function (e) {
            let ui = new UI();
            ui.toggleFavorite(product, btnFavorite);

            e.preventDefault();
        });

        const favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
        const isFavorited = favoritedProducts.some(fav => fav.id === product.id);

        if (isFavorited) {
            btnFavorite.classList.add('active');
            btnFavorite.innerHTML = '<i class="fa-solid fa-heart" style="color: red;"></i>';
        }
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

document.addEventListener("DOMContentLoaded", () => {
    let ui = new UI();
    ui.cardToggle();
    ui.likeToggle();
    ui.updateLikeList();

    renderLatestProducts(products, productRow);

    renderBestSellingProducts(products, bestSellingProductRow);
});

window.goToProduct = function (productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};

document.getElementById('viewAllBestSellingButton').addEventListener('click', function () {
    window.location.href = 'filter.html';
});

document.getElementById('viewAllButton').addEventListener('click', function () {
    window.location.href = 'filter.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const shopCollectionBtn = document.querySelector('.shop-clcsport');

    if (shopCollectionBtn) {
        shopCollectionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'filter.html?category=sport';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const shopCollectionBtn = document.querySelector('.shop-clcoverear');

    if (shopCollectionBtn) {
        shopCollectionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'filter.html?category=over-ear';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const shopCollectionBtn = document.querySelector('.shop-clcinear');

    if (shopCollectionBtn) {
        shopCollectionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'filter.html?category=in-ear';
        });
    }
});

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

document.addEventListener('DOMContentLoaded', () => {
    createCarouselItems(products);
    createShopCollections(products);
});

function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}

function truncateTextForMobile(text) {
    if (window.innerWidth <= 767) {
        const sentences = text.match(/[^.!?]+[.!?]/g);
        if (sentences && sentences.length > 0) {
            return sentences[0];
        }
    }
    return text;
}

function displayRandomProduct() {
    const randomIndex = getRandomIndex(products.length);
    const product = products[randomIndex];

    const productContainer = document.getElementById('dynamic-product');

    const truncatedDescription = truncateTextForMobile(product.description);

    productContainer.innerHTML = `
        <div class="row align-content-center">
            <div class="col-4">
                <img class="img-fluid" src="${product.image}" alt="${product.name}"/>
            </div>
            <div class="col-8">
                <h2>${product.name}</h2>
                <p>${truncatedDescription}</p>
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

document.addEventListener('DOMContentLoaded', displayRandomProduct);

window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 767) {
    } else if (screenWidth <= 1024) {
    } else {
    }
});

document.querySelector('.hamburger-menu').addEventListener('click', function () {
    document.querySelector('.navbar-mobile').classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

document.querySelector('.close-menu').addEventListener('click', function () {
    document.querySelector('.navbar-mobile').classList.remove('active');
    document.body.classList.remove('menu-open');
});

function updateItemCounts() {
    const itemCountLike = document.getElementById('item-count-like');
    const itemCountCart = document.getElementById('item-count');

    const mobileItemCountLike = document.getElementById('item-count-like-mobile');
    const mobileItemCountCart = document.getElementById('item-count-mobile');

    const likeCount = itemCountLike.textContent;
    const cartCount = itemCountCart.textContent;

    mobileItemCountLike.textContent = likeCount;
    mobileItemCountCart.textContent = cartCount;
}

document.addEventListener('DOMContentLoaded', function () {
    const itemCountLike = document.getElementById('item-count-like');
    const itemCountCart = document.getElementById('item-count');
    
    const mobileItemCountLike = document.getElementById('item-count-like-mobile');
    const mobileItemCountCart = document.getElementById('item-count-mobile');

    function updateMobileCartList() {
        const cartListItems = document.querySelector('#cart-list-items-desktop').innerHTML;
        document.querySelector('#cart-list-items-mobile').innerHTML = cartListItems;
        updateTotalPrice();
        setupDeleteButtons();
    }

    function updateMobileLikeList() {
        const likeListItems = document.querySelector('.shopping-like-list').innerHTML;
        document.querySelector('#like-list-items-mobile').innerHTML = likeListItems;
        setupDeleteButtons();
    }

    function setupDeleteButtons() {
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function () {
                const itemToRemove = button.closest('.list-item');
                itemToRemove.remove();
                updateTotalPrice();
                updateItemCounts();
            });
        });
    }

    updateItemCounts();

    document.addEventListener('click', function (e) {
        if (e.target.closest('.cart-btn-1') || e.target.closest('.like-btn-1')) {
            updateItemCounts();
            updateMobileCartList();
            updateMobileLikeList();
        }
    });

    document.querySelector('.btn-card-mobile').addEventListener('click', function () {
        const cartList = document.querySelector('.mobile-shopping-cart-list');
        const likeList = document.querySelector('.mobile-shopping-like-list');

        cartList.classList.toggle('d-none');
        likeList.classList.add('d-none');

        const cartButton = this.getBoundingClientRect();
        cartList.style.top = `${cartButton.bottom + 10}px`;
    });

    document.querySelector('.btn-card2-mobile').addEventListener('click', function () {
        const cartList = document.querySelector('.mobile-shopping-cart-list');
        const likeList = document.querySelector('.mobile-shopping-like-list');

        likeList.classList.toggle('d-none');
        cartList.classList.add('d-none');

        const likeButton = this.getBoundingClientRect();
        likeList.style.top = `${likeButton.bottom + 10}px`;
    });

    document.addEventListener('click', function (event) {
        const cartList = document.querySelector('.mobile-shopping-cart-list');
        const likeList = document.querySelector('.mobile-shopping-like-list');

        if (!event.target.closest('.btn-card-mobile') && !cartList.contains(event.target)) {
            cartList.classList.add('d-none');
        }

        if (!event.target.closest('.btn-card2-mobile') && !likeList.contains(event.target)) {
            likeList.classList.add('d-none');
        }
    });

    function updateTotalPrice() {
        const totalPriceElemPC = document.getElementById('total-price');    
        if (totalPriceElemPC) {
            totalPriceElemPC.textContent = `Total: $${totalPrice.toFixed(2)}`;
            console.log('PC toplam fiyatı güncellendi:', totalPriceElemPC.textContent);
        } else {
            console.error('PC için toplam fiyat elementi bulunamadı');
        }
    
        const totalPriceElemMobile = document.getElementById('total-price-mobile');
        if (totalPriceElemMobile) {
            totalPriceElemMobile.textContent = `Total: $${totalPrice.toFixed(2)}`;
            console.log('Mobil toplam fiyatı güncellendi:', totalPriceElemMobile.textContent);
        } else {
            console.error('Mobil için toplam fiyat elementi bulunamadı');
        }
    }

    setupDeleteButtons();
});

document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth <= 767) {
        document.querySelectorAll('.text-content').forEach(function(paragraph) {
            const sentences = paragraph.innerText.split('. ');
            if (sentences.length > 0) {
                paragraph.innerText = sentences[0] + '...';
            }
        });
    }
});

document.getElementById("orderTrackingTrigger").addEventListener("click", function() {
    var trackingModal = new bootstrap.Modal(document.getElementById('trackingModal'));
    trackingModal.show();
});