import { products } from './products.js';
import { reviews } from './reviews.js';

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    const product = products.find((p) => p.id === productId);
    const review = reviews.find((r) => r.id === productId);

    if (product) {
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

        document.getElementById("thumbnail1").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image;
        });
        document.getElementById("thumbnail2").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image2;
        });
        document.getElementById("thumbnail3").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image3;
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
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);

        scoredProducts.forEach((relatedProduct) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("col-md-2", "mb-4");
            productDiv.innerHTML = `
                <div class="product-card text-center">
                    <img src="${relatedProduct.image}" class="img-fluid first-image" alt="${relatedProduct.name}">
                    <img src="${relatedProduct.image2}" class="img-fluid second-image" alt="${relatedProduct.name}">
                    <div class="shopNow mt-5">
                        <p class="shopNow-item" onclick="goToProduct(${relatedProduct.id})">SHOP NOW</p>
                        <i class="shopNow-item fa-solid fa-heart"></i>
                        <i class="shopNow-item fa-solid fa-cart-shopping"></i>
                    </div>
                    <h6>${relatedProduct.name}</h6>
                    <div class="price-container mt-5">
                        <span class="price-original"><small><s>$${relatedProduct.originalPrice}</s></small></span>
                        <span class="redPrice">$${relatedProduct.price}</span>
                    </div>
                </div>`;
            relatedProductsContainer.appendChild(productDiv);
        });
    } else {
        console.error('Product not found.');
    }
});

window.goToProduct = function(productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};

document.addEventListener("DOMContentLoaded", () => {
    const ratingValueElement = document.getElementById("rating-value");
    const ratingDescriptionElement = document.getElementById("rating-description");

    let rating = 1;

    function updateRatingDisplay() {
        ratingValueElement.textContent = rating;
        ratingDescriptionElement.textContent = rating + '+ is the current rating';
    }

    document.getElementById("decrease-rating").addEventListener("click", () => {
        if (rating > 1) {
            rating--;
            updateRatingDisplay();
        }
    });

    document.getElementById("increase-rating").addEventListener("click", () => {
        rating++;
        updateRatingDisplay();
    });

    updateRatingDisplay();
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
