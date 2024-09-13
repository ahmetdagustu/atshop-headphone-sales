import { products } from './products.js';

// Dinamik header ekleme
document.addEventListener("DOMContentLoaded", function() {
    // Dinamik header ekle
    document.body.insertAdjacentHTML('afterbegin', `
    <header class="site-header">
      <div id="top-banner" class="top-banner row d-flex mt-3 align-items-center justify-content-between">
          <!-- ATShop Logo -->
          <div class="col-6 d-flex justify-content-center mobile-logo">
              <a href="index.html">ATShop</a>
          </div>
          <!-- Hamburger Menu Icon for Mobile -->
          <div class="col-6 d-flex justify-content-end">
              <div class="hamburger-menu">
                  <i class="fa fa-bars"></i>
              </div>
          </div>
      </div>
  
      <!-- Mobile Navbar -->
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
    
        <!-- Mobil Sepet açılır kutusu -->
        <div id="mobile-cart-dropdown" class="cart-dropdown-mobile" style="display: none;">
            <div class="cart-header">
                <span>Shopping Cart (Mobil)</span>
                <span id="mobile-total-price">Total: $0.00</span>
            </div>
            <div id="mobile-cart-list-items" class="cart-items">
                <!-- Mobil için sepet ürünleri buraya eklenecek -->
            </div>
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
            
            <strong>JBL</strong>
                <ul>
                    <li><a href="filter.html?brand=JBL&category=Wireless">Wireless</a></li>
                    <li><a href="filter.html?brand=JBL&category=Inear">Inear Headphone</a></li>
                    <li><a href="filter.html?brand=JBL&category=Overear">Overear Headphone</a></li>
                    <li><a href="filter.html?brand=JBL&category=Sport">Sport Headphone</a></li>
                </ul>

                <strong>BEAT</strong>
                <ul>
                    <li><a href="filter.html?brand=BEAT&category=Wireless">Wireless</a></li>
                    <li><a href="filter.html?brand=BEAT&category=Inear">Inear Headphone</a></li>
                    <li><a href="filter.html?brand=BEAT&category=Overear">Overear Headphone</a></li>
                    <li><a href="filter.html?brand=BEAT&category=Sport">Sport Headphone</a></li>
                </ul>

                <strong>LOGITECH</strong>
                <ul>
                    <li><a href="filter.html?brand=LOGITECH&category=Wireless">Wireless</a></li>
                    <li><a href="filter.html?brand=LOGITECH&category=Inear">Inear Headphone</a></li>
                    <li><a href="filter.html?brand=LOGITECH&category=Overear">Overear Headphone</a></li>
                    <li><a href="filter.html?brand=LOGITECH&category=Sport">Sport Headphone</a></li>
                </ul>

                <strong>SAMSUNG</strong>
                <ul>
                    <li><a href="filter.html?brand=SAMSUNG&category=Wireless">Wireless</a></li>
                    <li><a href="filter.html?brand=SAMSUNG&category=Inear">Inear Headphone</a></li>
                    <li><a href="filter.html?brand=SAMSUNG&category=Overear">Overear Headphone</a></li>
                    <li><a href="filter.html?brand=SAMSUNG&category=Sport">Sport Headphone</a></li>
                </ul>

                <strong>SONY</strong>
                <ul>
                    <li><a href="filter.html?brand=SONY&category=Wireless">Wireless</a></li>
                    <li><a href="filter.html?brand=SONY&category=Inear">Inear Headphone</a></li>
                    <li><a href="filter.html?brand=SONY&category=Overear">Overear Headphone</a></li>
                    <li><a href="filter.html?brand=SONY&category=Sport">Sport Headphone</a></li>
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
                  <div class="shopping-like-list d-none">
                    <b class="fs-5 my-3">Favorite</b>
                  </div>
                  <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                    <i class="fa-solid fa-user"></i>
                  </button>
                  <button type="button" class="btn btn-dark position-relative btn-card">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span id="item-count" class="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger">0</span>
                  </button>
                <!-- Sepet açılır kutusu -->
                <div id="cart-dropdown" class="cart-dropdown" style="display: none;">
                    <div class="cart-header">
                        <span>Shopping Cart</span>
                        <span id="total-price">Total: $0.00</span>
                    </div>
                    <div id="cart-list-items" class="cart-items">
                        <!-- Sepet ürünleri buraya eklenecek -->
                    </div>
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
                        <h1 class="mb-2">JBL</h1>
                        <ul>
                            <li><a class="blog-item" href="filter.html?brand=JBL&category=Wireless">Wireless</a></li>
                            <li><a class="blog-item" href="filter.html?brand=JBL&category=Inear">Inear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=JBL&category=Overear">Overear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=JBL&category=Sport">Sport Headphone</a></li>
                        </ul>
                        <img class="img-fluid" src="/images/image2.webp" alt="Product"/>
                      </div>
                      <div class="category">
                        <h1 class="mb-2">BEAT</h1>
                        <ul>
                            <li><a class="blog-item" href="filter.html?brand=BEAT&category=Wireless">Wireless</a></li>
                            <li><a class="blog-item" href="filter.html?brand=BEAT&category=Inear">Inear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=BEAT&category=Overear">Overear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=BEAT&category=Sport">Sport Headphone</a></li>
                        </ul>
                        <img class="img-fluid" src="/images/image8.webp" alt="Product"/>
                      </div>
                      <div class="category">
                        <h1 class="mb-2">LOGITECH</h1>
                        <ul>
                            <li><a class="blog-item" href="filter.html?brand=LOGITECH&category=Wireless">Wireless</a></li>
                            <li><a class="blog-item" href="filter.html?brand=LOGITECH&category=Inear">Inear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=LOGITECH&category=Overear">Overear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=LOGITECH&category=Sport">Sport Headphone</a></li>
                        </ul>
                        <img class="img-fluid" src="/images/image9.webp" alt="Product"/>
                      </div>
                      <div class="category">
                        <h1 class="mb-2">SAMSUNG</h1>
                        <ul>
                            <li><a class="blog-item" href="filter.html?brand=SAMSUNG&category=Wireless">Wireless</a></li>
                            <li><a class="blog-item" href="filter.html?brand=SAMSUNG&category=Inear">Inear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=SAMSUNG&category=Overear">Overear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=SAMSUNG&category=Sport">Sport Headphone</a></li>
                        </ul>
                        <img class="img-fluid" src="/images/image10.webp" alt="Product"/>
                      </div>
                          <div class="category">
                        <h1 class="mb-2">LOGITECH</h1>
                        <ul>
                            <li><a class="blog-item" href="filter.html?brand=LOGITECH&category=Wireless">Wireless</a></li>
                            <li><a class="blog-item" href="filter.html?brand=LOGITECH&category=Inear">Inear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=LOGITECH&category=Overear">Overear Headphone</a></li>
                            <li><a class="blog-item" href="filter.html?brand=LOGITECH&category=Sport">Sport Headphone</a></li>
                        </ul>
                        <img class="img-fluid" src="/images/image11.webp" alt="Product"/>
                      </div>
                  </div>
              </div>
          </div>
          <a href="#">BLOG</a>
          <a href="#">CONTACT</a>
      </div>  
    </header>
    `);
  
   
    // Hamburger menü tıklama olay dinleyicisini ekle
    document.querySelector('.hamburger-menu').addEventListener('click', function () {
        document.querySelector('.navbar-mobile').classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close (kapatma) menü tıklama olay dinleyicisini ekle
    document.querySelector('.close-menu').addEventListener('click', function () {
        document.querySelector('.navbar-mobile').classList.remove('active');
        document.body.classList.remove('menu-open');
    });
  });
  
// Dinamik footer ekleme
document.addEventListener("DOMContentLoaded", function () {
    const footerHTML = `
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
document.addEventListener("DOMContentLoaded", function() {
    const modalHTML = `
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
    document.getElementById('showRegister').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });

    document.getElementById('showLogin').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    document.getElementById('forgot-password').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('forgotPasswordForm').style.display = 'block';
    });

    document.getElementById('backToLogin').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    // Toggle password visibility for login
    document.getElementById('login-eye').addEventListener('click', function () {
        const passwordInput = document.getElementById('login-pass');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('ri-eye-off-line');
        this.classList.toggle('ri-eye-line');
    });

    // Toggle password visibility for register password
    document.getElementById('register-eye').addEventListener('click', function () {
        const passwordInput = document.getElementById('register-pass');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('ri-eye-off-line');
        this.classList.toggle('ri-eye-line');
    });

    // Toggle password visibility for confirm password
    document.getElementById('confirm-eye').addEventListener('click', function () {
        const confirmPasswordInput = document.getElementById('confirm-pass');
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.classList.toggle('ri-eye-off-line');
        this.classList.toggle('ri-eye-line');
    });
});

// Modal kargo dinamik olarak ekleniyor
document.addEventListener("DOMContentLoaded", function () {
    // Modal HTML'sini dinamik olarak ekle
    const trackingModalHTML = `
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
    document.getElementById("orderTrackingTrigger").addEventListener("click", function () {
        const trackingModal = new bootstrap.Modal(document.getElementById('trackingModal'));
        trackingModal.show();
    });
});

// Ürün HTML'sini oluşturma fonksiyonu
export function createProductHTML(product) {
    const productHTML = `
    <div class="product-image-container">
        <!-- Mobilde kaydırma için swiper, PC'de sadece resim -->
        <div class="swiper-container product-slider d-md-none">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img class="img-fluid first-image" src="${product.image}" alt="${product.name}"/>
                </div>
                <div class="swiper-slide">
                    <img class="img-fluid second-image" src="${product.image2}" alt="${product.name}"/>
                </div>
            </div>
            <!-- Pagination (kaydırma noktaları) -->
            <div class="swiper-pagination"></div>
        </div>

        <!-- PC'de hover efekti için -->
        <img class="img-fluid first-image d-none d-md-block" src="${product.image}" alt="${product.name}"/>
        <img class="img-fluid second-image d-none d-md-block" src="${product.image2}" alt="${product.name}"/>
    </div>

    <div class="detaly d-inline">
        <span class="head z-3">
            <button class="btn btn-dark shop-now" data-product-id="${product.id}">SHOP NOW</button>
            
            <!-- Sepet Butonuna Ürün Bilgilerini Ekleyelim -->
            <button class="btn btn-dark btn-dark-1 cart-btn-1" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">
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
    </div>`;

    // Oluşturulan HTML yapısını döndürüyoruz
    return productHTML;
}

// Döviz kuru alma fonksiyonu
export async function getExchangeRate(toCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await response.json();
    return data.rates[toCurrency];
}

// Para birimi sembolünü getiren fonksiyon
export function getCurrencySymbol(currency) {
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

// Fiyatları çevirme ve HTML güncelleme fonksiyonu
export async function convertPrices(currency, products, selectedProduct = null) {
    const rate = await getExchangeRate(currency);

    products.forEach(product => {
        const convertedPrice = Math.round(product.price * rate);
        const convertedOriginalPrice = Math.round(product.originalPrice * rate);


        // Ürün listeleme sayfası fiyatlarını güncelle
        document.querySelectorAll(`#price-${product.id}`).forEach((el) => {
            el.innerText = `${getCurrencySymbol(currency)}${convertedPrice}`;
        });

        document.querySelectorAll(`#originalPrice-${product.id}`).forEach((el) => {
            el.innerHTML = `<del>${getCurrencySymbol(currency)}${convertedOriginalPrice}</del>`;
        });

        // Eğer bir tekil ürün sayfasındaysak ve seçili ürünün fiyatını güncellemek istiyorsak
        if (selectedProduct && selectedProduct.id === product.id) {
            const singleProductPrice = document.getElementById("product-price");
            if (singleProductPrice) {
                singleProductPrice.innerText = `${getCurrencySymbol(currency)}${convertedPrice}`;
            }
        }
    });
}

export async function handleCurrencySelection(products, selectedProduct = null) {
    const currencySelect = document.getElementById('flag');
    
    // Sayfa yüklendiğinde kaydedilen para birimini Local Storage'dan al
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
        currencySelect.value = savedCurrency; // Önceki seçimi ayarla
        await convertPrices(savedCurrency, products, selectedProduct); // Fiyatları güncelle
    }

    // Para birimi seçimi değiştiğinde çalışacak kod
    if (currencySelect) {
        currencySelect.addEventListener('change', async function () {
            const selectedCurrency = this.value;
            
            // Seçilen para birimini Local Storage'a kaydet
            localStorage.setItem('selectedCurrency', selectedCurrency);

            await convertPrices(selectedCurrency, products, selectedProduct);
        });
    }
}


// E-posta doğrulama fonksiyonu
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Bildirim mesajını gösteren fonksiyon
  export const showNotification = (message, isError = false) => {
    const notice = document.createElement('div');
    notice.style.position = 'fixed';
    notice.style.top = '50%';
    notice.style.left = '50%';
    notice.style.transform = 'translate(-50%, -50%)';
    notice.style.backgroundColor = isError ? '#e57373' : '#66bb6a'; // Hata varsa kırmızı, başarı varsa yeşil yanacak
    notice.style.color = '#fff';
    notice.style.padding = '10px 20px';
    notice.style.borderRadius = '5px';
    notice.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    notice.style.zIndex = '1000';
    notice.textContent = message;
    
    document.body.appendChild(notice);
    
    setTimeout(() => {
      notice.remove();
    }, 3000); // 3 saniye sonra mesajı kaldırın
  };
  
  // Abonelik mesajı gösteren fonksiyon
  export const showSubscribeMessage = () => {
    const emailInputElement = document.getElementById('emailInput');
    const emailInput = emailInputElement.value.trim(); // E-posta değerini al
  
    if (!validateEmail(emailInput)) {
      showNotification("Please enter a valid email address.", true); // Hata mesajı kırmızı zeminle
      return;
    }
    
    showNotification(`Subscribed successfully with email: ${emailInput}`, false); // Başarı mesajı yeşil zeminle
  };
  
  

 // Sepet dizisini dışarıda tanımlıyoruz
let cart = [];
let totalPrice = 0; // Toplam fiyat için global bir değişken

document.addEventListener("DOMContentLoaded", function () {
    const cartDropdown = document.getElementById('cart-dropdown'); // Masaüstü sepet açılır kutusu
    const cartButton = document.querySelector('.btn-card'); // Masaüstü sepet butonu
    const cartListElement = document.getElementById('cart-list-items'); // Sepet ürünlerinin listeleneceği yer
    const totalPriceElement = document.getElementById('total-price'); // Toplam fiyatı göstereceğimiz yer

    // Mobil sepet öğeleri
    const mobileCartDropdown = document.getElementById('mobile-cart-dropdown'); // Mobil sepet açılır kutusu
    const mobileCartButton = document.querySelector('.btn-card-mobile'); // Mobil sepet butonu
    const mobileCartListElement = document.getElementById('mobile-cart-list-items'); // Mobil sepet ürünlerinin listeleneceği yer
    const mobileTotalPriceElement = document.getElementById('mobile-total-price'); // Mobil toplam fiyatı göstereceğimiz yer

    // Sepet sayısı göstergeleri (PC ve Mobil)
    const itemCountElementPC = document.getElementById('item-count'); // PC için sepet sayısı
    const itemCountElementMobile = document.getElementById('item-count-mobile'); // Mobil için sepet sayısı

    // Sayfa yüklendiğinde localStorage'dan sepeti yükle
    function loadCartFromStorage() {
        const storedCart = localStorage.getItem('cart');
        const storedTotalPrice = localStorage.getItem('totalPrice');

        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        if (storedTotalPrice) {
            totalPrice = parseFloat(storedTotalPrice);
        }

        // Sepeti ekrana yansıt
        updateCartDisplay();
        updateMobileCartDisplay();
    }

    // Sepeti localStorage'a kaydet
    function saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    }

    // Sepete ürün ekleme fonksiyonu
    function addToCart(productId, productName, productPrice, productImage) {
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            image: productImage,
        };

        // Sepette aynı ürün var mı kontrol et
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            // Aynı ürün varsa miktarını artır
            existingProduct.quantity += 1;
        } else {
            // Yeni ürünü sepete ekle
            cart.push(product);
        }

        // Toplam fiyatı güncelle
        calculateTotalPrice();

        // Sepet içeriğini güncelle (hem masaüstü hem de mobil için)
        updateCartDisplay();
        updateMobileCartDisplay();

        // Sepeti kaydet
        saveCartToStorage();
    }

    // Sepetin toplam fiyatını hesaplama fonksiyonu
    function calculateTotalPrice() {
        totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    // Masaüstü için sepet içeriğini HTML'de güncelleme fonksiyonu
    function updateCartDisplay() {
        cartListElement.innerHTML = ''; // Önce sepeti temizle

        cart.forEach(product => {
            const listItem = document.createElement('div');
            listItem.classList.add('cart-item');
            listItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">
                <p>${product.name} <span class="item-quantity">x${product.quantity}</span></p>
                <span class="item-price">$${(product.price * product.quantity).toFixed(2)}</span>
                <button class="remove-btn" data-product-id="${product.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartListElement.appendChild(listItem);
        });

        // Toplam fiyatı güncelle
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

        // Sepetteki benzersiz ürün sayısını güncelle
        updateItemCountDisplay();
    }

    // Mobil için sepet içeriğini HTML'de güncelleme fonksiyonu
    function updateMobileCartDisplay() {
        mobileCartListElement.innerHTML = ''; // Önce sepeti temizle

        cart.forEach(product => {
            const listItem = document.createElement('div');
            listItem.classList.add('cart-item');
            listItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">
                <p>${product.name} <span class="item-quantity">x${product.quantity}</span></p>
                <span class="item-price">$${(product.price * product.quantity).toFixed(2)}</span>
                <button class="remove-btn" data-product-id="${product.id}">🗑</button>
            `;
            mobileCartListElement.appendChild(listItem);
        });

        // Toplam fiyatı güncelle
        mobileTotalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

        // Sepetteki benzersiz ürün sayısını güncelle
        updateItemCountDisplay();
    }

    // Sepetteki benzersiz ürün sayısını güncelleme fonksiyonu
    function updateItemCountDisplay() {
        const itemCount = cart.reduce((total, product) => total + product.quantity, 0); // Toplam ürün miktarı
        itemCountElementPC.textContent = itemCount; // PC sepet simgesinde güncelle
        itemCountElementMobile.textContent = itemCount; // Mobil sepet simgesinde güncelle
    }

    // Ürünü sepetten çıkarma fonksiyonu
    function removeFromCart(productId) {
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex > -1) {
            cart.splice(productIndex, 1);
        }

        // Toplam fiyatı güncelle
        calculateTotalPrice();

        // Sepet içeriğini güncelle
        updateCartDisplay();
        updateMobileCartDisplay();
        saveCartToStorage(); // Sepeti kaydet
    }

    // Sepet butonuna tıklayınca açılır kutuyu göster (Masaüstü)
    cartButton.addEventListener('click', function() {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Sepet butonuna tıklayınca açılır kutuyu göster (Mobil)
    mobileCartButton.addEventListener('click', function() {
        mobileCartDropdown.style.display = mobileCartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Sepet dışındaki alanlara tıklanınca sepeti kapat (Masaüstü ve Mobil)
    document.addEventListener('click', function(event) {
        if (!cartButton.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.style.display = 'none'; // Boşluğa tıklayınca masaüstü sepeti kapat
        }

        if (!mobileCartButton.contains(event.target) && !mobileCartDropdown.contains(event.target)) {
            mobileCartDropdown.style.display = 'none'; // Boşluğa tıklayınca mobil sepeti kapat
        }
    });

    // Sayfa yüklendiğinde sepeti geri yükle
    loadCartFromStorage();

    // Sepet öğeleri üzerinde tıklama olayını dinle
    document.body.addEventListener('click', function(event) {
        // Ürün ekleme butonuna tıklama
        if (event.target.closest('.cart-btn-1')) {
            const button = event.target.closest('.cart-btn-1');
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseFloat(button.getAttribute('data-product-price'));
            const productImage = button.getAttribute('data-product-image');

            if (productId && productName && !isNaN(productPrice)) {
                addToCart(productId, productName, productPrice, productImage);
            } else {
                console.error("Ürün bilgileri eksik veya hatalı!");
            }
        }

        // Ürün silme butonuna tıklama
        if (event.target.closest('.remove-btn')) {
            const productId = event.target.closest('.remove-btn').getAttribute('data-product-id');
            removeFromCart(productId); // Ürünü sepetten sil
        }
    });
});
