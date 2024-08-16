import { products } from './products.js';

// Selecting the rows where products will be displayed
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
    btnRemove.forEach(function(button) {
        button.addEventListener("click", function() {
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
    btnRemove.forEach(function(button) {
        button.addEventListener("click", function() {
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
    this.removeCard();  // Bu fonksiyonu çağırarak sepetten ürün silinmesini sağlıyoruz
    this.cardCount();   // Sepetteki ürün sayısını güncelliyoruz
    
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
}


// Function to render products into a given row
function renderProducts(products, targetRow) {
  products.slice(0, 8).forEach((product) => {
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
          <button class="btn btn-dark like-btn-1">
            <i class="fa-solid fa-heart"></i>
          </button>
        </span>
      </div>
      <div class="text-center">
        <p class="card-title-1">${product.name}</p>
        <p>
          <del class="">$${product.originalPrice}</del>
          <span class="px-2 fw-bold price" style="color: red">$${product.price}</span>
        </p>
      </div>
    `;

    targetRow.appendChild(productDiv);

    // Adding event listener to the SHOP NOW button
    const btnShopNow = productDiv.querySelector(".shop-now");
    btnShopNow.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id");
      goToProduct(productId);
    });

    // Adding event listener to the cart button for this product
    const btnAdd = productDiv.querySelector(".cart-btn-1");
    btnAdd.addEventListener("click", function (e) {
      let title = product.name;
      let price = `$${product.price}`;
      let image = product.image;

      btnAdd.classList.add("disabled");
      btnAdd.textContent = "In Cart";

      let shopping = new Shopping(title, price, image);
      let ui = new UI();
      ui.addToCard(shopping);

      e.preventDefault();
    });

    // Adding event listener to the like button for this product
    const btnLike = productDiv.querySelector(".like-btn-1");
    btnLike.addEventListener("click", function (e) {
      let title = product.name;
      let image = product.image;

      let like = new Like(title, image);
      let ui = new UI();
      ui.addToLike(like, btnLike);

      e.preventDefault();
    });
  });
}

// Initialize the UI and load the products on page load
document.addEventListener("DOMContentLoaded", () => {
  let ui = new UI();
  ui.cardToggle();
  ui.likeToggle();

  renderProducts(products, productRow); // Render products in the Latest Products section
  renderProducts(products, bestSellingProductRow); // Render products in the Best Selling section
});

window.goToProduct = function(productId) {
  window.location.href = `shop-page.html?id=${productId}`;
};

// Adding event listener for the View All button under the Best Selling section
document.getElementById('viewAllBestSellingButton').addEventListener('click', function() {
  window.location.href = 'filter.html';
});

// Adding event listener for the all view button
document.getElementById('viewAllButton').addEventListener('click', function() {
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
  }
);


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
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // Bu satır carousel'in yanlışlıkla geçiş yapmasını engeller
      const productId = this.getAttribute('data-product-id');
      window.location.href = `shop-page.html?id=${productId}`;
    });
  });
}

// Fonksiyon: Shop collection bölümlerini oluşturma (Önceki haliyle aynıdır)
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

// Butona tıklama olayını yakalayıp filtre sayfasına yönlendirme
document.querySelectorAll('.shop-clc').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Butonun default davranışını engelle
    const categoryName = this.getAttribute('data-category');
    window.location.href = `filter.html?category=${encodeURIComponent(categoryName)}`;
  });
});


    shopCollectionContainer.appendChild(collectionItem);
  });
}

// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
  createCarouselItems(products); // Rastgele ürünleri slider için oluşturuyoruz
  createShopCollections(products); // Shop collection için içerik oluşturuyoruz
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shop-clc').forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault(); // Butonun varsayılan davranışını engelle
          const categoryName = this.getAttribute('data-category').trim().toLowerCase(); // Kategori ismini düzgün bir şekilde alın
          window.location.href = `filter.html?category=${encodeURIComponent(categoryName)}`;
      });
  });
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
    shopNowButton.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        window.location.href = `shop-page.html?id=${productId}`;
    });
}

// Sayfa yüklendiğinde rastgele bir ürünü göster
document.addEventListener('DOMContentLoaded', displayRandomProduct);