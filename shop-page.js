import { products } from './products.js';
import { reviews } from './reviews.js';
import { convertPrices, createProductHTML, showSubscribeMessage } from './common.js';


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

document.addEventListener('DOMContentLoaded', function () {
    const currencySelect = document.getElementById('flag');
    if (currencySelect) {
        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;
            await convertPrices(selectedCurrency);
        });
    }
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
            const productCard = document.createElement("div");

            if (window.innerWidth < 768) {
                productCard.classList.add("col-4", "col-md-6", "col-lg-4", "models", "models-img", "shop");
            } else {
                productCard.classList.add("col-2", "models", "models-img", "shop");
            }

            productCard.innerHTML = createProductHTML(product);


            relatedProductsContainer.appendChild(productCard);

            const btnShopNow = productCard.querySelector(".shop-now");
            btnShopNow.addEventListener("click", function () {
                const productId = this.getAttribute("data-product-id");
                goToProduct(productId);
            });

            const btnAdd = productCard.querySelector(".cart-btn-1");
            btnAdd.addEventListener("click", function (e) {
                let title = relatedProduct.name;
                let price = `$${relatedProduct.price}`;
                let image = relatedProduct.image;

                let shopping = new Shopping(title, price, image);
                let ui = new UI();
                ui.addToCardWithNotification(shopping, btnAdd);

                e.preventDefault();
            });

            const btnFavorite = productCard.querySelector(".like-btn-1");
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
