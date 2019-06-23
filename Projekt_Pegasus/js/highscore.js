

window.addEventListener('load', init);

function init() {
    displayHighscore();
}

// key in localStorage
const USERS = 'users';

function displayHighscore() {
    let usersString = localStorage.getItem(USERS);
    let users;
    if (usersString == null) {
        users = [{name:"", score:0}];
    } else {
        users = JSON.parse(usersString);
    }

    let tbody = document.createElement('tbody');
    users.forEach((user) => {
        let row = document.createElement('tr');
        let cell1 = document.createElement('td');
        cell1.innerText = user.name;
        let cell2 = document.createElement('td');
        cell2.innerText = user.score;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row)
    });
    oldbody = document.getElementsByTagName('tbody')[0];
    oldbody.parentNode.replaceChild(tbody, oldbody);
}
