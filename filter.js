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
document.getElementById('flag').addEventListener('change', async function () {
    const selectedCurrency = this.value;
    await convertPrices(selectedCurrency);
});

// Shopping Cart Functionality
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
                self.updateTotalPrice();
                self.cardCount();

                if (cardList.getElementsByClassName("list-item").length === 0) {
                    document.getElementById("item-count").innerHTML = 0;
                    document.getElementById('total-price').textContent = '';
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
            quantityElem.textContent = quantity > 1 ? `x${quantity}` : '';

            const newPrice = price * quantity;
            priceElem.textContent = `$${newPrice}`;
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
                    <div class="quantity"></div>
                </div>
                <div class="col-md-2">
                    <div class="price">$${price}</div>
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
    }

    updateTotalPrice() {
        const prices = Array.from(cardList.getElementsByClassName('price'))
            .map(priceElem => parseFloat(priceElem.textContent.replace('$', '')));
        
        const totalPrice = prices.reduce((sum, price) => sum + price, 0);
        document.getElementById('total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
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

document.addEventListener('DOMContentLoaded', function () {
    const productsPerPage = 12;
    let currentPage = 1;

    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const productRow = document.getElementById('productRow');
    const pagination = document.getElementById('pagination');
    const ui = new UI();

    ui.cardToggle();
    ui.likeToggle();
    ui.updateFavoriteCount();
    ui.updateLikeList();

    // URL'den kategori parametresini al ve filtrelemeyi başlat
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        filterProductsByCategory(category);
    } else {
        displayProducts(products, currentPage); // Varsayılan olarak tüm ürünleri göster
    }

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    minPriceInput.addEventListener('input', filterProducts);
    maxPriceInput.addEventListener('input', filterProducts);

    function filterProductsByCategory(category) {
        const formattedCategory = category.trim().toLowerCase();
        const filteredProducts = products.filter(product => {
            return product.category.trim().toLowerCase() === formattedCategory;
        });

        displayProducts(filteredProducts, 1);
    }

    function filterProducts() {
        const selectedCategories = category ? [category] : [];
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

    // Sıralama işlevi
    document.getElementById('sort-options').addEventListener('change', function() {
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
            case 'mostFavorited':
                sortedProducts.sort((a, b) => b.favorited - a.favorited);
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
            productCard.classList.add("col-3", "models", "models-img", "shop");

            // Add special styling and button text change for onSale: false products
            if (!product.onSale) {
                productCard.classList.add('on-sale-false');
            }

            productCard.innerHTML = `
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

            productRow.appendChild(productCard);

            // Apply button text change for onSale: false products
            // Apply button text change for onSale: false products
            // Apply button text change and hide other buttons for onSale: false products
            if (!product.onSale) {
                const shopNowBtn = productCard.querySelector('.shop-now');
                const cartBtn = productCard.querySelector('.cart-btn-1');
                const likeBtn = productCard.querySelector('.like-btn-1');

                // Hide the original buttons
                shopNowBtn.style.display = 'none';
                cartBtn.style.display = 'none';
                likeBtn.style.display = 'none';

                // Create the Notify Me button
                const notifyBtn = document.createElement('button');
                notifyBtn.classList.add('btn', 'btn-dark', 'notify-btn');
                notifyBtn.textContent = 'Notify Me';

                // Append the Notify Me button
                productCard.querySelector('.detaly span').appendChild(notifyBtn);

                // Add click event to Notify Me button
                notifyBtn.addEventListener('click', function () {
                    ui.showNotification('You will be notified');
                });
            }

            // SHOP NOW butonuna basıldığında ürün sayfasına yönlendirme
            productCard.querySelector('.shop-now').addEventListener('click', function () {
                const productId = this.getAttribute('data-product-id');
                window.location.href = `shop-page.html?id=${productId}`;
            });

            // Sepete ekleme butonu
            const btnAdd = productCard.querySelector(".cart-btn-1");
            btnAdd.addEventListener("click", function (e) {
                let title = product.name;
                let price = `$${product.price}`;
                let image = product.image;

                let shopping = new Shopping(title, price, image);
                ui.addToCardWithNotification(shopping);
                e.preventDefault();
            });

            // Beğen butonu
            const btnFavorite = productCard.querySelector(".like-btn-1");
            btnFavorite.addEventListener("click", function (e) {
                ui.toggleFavorite(product, btnFavorite);
                e.preventDefault();
            });

            // Favori durumunu güncelleme
            const favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
            const isFavorited = favoritedProducts.some(fav => fav.id === product.id);

            if (isFavorited) {
                const btnFavorite = productCard.querySelector(".like-btn-1");
                btnFavorite.classList.add('active');
                btnFavorite.innerHTML = '<i class="fa-solid fa-heart" style="color: red;"></i>'; // Kırmızıya döndür
            }
        });

        setupPagination(products.length);
    }

    function setupPagination(totalProducts) {
        pagination.innerHTML = '';

        const totalPages = Math.ceil(totalProducts / productsPerPage);

        const prevPageItem = document.createElement('li');
        prevPageItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevPageItem.innerHTML = `<a class="page-link" href="#">Previous</a>`;
        prevPageItem.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                filterProducts();
            }
        });
        pagination.appendChild(prevPageItem);

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageItem.addEventListener('click', () => {
                currentPage = i;
                filterProducts();
            });
            pagination.appendChild(pageItem);
        }

        const nextPageItem = document.createElement('li');
        nextPageItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextPageItem.innerHTML = `<a class="page-link" href="#">Next</a>`;
        nextPageItem.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                filterProducts();
            }
        });
        pagination.appendChild(nextPageItem);
    }
});

window.goToProduct = function (productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};

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
