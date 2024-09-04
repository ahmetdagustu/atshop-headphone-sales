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
  