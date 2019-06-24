

window.addEventListener('load', init);

function init() {
    displayHighscore();
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

// key in localStorage
const USERS = 'users';

function displayHighscore() {
    let usersString = localStorage.getItem(USERS);
    let users;
    let i = 0;
    if (usersString == null) {
        users = [{name:"", score:0}];
    } else {
        users = JSON.parse(usersString);
    }

    let tbody = document.createElement('tbody');
    users.forEach((user) => {
        let row = document.createElement('tr');
        let cell1 = document.createElement('td');
        cell1.innerText = ++i;
        let cell2 = document.createElement('td');
        cell2.innerText = user.name;
        let cell3 = document.createElement('td');
        cell3.innerText = user.score + " %";
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        tbody.appendChild(row)
    });
    oldbody = document.getElementsByTagName('tbody')[0];
    oldbody.parentNode.replaceChild(tbody, oldbody);
}
