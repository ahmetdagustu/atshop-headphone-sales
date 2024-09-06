document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
    <header class="site-header">
        <div id="top-banner" class="top-banner row d-flex mt-3 align-items-center justify-content-between">
            <div class="col-6 d-flex justify-content-center mobile-logo">
                <a href="#">ATShop</a>
            </div>
            <div class="col-6 d-flex justify-content-end">
                <div class="hamburger-menu">
                    <i class="fa fa-bars"></i>
                </div>
            </div>
        </div>
  
        <div class="navbar-mobile">
            <div class="d-flex justify-content-between align-items-center w-100 px-3">
                <a href="#">ATShop</a>
                <div class="close-menu">&times;</div>
            </div>
            <div class="search-btn">
                <form class="example" action="/action_page.php">
                    <input type="text" placeholder="Search.." name="search2" />
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
            <div class="icons d-flex justify-content-around mt-3 mobile-icons">
                <button class="btn btn-dark btn-card2-mobile">
                    <i class="fa-solid fa-heart position-relative"></i>
                    <span id="item-count-like-mobile" class="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger">0</span>
                </button>
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                    <i class="fa-solid fa-user"></i>
                </button>
                <button type="button" class="btn btn-dark position-relative btn-card-mobile">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span id="item-count-mobile" class="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger">0</span>
                </button>
            </div>
            <div class="mobile-shopping-cart-list d-none">
                <div class="shopping-cart-header d-flex align-items-center justify-content-between">
                    <b class="fs-5 my-3 text-start">Shopping Cart</b>
                    <span id="total-price-mobile" class="fs-5 my-3 text-end"></span>
                </div>
                <div id="cart-list-items-mobile"></div>
            </div>
            <div class="mobile-shopping-like-list d-none">
                <div class="shopping-cart-header d-flex align-items-center justify-content-start">
                    <b class="fs-5 my-3 text-start">Favorites</b>
                </div>
                <div id="like-list-items-mobile"></div>
            </div>
            <div class="categories-container mt-4">
                <a href="#" class="bold">HOME</a>
                <a href="#" class="bold">SHOP</a>
                <strong>Categories</strong>
                <ul>
                    <li><a href="#">Wireless</a></li>
                    <li><a href="#">Inear Headphone</a></li>
                    <li><a href="#">Overear Headphone</a></li>
                    <li><a href="#">Sport Headphone</a></li>
                </ul>
                <a href="#">BLOG</a>
                <a href="#">CONTACT</a>
            </div>
        </div>
  
        <div class="hstack gap-3 d-flex fs-7 align-items-center" id="hstack">
            <div class="hstack-context">
                <p><a href="tel:+905555555555">0 555 555 55 55</a></p>
                <div class="vr"></div>
                <p><a href="mailto:atshop@gmail.com">atshop@gmail.com</a></p>
            </div>
            <div class="ms-auto">
                <select id="flag" class="form-select">
                    <option value="USD">USD</option>
                    <option value="TRY">TRY</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>
            <div class="vr"></div>
            <div class="order-tracking">
                <span id="orderTrackingTrigger" style="cursor: pointer;">ORDER TRACKING</span>
            </div>  
        </div>
  
        <div id="header-container" class="container mt-1">
            <div class="top-banner row d-flex mt-3 align-items-center">
                <div class="col-lg-4">
                    <a href="#">ATShop</a>
                </div>
                <div class="col-lg-4 d-grid search-btn">
                    <form class="example" action="/action_page.php" style="max-width: 100%">
                        <input type="text" placeholder="Search.." name="search2" />
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div class="col-lg-4 text-end btn-i">
                    <div class="shopping-cart position-relative">
                        <button class="btn btn-dark btn-card2">
                            <i class="fa-solid fa-heart position-relative"></i>
                            <span id="item-count-like" class="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger">0</span>
                        </button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                            <i class="fa-solid fa-user"></i>
                        </button>
                        <button type="button" class="btn btn-dark position-relative btn-card">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span id="item-count" class="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger">0</span>
                        </button>
                    </div>
                </div>          
            </div>
        </div>
  
        <div id="dr-menu" class="d-flex justify-content-center grid gap-5 dr-menu">
            <a href="index.html">HOME</a>
            <div class="dropdown-2">
                <a href="filter.html" class="dropdown-link">SHOP</a>
                <div class="dropdown-content-2 z-3">
                    <div class="category-group align-items-center">
                        <div class="category">
                            <a href="#">
                                <h1 class="mb-3">Categories</h1>
                                <ul role="button">
                                    <li><a role="button" href="">Wireless</a></li>
                                    <li><a href="">Inear Headphone</a></li>
                                    <li><a href="">Overear</a></li>
                                    <li><a href="">Sport Headphone</a></li>
                                </ul>
                            </a>
                            <img class="img-fluid" src="/images/image2.webp" alt="Product"/>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#">BLOG</a>
            <a href="#">CONTACT</a>
        </div>  
    </header>
    `;
  
    // Dinamik header'ı header-container id'li div'e ekle
    document.getElementById("header-container").innerHTML = headerHTML;
  });
  



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