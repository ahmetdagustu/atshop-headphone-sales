import { products } from './products.js';
import { reviews } from './reviews.js';
import { convertPrices, createProductHTML, showSubscribeMessage } from './common.js';

// Para birimi değiştiğinde fiyatları güncelleme
document.addEventListener('DOMContentLoaded', async function () {
    const currencySelect = document.getElementById('flag');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);
    const selectedProduct = products.find((p) => p.id === productId);

    // Sayfa yüklendiğinde localStorage'dan seçilen para birimini al
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
        // Para birimi selectbox'ını kaydedilen değere ayarla
        currencySelect.value = savedCurrency;
        // Fiyatları kaydedilen para birimine göre güncelle
        await convertPrices(savedCurrency, products, selectedProduct);
    }

    if (currencySelect) {
        // Para birimi değiştirildiğinde
        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;

            // Seçilen para birimini localStorage'a kaydet
            localStorage.setItem('selectedCurrency', selectedCurrency);

            // Fiyatları yeni seçilen para birimine göre güncelle
            await convertPrices(selectedCurrency, products, selectedProduct);
        });
    }
});



// DOM yüklendiğinde çalışacak fonksiyon
document.addEventListener("DOMContentLoaded", () => {
    // Döviz kuru seçimi ve ürün fiyatlarını güncelleme
    const currencySelect = document.getElementById('flag');
    if (currencySelect) {
        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;
            await convertPrices(selectedCurrency);
        });
    }

    // URL parametrelerinden ürün ID'sini alma
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    // Ürün ve inceleme verilerini alma
    const product = products.find((p) => p.id === productId);
    const review = reviews.find((r) => r.id === productId);

    if (product) {
        // Ürün detaylarını güncelleme
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

        // Thumbnail görüntülerine tıklama olayları
        document.getElementById("thumbnail1").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image;
        });
        document.getElementById("thumbnail2").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image2;
        });
        document.getElementById("thumbnail3").addEventListener("click", () => {
            document.getElementById("main-image").src = product.image3;
        });

        // Swiper için görselleri ekleme
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

        // Swiper'ı başlatma
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        
        // Ürün yorumlarını gösterme
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

                // Sayfa geçiş düğmeleri
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

        // İlgili ürünleri hesaplama ve gösterme
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

        // İlgili ürünlerin gösterimi
        slicedProducts.forEach((relatedProduct) => {
            const productDiv = document.createElement("div");
            if (window.innerWidth < 768) {
                productDiv.classList.add("col-4", "col-md-6", "col-lg-4", "models", "models-img", "shop");
            } else {
                productDiv.classList.add("col-2", "models", "models-img", "shop");
            }

            productDiv.innerHTML = createProductHTML(relatedProduct);
            relatedProductsContainer.appendChild(productDiv);
        });
    }
});


window.goToProduct = function(productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};

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