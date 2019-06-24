window.addEventListener('load', init);

// display active link in menu list
function init() {
    const url = document.URL;
    filename = url.split('/').pop().split('.').shift();
    let regex = new RegExp(filename, 'gi');
    let menuItems = document.getElementsByClassName('switchState')[0].children;
    for (menuItem of menuItems) {
        if (menuItem.children[0].className.match(regex)) {
            menuItem.children[0].classList.add('active');
        }
    }
}