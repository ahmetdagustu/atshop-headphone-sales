import { products } from './products.js';
import { reviews } from './reviews.js';

document.addEventListener("DOMContentLoaded", function() {
    fetch('common.html')
      .then(response => response.text())
      .then(data => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
  
        const footerElement = tempDiv.querySelector('#footer');
        const footerTarget = document.getElementById('footer');
  
        if (footerElement && footerTarget) {
          footerTarget.innerHTML = footerElement.innerHTML;
  
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'common.css';
          document.head.appendChild(link);
        } else {
          console.error('Footer bulunamadı veya hedef element yok.');
        }
      })
      .catch(error => console.error('Hata:', error));
  });

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

        const productPagePrice = document.getElementById("product-price");
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'), 10);

        if (productPagePrice && productId === product.id) {
            productPagePrice.innerText = `${getCurrencySymbol(currency)}${convertedPrice}`;
        }
    });

    convertCartPrices(currency);
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

document.addEventListener("DOMContentLoaded", () => {
    let ui = new UI();
    ui.cardToggle();
    ui.likeToggle();
    ui.updateLikeList();
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    const product = products.find((p) => p.id === productId);
    const review = reviews.find((r) => r.id === productId);

    if (product) {
        document.title = product.name;
        document.getElementById("product-name-breadcrumb").innerText = product.name;
        document.getElementById("main-image").src = product.image;
        document.getElementById("thumbnail1").src = product.image;
        document.getElementById("thumbnail2").src = product.image2;
        document.getElementById("thumbnail3").src = product.image3;
        document.getElementById("product-name").innerText = product.name;
        document.getElementById("product-brand").innerText = `Brand: ${product.brand}`;
        renderRating(product.rating, document.getElementById("product-rating"));
        document.getElementById("product-description").innerText = product.description;
        document.getElementById("product-price").innerText = `$${product.price}`;
        document.getElementById("product-description-full").innerText = product.description;

        const largeImageElement = document.getElementById("product-large-image");
        largeImageElement.src = product.image3;

        document.getElementById("thumbnail1").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image;
        });
        document.getElementById("thumbnail2").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image2;
        });
        document.getElementById("thumbnail3").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image3;
        });

        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = `
            <div class="swiper-slide">
                <img src="${product.image}" alt="Product Image 1" class="img-fluid">
            </div>
            <div class="swiper-slide">
                <img src="${product.image2}" alt="Product Image 2" class="img-fluid">
            </div>
            <div class="swiper-slide">
                <img src="${product.image3}" alt="Product Image 3" class="img-fluid">
            </div>
        `;

        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        if (review) {
            const reviewsContainer = document.getElementById("reviews-container");
            const reviewsPerPage = 5;
            let currentPage = 1;
            const totalPages = Math.ceil(review.customers.length / reviewsPerPage);

            function renderReviews(page) {
                const start = (page - 1) * reviewsPerPage;
                const end = start + reviewsPerPage;
                const paginatedReviews = review.customers.slice(start, end);

                reviewsContainer.innerHTML = '';

                paginatedReviews.forEach(customer => {
                    const reviewDiv = document.createElement("div");
                    reviewDiv.classList.add("review", "border", "p-3", "mb-3");
                    reviewDiv.innerHTML = `
                        <div class="d-flex">
                            <img src="${customer.profilerpic}" alt="${customer.idname}" width="50" height="50" style="margin-right: 15px;" class="rounded-circle">
                            <div>
                                <strong>${customer.idname}</strong>
                                <p class="rating">
                                    ${getStarRating(customer.rated)}
                                </p>
                                <p>${customer.review}</p>
                            </div>
                        </div>
                    `;

                    reviewsContainer.appendChild(reviewDiv);
                });

                renderPagination(page);
            }

            function renderPagination(page) {
                const paginationContainer = document.getElementById("pagination");
                paginationContainer.innerHTML = '';

                const prevButton = document.createElement('li');
                prevButton.classList.add('page-item');
                if (page === 1) prevButton.classList.add('disabled');
                prevButton.innerHTML = '<a class="page-link" href="#">Previous</a>';
                prevButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                        currentPage--;
                        renderReviews(currentPage);
                    }
                });
                paginationContainer.appendChild(prevButton);

                for (let i = 1; i <= totalPages; i++) {
                    const pageItem = document.createElement('li');
                    pageItem.classList.add('page-item');
                    if (i === page) pageItem.classList.add('active');
                    pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
                    pageItem.addEventListener('click', (e) => {
                        e.preventDefault();
                        currentPage = i;
                        renderReviews(currentPage);
                    });
                    paginationContainer.appendChild(pageItem);
                }

                const nextButton = document.createElement('li');
                nextButton.classList.add('page-item');
                if (page === totalPages) nextButton.classList.add('disabled');
                nextButton.innerHTML = '<a class="page-link" href="#">Next</a>';
                nextButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderReviews(currentPage);
                    }
                });
                paginationContainer.appendChild(nextButton);
            }

            renderReviews(currentPage);
        }

        function calculateScore(otherProduct) {
            let score = 0;
            if (product.brand === otherProduct.brand) score += 1;
            if (product.category === otherProduct.category) score += 1;
            if (product.color === otherProduct.color) score += 1;
            if (Math.abs(product.rating - otherProduct.rating) <= 1) score += 1;
            if (Math.abs(product.price - otherProduct.price) <= 500) score += 1;
            return score;
        }

        const relatedProductsContainer = document.getElementById("related-products");

        const scoredProducts = products
        .filter(p => p.id !== productId)
        .map(p => ({ ...p, score: calculateScore(p) }))
        .sort((a, b) => b.score - a.score);

        let slicedProducts;
        if (window.innerWidth < 768) {
            slicedProducts = scoredProducts.slice(0, 4);
        } else {
            slicedProducts = scoredProducts.slice(0, 5);
        }

        slicedProducts.forEach((relatedProduct) => {
            const productDiv = document.createElement("div");

            if (window.innerWidth < 768) {
                productDiv.classList.add("col-4", "col-md-6", "col-lg-4", "models", "models-img", "shop");
            } else {
                productDiv.classList.add("col-2", "models", "models-img", "shop");
            }

            productDiv.innerHTML = `
            <div class="product-image-container">
                <img class="img-fluid show-image first-image" src="${relatedProduct.image}" alt="${relatedProduct.name}"/>
                <img class="img-fluid second-image" src="${relatedProduct.image2}" alt="${relatedProduct.name}" />
            </div>
            <div class="detaly d-inline">
                <span class="head z-3">
                <button class="btn btn-dark shop-now" data-product-id="${relatedProduct.id}">SHOP NOW</button>
                <button class="btn btn-dark btn-dark-1 cart-btn-1">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
                <button class="btn btn-dark like-btn-1" data-product-id="${relatedProduct.id}">
                    <i class="fa-solid fa-heart"></i>
                </button>
                </span>
            </div>
            <div class="text-center">
                <p class="card-title-1">${relatedProduct.name}</p>
                <p>
                <del id="originalPrice-${relatedProduct.id}" class="">$${relatedProduct.originalPrice}</del>
                <span id="price-${relatedProduct.id}" class="px-2 fw-bold price" style="color: red">$${relatedProduct.price}</span>
                </p>
            </div>
            `;

            relatedProductsContainer.appendChild(productDiv);

            const btnShopNow = productDiv.querySelector(".shop-now");
            btnShopNow.addEventListener("click", function () {
                const productId = this.getAttribute("data-product-id");
                goToProduct(productId);
            });

            const btnAdd = productDiv.querySelector(".cart-btn-1");
            btnAdd.addEventListener("click", function (e) {
                let title = relatedProduct.name;
                let price = `$${relatedProduct.price}`;
                let image = relatedProduct.image;

                let shopping = new Shopping(title, price, image);
                let ui = new UI();
                ui.addToCardWithNotification(shopping, btnAdd);

                e.preventDefault();
            });

            const btnFavorite = productDiv.querySelector(".like-btn-1");
            btnFavorite.addEventListener("click", function (e) {
                let ui = new UI();
                ui.toggleFavorite(relatedProduct, btnFavorite);

                e.preventDefault();
            });

            const favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
            const isFavorited = favoritedProducts.some(fav => fav.id === relatedProduct.id);

            if (isFavorited) {
                btnFavorite.classList.add('active');
                btnFavorite.innerHTML = '<i class="fa-solid fa-heart" style="color: red;"></i>';
            }
        });
    } else {
        console.error('Product not found.');
    }
});

window.goToProduct = function(productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    const product = products.find((p) => p.id === productId);
    const review = reviews.find((r) => r.id === productId);

    if (product) {
        document.title = product.name;
        document.getElementById("product-name-breadcrumb").innerText = product.name;
        document.getElementById("main-image").src = product.image;
        document.getElementById("thumbnail1").src = product.image;
        document.getElementById("thumbnail2").src = product.image2;
        document.getElementById("thumbnail3").src = product.image3;
        document.getElementById("product-name").innerText = product.name;
        document.getElementById("product-brand").innerText = `Brand: ${product.brand}`;
        renderRating(product.rating, document.getElementById("product-rating"));
        document.getElementById("product-description").innerText = product.description;
        document.getElementById("product-price").innerText = `$${product.price}`;
        document.getElementById("product-description-full").innerText = product.description;

        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = `
            <div class="swiper-slide">
                <img src="${product.image}" alt="Product Image 1" class="img-fluid">
            </div>
            <div class="swiper-slide">
                <img src="${product.image2}" alt="Product Image 2" class="img-fluid">
            </div>
            <div class="swiper-slide">
                <img src="${product.image3}" alt="Product Image 3" class="img-fluid">
            </div>
        `;

        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        if (review) {
            const reviewsContainer = document.getElementById("reviews-container");
            const reviewSortOptions = document.getElementById("review-sort-options");
            let currentSortOption = reviewSortOptions.value;

            function sortReviews(reviews, sortBy) {
                switch (sortBy) {
                    case 'highestRated':
                        return reviews.sort((a, b) => b.rated - a.rated);
                    case 'lowestRated':
                        return reviews.sort((a, b) => a.rated - b.rated);
                    case 'mostRecent':
                        return reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
                    case 'oldest':
                        return reviews.sort((a, b) => new Date(a.reviewDate) - new Date(b.reviewDate));
                    default:
                        return reviews;
                }
            }

            function renderReviews(reviews, sortBy) {
                const sortedReviews = sortReviews([...reviews], sortBy);
                reviewsContainer.innerHTML = '';

                sortedReviews.forEach(customer => {
                    const reviewDiv = document.createElement("div");
                    reviewDiv.classList.add("review", "border", "p-3", "mb-3");
                    reviewDiv.innerHTML = `
                        <div class="d-flex">
                            <img src="${customer.profilerpic}" alt="${customer.idname}" width="50" height="50" style="margin-right: 15px;" class="rounded-circle">
                            <div>
                                <strong>${customer.idname}</strong>
                                <p class="rating">
                                    ${getStarRating(customer.rated)}
                                </p>
                                <p>${customer.review}</p>
                                <p class="text-muted">${new Date(customer.reviewDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    `;

                    reviewsContainer.appendChild(reviewDiv);
                });
            }

            reviewSortOptions.addEventListener("change", () => {
                currentSortOption = reviewSortOptions.value;
                renderReviews(review.customers, currentSortOption);
            });

            renderReviews(review.customers, currentSortOption);

            function getStarRating(rating) {
                const fullStars = Math.floor(rating);
                const halfStar = rating % 1 !== 0;
                let starsHTML = '';

                for (let i = 0; i < fullStars; i++) {
                    starsHTML += '<i class="fas fa-star star"></i>';
                }
                if (halfStar) {
                    starsHTML += '<i class="fas fa-star-half-alt star-half-alt"></i>';
                }
                for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
                    starsHTML += '<i class="far fa-star"></i>';
                }
                return starsHTML;
            }
        }
    } else {
        console.error('Product not found.');
    }
});

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star star"></i>';
    }
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt star-half-alt"></i>';
    }
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    return starsHTML;
}

function renderRating(rating, element) {
    element.innerHTML = getStarRating(rating);
}

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
