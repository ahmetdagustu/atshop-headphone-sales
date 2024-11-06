import { Product } from './types/Product';
import 'bootstrap';



// header
document.addEventListener("DOMContentLoaded", () => {
    // Dinamik header ekle
    document.body.insertAdjacentHTML('afterbegin', `
    <header class="site-header">
      <div id="top-banner" class="top-banner row d-flex mt-3 align-items-center justify-content-between">
          <div class="col-6 d-flex justify-content-center mobile-logo">
              <a href="index.html">ATShop</a>
          </div>
          <div class="col-6 d-flex justify-content-end">
              <div class="hamburger-menu">
                  <i class="fa fa-bars"></i>
              </div>
          </div>
      </div>

      <div class="navbar-mobile">
        <div class="d-flex justify-content-between align-items-center w-100 px-3">
            <a href="index.html">ATShop</a>
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
        <div id="mobile-cart-dropdown" class="cart-dropdown-mobile" style="display: none;">
            <div class="cart-header d-flex justify-content-between align-items-center">
                <span>Shopping Cart</span>
                <button id="clear-mobile-cart" class="btn btn-light">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div id="mobile-cart-list-items" class="cart-items"></div>
            <div class="cart-footer d-flex justify-content-between align-items-center mt-3 p-2 border-top">
                <span id="mobile-total-price" class="fw-bold">Total: $0.00</span>
                <button id="mobile-checkout-button" class="btn btn-primary">Confirm Cart</button>
            </div>
        </div>
        <div id="mobile-favorites-dropdown" class="mobile-shopping-like-list d-none">
            <div class="shopping-cart-header d-flex align-items-center justify-content-between">
                <b class="fs-5 my-3 text-start">Favorites</b>
                <button id="clear-all-favorites-mobile" class="btn btn-light">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div id="favorites-list-items-mobile" class="cart-items"></div>
        </div>
        <div class="categories-container mt-4">
            <a href="#" class="bold">HOME</a>
            <a href="#" class="bold">SHOP</a>
            <strong>JBL</strong>
            <ul>
                <li><a href="filter.html?brand=JBL&category=Wireless">Wireless</a></li>
                <li><a href="filter.html?brand=JBL&category=Inear">Inear Headphone</a></li>
                <li><a href="filter.html?brand=JBL&category=Overear">Overear Headphone</a></li>
                <li><a href="filter.html?brand=JBL&category=Sport">Sport Headphone</a></li>
            </ul>
            <!-- Diğer markaların içeriği benzer şekilde eklenecek -->
            <a href="blog.html">BLOG</a>
            <a href="#">CONTACT</a>
        </div>
      </div>

      <div id="header-container" class="container mt-1">
          <div class="top-banner row d-flex mt-3 align-items-center">
              <div class="col-lg-4">
                  <a href="index.html">ATShop</a>
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
                    <div id="favorites-dropdown" class="favorites-dropdown" style="display: none;">
                        <div class="favorites-header d-flex justify-content-between align-items-center">
                            <span>Favorites</span>
                            <button id="clear-all-favorites" class="btn btn-light">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <div id="favorites-list-items" class="favorites-items"></div>
                    </div>
                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                        <i class="fa-solid fa-user"></i>
                    </button>
                    <button type="button" class="btn btn-dark position-relative btn-card">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span id="item-count" class="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger">0</span>
                    </button>
                    <div id="cart-dropdown" class="cart-dropdown" style="display: none;">
                        <div class="cart-header d-flex justify-content-between align-items-center">
                            <span>Shopping Cart</span>
                            <button id="clear-cart" class="btn btn-light">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <div id="cart-list-items" class="cart-items"></div>
                        <div class="cart-footer d-flex justify-content-between align-items-center mt-3 p-2 border-top">
                            <span id="total-price" class="fw-bold">Total: $0.00</span>
                            <button id="checkout-button" class="btn btn-primary">Confirm Cart</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </header>
    `);

    const hamburgerMenu = document.querySelector('.hamburger-menu') as HTMLElement;
    hamburgerMenu?.addEventListener('click', () => {
        const navbarMobile = document.querySelector('.navbar-mobile') as HTMLElement;
        navbarMobile?.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    const closeMenu = document.querySelector('.close-menu') as HTMLElement;
    closeMenu?.addEventListener('click', () => {
        const navbarMobile = document.querySelector('.navbar-mobile') as HTMLElement;
        navbarMobile?.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    const favoriteButton = document.querySelector('.btn-card2') as HTMLElement;
    favoriteButton?.addEventListener('click', () => {
        const favoritesDropdown = document.getElementById('favorites-dropdown') as HTMLElement;
        if (favoritesDropdown) favoritesDropdown.style.display = favoritesDropdown.style.display === 'none' ? 'block' : 'none';
    });

    const cartButton = document.querySelector('.btn-card') as HTMLElement;
    cartButton?.addEventListener('click', () => {
        const cartDropdown = document.getElementById('cart-dropdown') as HTMLElement;
        if (cartDropdown) cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
    });

    const mobileFavoriteButton = document.querySelector('.btn-card2-mobile') as HTMLElement;
    mobileFavoriteButton?.addEventListener('click', () => {
        const mobileFavoritesDropdown = document.getElementById('mobile-favorites-dropdown') as HTMLElement;
        if (mobileFavoritesDropdown) mobileFavoritesDropdown.classList.toggle('d-none');
    });

    const mobileCartButton = document.querySelector('.btn-card-mobile') as HTMLElement;
    mobileCartButton?.addEventListener('click', () => {
        const mobileCartDropdown = document.getElementById('mobile-cart-dropdown') as HTMLElement;
        if (mobileCartDropdown) mobileCartDropdown.style.display = mobileCartDropdown.style.display === 'none' ? 'block' : 'none';
    });

    const clearCartButton = document.getElementById('clear-cart') as HTMLElement;
    clearCartButton?.addEventListener('click', () => {
        const cartListItems = document.getElementById('cart-list-items') as HTMLElement;
        if (cartListItems) cartListItems.innerHTML = '';
        const totalPrice = document.getElementById('total-price') as HTMLElement;
        if (totalPrice) totalPrice.textContent = 'Total: $0.00';
    });

    const clearMobileCartButton = document.getElementById('clear-mobile-cart') as HTMLElement;
    clearMobileCartButton?.addEventListener('click', () => {
        const mobileCartListItems = document.getElementById('mobile-cart-list-items') as HTMLElement;
        if (mobileCartListItems) mobileCartListItems.innerHTML = '';
        const mobileTotalPrice = document.getElementById('mobile-total-price') as HTMLElement;
        if (mobileTotalPrice) mobileTotalPrice.textContent = 'Total: $0.00';
    });

    const clearFavoritesButton = document.getElementById('clear-all-favorites') as HTMLElement;
    clearFavoritesButton?.addEventListener('click', () => {
        const favoritesListItems = document.getElementById('favorites-list-items') as HTMLElement;
        if (favoritesListItems) favoritesListItems.innerHTML = '';
    });

    const clearMobileFavoritesButton = document.getElementById('clear-all-favorites-mobile') as HTMLElement;
    clearMobileFavoritesButton?.addEventListener('click', () => {
        const mobileFavoritesListItems = document.getElementById('favorites-list-items-mobile') as HTMLElement;
        if (mobileFavoritesListItems) mobileFavoritesListItems.innerHTML = '';
    });
});

//footer
document.addEventListener("DOMContentLoaded", () => {
    const footerHTML: string = `
    <footer id="footer" class="py-4">
        <div class="container text-center">
            <div class="row">
                <div class="col-md-3">
                    <div class="accordion d-md-none" id="productAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="productHeading">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#productCollapse" aria-expanded="false" aria-controls="productCollapse">
                                    PRODUCT
                                </button>
                            </h2>
                            <div id="productCollapse" class="accordion-collapse collapse" aria-labelledby="productHeading" data-bs-parent="#productAccordion">
                                <div class="accordion-body">
                                    <a href="#" class="footer-link">Help Center</a>
                                    <a href="#" class="footer-link">Contact Us</a>
                                    <a href="#" class="footer-link">Product Help</a>
                                    <a href="#" class="footer-link">Warranty</a>
                                    <a href="#" class="footer-link">Order Status</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-none d-md-block">
                        <h6>PRODUCT</h6>
                        <ul class="list-unstyled">
                            <li><a href="#" class="footer-link">Help Center</a></li>
                            <li><a href="#" class="footer-link">Contact Us</a></li>
                            <li><a href="#" class="footer-link">Product Help</a></li>
                            <li><a href="#" class="footer-link">Warranty</a></li>
                            <li><a href="#" class="footer-link">Order Status</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="accordion d-md-none" id="servicesAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="servicesHeading">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#servicesCollapse" aria-expanded="false" aria-controls="servicesCollapse">
                                    SERVICES
                                </button>
                            </h2>
                            <div id="servicesCollapse" class="accordion-collapse collapse" aria-labelledby="servicesHeading" data-bs-parent="#servicesAccordion">
                                <div class="accordion-body">
                                    <a href="#" class="footer-link">Help Center</a>
                                    <a href="#" class="footer-link">Contact Us</a>
                                    <a href="#" class="footer-link">Product Help</a>
                                    <a href="#" class="footer-link">Warranty</a>
                                    <a href="#" class="footer-link">Order Status</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-none d-md-block">
                        <h6>SERVICES</h6>
                        <ul class="list-unstyled">
                            <li><a href="#" class="footer-link">Help Center</a></li>
                            <li><a href="#" class="footer-link">Contact Us</a></li>
                            <li><a href="#" class="footer-link">Product Help</a></li>
                            <li><a href="#" class="footer-link">Warranty</a></li>
                            <li><a href="#" class="footer-link">Order Status</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="accordion d-md-none" id="supportAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="supportHeading">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#supportCollapse" aria-expanded="false" aria-controls="supportCollapse">
                                    SUPPORT
                                </button>
                            </h2>
                            <div id="supportCollapse" class="accordion-collapse collapse" aria-labelledby="supportHeading" data-bs-parent="#supportAccordion">
                                <div class="accordion-body">
                                    <a href="#" class="footer-link">Help Center</a>
                                    <a href="#" class="footer-link">Contact Us</a>
                                    <a href="#" class="footer-link">Product Help</a>
                                    <a href="#" class="footer-link">Warranty</a>
                                    <a href="#" class="footer-link">Order Status</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-none d-md-block">
                        <h6>SUPPORT</h6>
                        <ul class="list-unstyled">
                            <li><a href="#" class="footer-link">Help Center</a></li>
                            <li><a href="#" class="footer-link">Contact Us</a></li>
                            <li><a href="#" class="footer-link">Product Help</a></li>
                            <li><a href="#" class="footer-link">Warranty</a></li>
                            <li><a href="#" class="footer-link">Order Status</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3">
                    <a href="index.html"><h3>ATShop</h3></a>
                    <div class="d-flex justify-content-center mb-3">
                        <a href="http://www.facebook.com" class="social-media me-2"><i class="fab fa-facebook"></i></a>
                        <a href="http://www.instagram.com" class="social-media me-2"><i class="fab fa-instagram"></i></a>
                        <a href="http://www.twitter.com" class="social-media me-2"><i class="fab fa-twitter"></i></a>
                        <a href="http://www.youtube.com" class="social-media me-2"><i class="fab fa-youtube"></i></a>
                    </div>
                    <div class="input-group">
                        <input type="email" id="emailInput" class="form-control custom-width" placeholder="ENTER YOUR EMAIL" />
                        <button class="btn btn-primary custom-btn" id="subscribeButton" type="button">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
});


// kullanıcı girişi modalı
document.addEventListener("DOMContentLoaded", () => {
    const modalHTML: string = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content modal-container">
                <div class="modal-header modal-header-custom">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body modal-body-custom">
                    <!-- Login Form -->
                    <form id="loginForm">
                        <div class="login__content">
                            <div class="login__box">
                                <i class="ri-user-3-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="email" required class="login__input" id="login-email" placeholder=" ">
                                    <label for="login-email" class="login__label">Email</label>
                                </div>
                            </div>

                            <div class="login__box">
                                <i class="ri-lock-2-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="password" required class="login__input" id="login-pass" placeholder=" ">
                                    <label for="login-pass" class="login__label">Password</label>
                                    <i class="ri-eye-off-line login__eye" id="login-eye"></i>
                                </div>
                            </div>
                        </div>

                        <div class="login__check">
                            <div class="login__check-group">
                                <input type="checkbox" class="login__check-input" id="login-check">
                                <label for="login-check" class="login__check-label">Remember me</label>
                            </div>

                            <a href="#" class="login__forgot" id="forgot-password">Forgot Password?</a>
                        </div>

                        <button type="submit" class="login__button">Login</button>

                        <p class="login__register">
                            Don't have an account? <a href="#" id="showRegister">Register</a>
                        </p>
                    </form>

                    <!-- Register Form (Hidden Initially) -->
                    <form id="registerForm" style="display:none;">
                        <div class="login__content">
                            <div class="login__box">
                                <i class="ri-user-3-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="text" required class="login__input" id="register-name" placeholder=" ">
                                    <label for="register-name" class="login__label">Full Name</label>
                                </div>
                            </div>

                            <div class="login__box">
                                <i class="ri-mail-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="email" required class="login__input" id="register-email" placeholder=" ">
                                    <label for="register-email" class="login__label">Email</label>
                                </div>
                            </div>

                            <div class="login__box">
                                <i class="ri-lock-2-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="password" required class="login__input" id="register-pass" placeholder=" ">
                                    <label for="register-pass" class="login__label">Password</label>
                                    <i class="ri-eye-off-line login__eye" id="register-eye"></i>
                                </div>
                            </div>

                            <div class="login__box">
                                <i class="ri-lock-2-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="password" required class="login__input" id="confirm-pass" placeholder=" ">
                                    <label for="confirm-pass" class="login__label">Confirm Password</label>
                                    <i class="ri-eye-off-line login__eye" id="confirm-eye"></i>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="login__button">Register</button>

                        <p class="login__register">
                            Already have an account? <a href="#" id="showLogin">Login</a>
                        </p>
                    </form>

                    <!-- Forgot Password Form (Hidden Initially) -->
                    <form id="forgotPasswordForm" style="display:none;">
                        <div class="login__content">
                            <div class="login__box">
                                <i class="ri-mail-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="email" required class="login__input" id="forgot-email" placeholder=" ">
                                    <label for="forgot-email" class="login__label">Email</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="login__button">Confirm Email</button>
                        <p class="login__register">
                            Remember your password? <a href="#" id="backToLogin">Login</a>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Toggle between Login, Register, and Forgot Password forms
    document.getElementById('showRegister')?.addEventListener('click', function (e) {
        e.preventDefault();
        (document.getElementById('loginForm') as HTMLFormElement).style.display = 'none';
        (document.getElementById('registerForm') as HTMLFormElement).style.display = 'block';
    });

    document.getElementById('showLogin')?.addEventListener('click', function (e) {
        e.preventDefault();
        (document.getElementById('registerForm') as HTMLFormElement).style.display = 'none';
        (document.getElementById('loginForm') as HTMLFormElement).style.display = 'block';
    });

    document.getElementById('forgot-password')?.addEventListener('click', function (e) {
        e.preventDefault();
        (document.getElementById('loginForm') as HTMLFormElement).style.display = 'none';
        (document.getElementById('forgotPasswordForm') as HTMLFormElement).style.display = 'block';
    });

    document.getElementById('backToLogin')?.addEventListener('click', function (e) {
        e.preventDefault();
        (document.getElementById('forgotPasswordForm') as HTMLFormElement).style.display = 'none';
        (document.getElementById('loginForm') as HTMLFormElement).style.display = 'block';
    });

    // Toggle password visibility for login
    document.getElementById('login-eye')?.addEventListener('click', function () {
        const passwordInput = document.getElementById('login-pass') as HTMLInputElement;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('ri-eye-off-line');
        this.classList.toggle('ri-eye-line');
    });

    // Toggle password visibility for register password
    document.getElementById('register-eye')?.addEventListener('click', function () {
        const passwordInput = document.getElementById('register-pass') as HTMLInputElement;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('ri-eye-off-line');
        this.classList.toggle('ri-eye-line');
    });

    // Toggle password visibility for confirm password
    document.getElementById('confirm-eye')?.addEventListener('click', function () {
        const confirmPasswordInput = document.getElementById('confirm-pass') as HTMLInputElement;
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.classList.toggle('ri-eye-off-line');
        this.classList.toggle('ri-eye-line');
    });
});



// Modal kargo dinamik olarak ekleniyor
document.addEventListener("DOMContentLoaded", () => {
    // Modal HTML'sini dinamik olarak ekle
    const trackingModalHTML: string = `
    <div class="modal fade" id="trackingModal" tabindex="-1" aria-labelledby="trackingModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="trackingModalLabel">Order Tracking (Sample)</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="timeline">
                <div class="timeline-step completed">
                  <div class="timeline-badge"><i class="fas fa-check"></i></div>
                  <div class="timeline-content">
                    <div class="timeline-text">Processed</div>
                    <div class="timeline-date">November 28, Thursday</div>
                  </div>
                </div>
                <div class="timeline-step completed">
                  <div class="timeline-badge"><i class="fas fa-check"></i></div>
                  <div class="timeline-content">
                    <div class="timeline-text">Prepared</div>
                    <div class="timeline-date">November 29, Friday</div>
                  </div>
                </div>
                <div class="timeline-step completed">
                  <div class="timeline-badge"><i class="fas fa-check"></i></div>
                  <div class="timeline-content">
                    <div class="timeline-text">Shipped</div>
                    <div class="timeline-date">November 30, Saturday</div>
                    <p>Your package has been shipped via <strong>PTT Cargo</strong>.</p>
                  </div>
                </div>
                <div class="timeline-step">
                  <div class="timeline-badge"><i class="fas fa-circle"></i></div>
                  <div class="timeline-content">
                    <div class="timeline-text">Delivery Expected</div>
                    <div class="timeline-date">December 6, Friday</div>
                  </div>
                </div>
              </div>
              <a href="https://www.ptt.gov.tr" target="_blank" class="btn btn-warning w-100 mt-3">Track Shipment</a>
              <button class="btn btn-secondary w-100 mt-2" data-bs-dismiss="modal">View Invoice</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', trackingModalHTML);

    // ORDER TRACKING span'ına tıklayınca modalı aç
    const orderTrackingTrigger = document.getElementById("orderTrackingTrigger");
    const trackingModalElement = document.getElementById("trackingModal") as HTMLElement;

    orderTrackingTrigger?.addEventListener("click", () => {
        const trackingModal = new bootstrap.Modal(trackingModalElement);
        trackingModal.show();
    });
});


// Ürün HTML'sini oluşturma fonksiyonu
export function createProductHTML(product: Product): string {
    // Add shipment badge if `todayShipment` is true
    const shipmentBadgeHTML = product.todayShipment ? `
        <div class="shipment-badge">
            <i class="fa-solid fa-truck"></i> Today Shipping
        </div>
    ` : '';

    // Construct the HTML with template literals
    const productHTML = `
    <div class="product-image-container position-relative">
        <!-- Mobile swiper for images -->
        <div class="swiper-container product-slider d-md-none">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img class="img-fluid first-image" src="${product.image}" alt="${product.name}"/>
                </div>
                ${product.image2 ? `<div class="swiper-slide">
                    <img class="img-fluid second-image" src="${product.image2}" alt="${product.name}"/>
                </div>` : ''}
            </div>
            <div class="swiper-pagination"></div>
        </div>

        <!-- Hover effect for PC -->
        <img class="img-fluid first-image d-none d-md-block" src="${product.image}" alt="${product.name}"/>
        ${product.image2 ? `<img class="img-fluid second-image d-none d-md-block" src="${product.image2}" alt="${product.name}"/>` : ''}
        
        <!-- Shipping badge -->
        ${shipmentBadgeHTML}
    </div>

    <div class="detaly d-inline">
        <span class="head z-3">
            <button class="btn btn-dark shop-now" data-product-id="${product.id}">SHOP NOW</button>
            <button class="btn btn-dark btn-dark-1 cart-btn-1" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">
                <i class="fa-solid fa-cart-shopping"></i>
            </button>
            <button class="btn btn-dark like-btn-1" data-product-id="${product.id}" data-product-name="${product.name}" data-product-image="${product.image}">
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
    </div>`;

    return productHTML;
}

// Döviz kuru alma fonksiyonu


// Para birimi sembolünü getiren fonksiyon

// Fiyatları çevirme ve HTML güncelleme fonksiyonu

// 

// E-posta doğrulama fonksiyonu