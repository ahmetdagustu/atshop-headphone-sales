document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const drMenu = document.getElementById("dr-menu");

    menuIcon.addEventListener("click", function() {
        drMenu.classList.toggle("show");
    });
});
