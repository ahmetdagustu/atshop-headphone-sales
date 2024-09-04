



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



// Modal dinamik olarak ekleniyor
document.addEventListener("DOMContentLoaded", function () {
    const modalHTML = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">User Login</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    // Modal'ı modal-container id'li div'e ekle
    document.getElementById("modal-container").innerHTML = modalHTML;
});



// Modal dinamik olarak ekleniyor
document.addEventListener("DOMContentLoaded", function () {
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

    // Modal'ı tracking-modal-container id'li div'e ekle
    document.getElementById("tracking-modal-container").innerHTML = trackingModalHTML;
});





