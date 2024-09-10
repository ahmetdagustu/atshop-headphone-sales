// Dinamik header ekleme
document.addEventListener("DOMContentLoaded", function() {
    // Dinamik header ekle
    document.body.insertAdjacentHTML('afterbegin', `
    <header class="site-header">
      <div id="top-banner" class="top-banner row d-flex mt-3 align-items-center justify-content-between">
          <!-- ATShop Logo -->
          <div class="col-6 d-flex justify-content-center mobile-logo">
              <a href="#">ATShop</a>
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
                  <div class="shopping-cart-list d-none">
                    <div class="shopping-cart-header d-flex align-items-center justify-content-center">
                        <b class="fs-5 my-3 flex-grow-1 text-start">Shopping Cart</b>
                        <span id="total-price" class="fs-5 my-3 text-end"></span>
                    </div>
                    <div id="cart-list-items-desktop"></div>
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
                      <div class="category">
                          <a href="#">
                              <h1 class="mb-3">Categories</h1>
                              <ul>
                                  <li><a href="">Wireless</a></li>
                                  <li><a href="">Inear Headphone</a></li>
                                  <li><a href="">Overear</a></li>
                                  <li><a href="">Sport Headphone</a></li>
                              </ul>
                          </a>
                          <img class="img-fluid" src="/images/image1.webp" alt="Product"/>
                      </div>
                      <div class="category">
                          <a href="#">
                              <h1 class="mb-3">Categories</h1>
                              <ul>
                                  <li><a href="">Wireless</a></li>
                                  <li><a href="">Inear Headphone</a></li>
                                  <li><a href="">Overear</a></li>
                                  <li><a href="">Sport Headphone</a></li>
                              </ul>
                          </a>
                          <img class="img-fluid" src="/images/image4_2.webp" alt="Product"/>
                      </div>
                      <div class="category">
                          <a href="#">
                              <h1 class="mb-3">Categories</a>
                              <ul>
                                  <li><a href="">Wireless</a></li>
                                  <li><a href="">Inear Headphone</a></li>
                                  <li><a href="">Overear</a></li>
                                  <li><a href="">Sport Headphone</a></li>
                              </ul>
                          </a>
                          <img class="img-fluid" src="/images/image3_4.webp" alt="Product"/>
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
                    <a href="#"><h3>ATShop</h3></a>
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

    // Footer kısmını #footer-container id'li div içine ekle
    document.getElementById("footer-container").innerHTML = footerHTML;
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

    // Modal'ı sayfaya ekle
    document.getElementById("tracking-modal-container").innerHTML = trackingModalHTML;

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
            <button class="btn btn-dark btn-dark-1 cart-btn-1">
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
export async function convertPrices(currency, products) {
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
    });
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
  