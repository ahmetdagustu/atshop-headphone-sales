import { products } from './products.js';

// Shopping Cart Functionality
class Shopping {
    constructor(title, price, image) {
        this.image = image;
        this.title = title;
        this.price = price;
    }
}

class UI {
    constructor() {
        this.cardList = document.querySelector(".shopping-cart-list");
        this.favoriteList = document.querySelector(".favorite-list");
        this.itemCount = document.getElementById("item-count");
        this.btnCard = document.querySelector(".btn-card");
        this.init();
    }

    init() {
        this.cardToggle();
        this.updateCardCount();
        this.outsideClickListener();
    }

    cardToggle() {
        this.btnCard.addEventListener("click", () => {
            this.cardList.classList.toggle("d-none");
        });
    }

    updateCardCount() {
        let cardListItem = this.cardList.getElementsByClassName("list-item");
        this.itemCount.innerHTML = cardListItem.length;
    }

    outsideClickListener() {
        document.addEventListener("click", (event) => {
            if (!this.cardList.contains(event.target) && !this.btnCard.contains(event.target)) {
                this.cardList.classList.add("d-none");
            }
        });
    }

    removeCard() {
        let btnRemove = document.getElementsByClassName("fa-trash");
        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", () => {
                btnRemove[i].parentElement.parentElement.parentElement.remove();
                this.updateCardCount();
            });
        }
    }

    addToCard(shopping) {
        const listItem = document.createElement("div");
        listItem.classList = "list-item";

        listItem.innerHTML = `
        <div class="row align-items-center text-white-50">
            <div class="col-md-3">
                <img class="img-fluid" src="${shopping.image}" alt="">
            </div>
            <div class="col-md-5">
                <div class="title">${shopping.title}</div>
            </div>
            <div class="col-md-2">
                <div class="price">${shopping.price}</div>
            </div>
            <div class="col-md-2">
                <button class="btn btn-delete text-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `;
        this.cardList.appendChild(listItem);
        this.removeCard();
        this.updateCardCount();
    }

    addToFavorites(favorite) {
        const listItem = document.createElement("div");
        listItem.classList = "list-item";

        listItem.innerHTML = `
        <div class="row align-items-center text-white-50">
            <div class="col-md-3">
                <img class="img-fluid" src="${favorite.image}" alt="">
            </div>
            <div class="col-md-5">
                <div class="title">${favorite.title}</div>
            </div>
            <div class="col-md-2">
                <div class="price">${favorite.price}</div>
            </div>
            <div class="col-md-2">
                <button class="btn btn-delete text-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `;
        this.favoriteList.appendChild(listItem);
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
        const formattedCategory = category.trim().toLowerCase(); // Gelen category ismini küçük harflere çevir
        const filteredProducts = products.filter(product => {
            return product.category.trim().toLowerCase() === formattedCategory; // Ürün kategorisini küçük harflere çevirerek karşılaştırma yap
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
            productCard.innerHTML = `
            <div class="product-card text-center">
                <img src="${product.image}" class="img-fluid first-image" alt="${product.name}">
                <img src="${product.image2}" class="img-fluid second-image" alt="${product.name}">
                <div class="shopNow mt-5">
                    <p class="shopNow-item" onclick="goToProduct(${product.id})">SHOP NOW</p>
                    <i class="shopNow-item fa-solid fa-heart"></i>
                    <i class="shopNow-item fa-solid fa-cart-shopping"></i>
                </div>
                <h6>${product.name}</h6>
                <div class="price-container mt-5">
                    <span class="price-original"><small><s>$${product.originalPrice}</s></small></span>
                    <span class="redPrice">$${product.price}</span> 
                </div>
            </div>
            `;

            productRow.appendChild(productCard);

            // Adding event listener to the cart button for this product
            const btnAdd = productCard.querySelector(".fa-cart-shopping");
            btnAdd.addEventListener("click", function (e) {
                let title = product.name;
                let price = `$${product.price}`;
                let image = product.image;

                btnAdd.classList.add("disabled");
                btnAdd.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> In Cart`;

                let shopping = new Shopping(title, price, image);
                ui.addToCard(shopping);

                e.preventDefault();
            });

            // Adding event listener to the favorite button for this product
            const btnFavorite = productCard.querySelector(".fa-heart");
            btnFavorite.addEventListener("click", function (e) {
                let title = product.name;
                let price = `$${product.price}`;
                let image = product.image;

                btnFavorite.classList.add("disabled");
                btnFavorite.innerHTML = `<i class="fa-solid fa-heart"></i> Added`;

                let favorite = new Shopping(title, price, image);
                ui.addToFavorites(favorite);

                e.preventDefault();
            });
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

window.goToProduct = function(productId) {
    window.location.href = `shop-page.html?id=${productId}`;
};


window.goToProduct = function(productId) {
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


function filterProductsByCategory(category) {
    // Gelen kategoriyi normalize et
    const formattedCategory = category.trim().toLowerCase();

    // Kategori eşleştirme için bir haritalama yap
    const categoryMapping = {
        "sport headphones": "sport headphone",
        "over-ear headphone": "over-ear headphone",
        "in-ear headphone": "in-ear headphone"
    };

    // Gelen kategori ismini haritalama kullanarak bul
    const mappedCategory = categoryMapping[formattedCategory] || formattedCategory;

    // Haritalanmış kategori ile ürünleri filtrele
    const filteredProducts = products.filter(product => {
        return product.category.trim().toLowerCase() === mappedCategory;
    });

    // Ürünleri görüntüle
    displayProducts(filteredProducts, 1);
}
