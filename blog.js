document.addEventListener("DOMContentLoaded", function() {
    fetch('common.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading common.html:', error));
});