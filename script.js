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

        // Hem Latest hem de Best Selling bölümlerini güncelle
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
document.getElementById('flag').addEventListener('change', async function () {
    const selectedCurrency = this.value; // value doğrudan "USD", "TRY", "EUR" olur
    await convertPrices(selectedCurrency);
});

const productRow = document.getElementById('productRow');
const bestSellingProductRow = document.getElementById('bestSellingProductRow');

const btnCard = document.querySelector(".btn-card");
const cardList = document.querySelector(".shopping-cart-list");

const btnLike = document.querySelector(".btn-card2");
const likeList = document.querySelector(".shopping-like-list");

// Shopping and Like Functionality
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

    addToCard(shopping, btnAdd) {
        const listItem = document.createElement("div");
        listItem.classList = "list-item";

        listItem.innerHTML = `
        <div class="row align-items-center text-black">
            <div class="col-md-3">
                <img class="img-fluid" src="${shopping.image}" alt="">
            </div>
            <div class="col-md-5">
                <div class="title">${shopping.title}</div>
            </div>
            <div class="col-md-2">
                <div class="price">${shopping.price}</div>
            </div>
            <div class="col-md-2 text-end">
                <button class="btn btn-delete text-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `;

        cardList.appendChild(listItem);
        this.removeCard(); // Bu fonksiyonu çağırarak sepetten ürün silinmesini sağlıyoruz
        this.cardCount();  // Sepetteki ürün sayısını güncelliyoruz

        btnAdd.classList.add("disabled");
        btnAdd.textContent = "In Cart";
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
    }

    // Show notification message
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
        }, 3000); // 3 saniye sonra bildirim kaldırılır
    }

    // Toggle favorite status
    toggleFavorite(product, btnFavorite) {
        const favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
        const index = favoritedProducts.findIndex(fav => fav.id === product.id);

        if (index === -1) {
            favoritedProducts.push(product);
            btnFavorite.classList.add('active');
            btnFavorite.innerHTML = '<i class="fa-solid fa-heart" style="color: red;"></i>'; // Kalp kırmızıya dönsün
            this.showNotification('Added to Favorites');
        } else {
            favoritedProducts.splice(index, 1);
            btnFavorite.classList.remove('active');
            btnFavorite.innerHTML = '<i class="fa-solid fa-heart"></i>'; // Kalp normale dönsün
            this.showNotification('Removed from Favorites');
        }

        localStorage.setItem('favoritedProducts', JSON.stringify(favoritedProducts));
        this.updateFavoriteCount();

        // Navbar'daki favoriler listesini güncelle
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
        likeList.innerHTML = ''; // Mevcut favori listesi temizle

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

            // Silme butonuna tıklandığında ürünü favorilerden çıkar
            listItem.querySelector('.btn-delete').addEventListener('click', () => {
                const index = favoritedProducts.findIndex(fav => fav.id === product.id);
                if (index !== -1) {
                    favoritedProducts.splice(index, 1);
                    localStorage.setItem('favoritedProducts', JSON.stringify(favoritedProducts));
                    this.updateFavoriteCount();
                    this.updateLikeList();

                    // Kart üzerindeki kalbin de güncellenmesini sağla
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

// Ürünleri yüklenme tarihine göre sıralayan fonksiyon (en yeni tarih ilk sırada)
function sortProductsByDate(products) {
    return products.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
}

// En çok satan ürünleri filtreleyip sıralayan fonksiyon (onSale: true ve unitsSold'a göre)
function filterAndSortBestSellingProducts(products) {
    return products
        .filter(product => product.onSale) // Sadece onSale: true olan ürünleri al
        .sort((a, b) => b.unitsSold - a.unitsSold); // unitsSold değerine göre sırala (en çok satan ilk sırada)
}

// Ürünleri belirli bir sırayla hedef bölüme ekleyen fonksiyon
function renderProducts(products, targetRow) {
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("col-3", "models", "models-img", "shop");
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

        // SHOP NOW butonuna tıklama olayı
        const btnShopNow = productDiv.querySelector(".shop-now");
        btnShopNow.addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            goToProduct(productId);
        });

        // Sepete ekle butonuna tıklama olayı
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

        // Favorilere ekle butonuna tıklama olayı
        const btnFavorite = productDiv.querySelector(".like-btn-1");
        btnFavorite.addEventListener("click", function (e) {
            let ui = new UI();
            ui.toggleFavorite(product, btnFavorite);

            e.preventDefault();
        });

        // Favori durumunu güncelleme
        const favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
        const isFavorited = favoritedProducts.some(fav => fav.id === product.id);

        if (isFavorited) {
            btnFavorite.classList.add('active');
            btnFavorite.innerHTML = '<i class="fa-solid fa-heart" style="color: red;"></i>'; // Kırmızıya döndür
        }
    });
}

// En yeni 8 ürünü gösteren fonksiyon
function renderLatestProducts(products, targetRow) {
    const sortedProducts = sortProductsByDate(products); // Ürünleri yüklenme tarihine göre sırala
    renderProducts(sortedProducts.slice(0, 8), targetRow); // En yeni 8 ürünü göster
}

// En çok satan 8 ürünü gösteren fonksiyon
function renderBestSellingProducts(products, targetRow) {
    const bestSellingProducts = filterAndSortBestSellingProducts(products);
    renderProducts(bestSellingProducts.slice(0, 8), targetRow); // En çok satan 8 ürünü göster
}

// Initialize the UI and load the products on page load
document.addEventListener("DOMContentLoaded", () => {
    let ui = new UI();
    ui.cardToggle();
    ui.likeToggle();
    ui.updateLikeList();

    renderLatestProducts(products, productRow); // En yeni 8 ürünü Latest Products bölümünde göster

    renderBestSellingProducts(products, bestSellingProductRow); // En çok satan 8 ürünü Best Selling bölümünde göster
});

window.goToProduct = function (productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};

// Adding event listener for the View All button under the Best Selling section
document.getElementById('viewAllBestSellingButton').addEventListener('click', function () {
    window.location.href = 'filter.html';
});

// Adding event listener for the all view button
document.getElementById('viewAllButton').addEventListener('click', function () {
    window.location.href = 'filter.html';
});

// Adding event listeners for shop collection sport
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

// Carousel ve shop collection bölümlerini oluşturacak konteyner elementleri
const carouselContainer = document.querySelector('.carousel-inner');
const shopCollectionContainer = document.querySelector('.shop-collection .row');

// Rastgele benzersiz indeksler seçmek için bir yardımcı fonksiyon
function getRandomIndexes(arrayLength, numberOfItems) {
    const indexes = new Set();
    while (indexes.size < numberOfItems) {
        const randomIndex = Math.floor(Math.random() * arrayLength);
        indexes.add(randomIndex);
    }
    return Array.from(indexes);
}

function createCarouselItems(products) {
    const randomIndexes = getRandomIndexes(products.length, 3); // 3 rastgele ürünü seçiyoruz

    randomIndexes.forEach((index, i) => {
        const product = products[index];
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item d-flex ${i === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
        <div class="col-6 align-content-center fw-bold">
            <h5 class="f-name">${product.name}</h5>
            <h2 class="s-name">${product.brand}</h2>
            <p class="description">${product.description}</p>
            <button class="btn btn-dark shop-now" data-product-id="${product.id}">SHOP NOW</button>
        </div>
        <img class="col-6 img-1" src="${product.image}" class="d-block w-100" alt="${product.name}"/>
        `;
        carouselContainer.appendChild(carouselItem);
    });

    // "SHOP NOW" butonuna tıklama olayı
    document.querySelectorAll('.shop-now').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Bu satır carousel'in yanlışlıkla geçiş yapmasını engeller
            const productId = this.getAttribute('data-product-id');
            window.location.href = `shop-page.html?id=${productId}`;
        });
    });
}

// Fonksiyon: Shop collection bölümlerini oluşturma
function createShopCollections(products) {
    const categories = [
        { name: 'Sport Headphones', className: 'shop-clcsport' },
        { name: 'Over-ear Headphone', className: 'shop-clcoverear' },
        { name: 'In-ear Headphone', className: 'shop-clcinear' },
    ];

    categories.forEach((category, index) => {
        const product = products[index]; // Örnek olarak ilk üç ürünü kullanıyoruz

        const collectionItem = document.createElement('div');
        collectionItem.className = 'col-sm-4 mb-3 mb-sm-0';

        // collectionItem elementine içeriği tanımlıyoruz
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

        // Butona tıklama olayını yakalayıp filtre sayfasına yönlendirme
        document.querySelectorAll('.shop-clc').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Butonun default davranışını engelle
                const categoryName = this.getAttribute('data-category').trim().toLowerCase(); // Kategori ismini düzgün bir şekilde alın
                window.location.href = `filter.html?category=${encodeURIComponent(categoryName)}`;
            });
        });
    });
}

// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    createCarouselItems(products); // Rastgele ürünleri slider için oluşturuyoruz
    createShopCollections(products); // Shop collection için içerik oluşturuyoruz
});

function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}

function displayRandomProduct() {
    const randomIndex = getRandomIndex(products.length);
    const product = products[randomIndex];

    const productContainer = document.getElementById('dynamic-product');

    productContainer.innerHTML = `
        <div class="row align-content-center">
            <div class="col-4">
                <img class="img-fluid" src="${product.image}" alt="${product.name}"/>
            </div>
            <div class="col-8">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <button class="btn btn-dark shop-now btn-lg" data-product-id="${product.id}">SHOP NOW</button>
            </div>
        </div>
    `;

    // "SHOP NOW" butonuna tıklama olayı
    const shopNowButton = productContainer.querySelector('.shop-now');
    shopNowButton.addEventListener('click', function () {
        const productId = this.getAttribute('data-product-id');
        window.location.href = `shop-page.html?id=${productId}`;
    });
}

// Sayfa yüklendiğinde rastgele bir ürünü göster
document.addEventListener('DOMContentLoaded', displayRandomProduct);
