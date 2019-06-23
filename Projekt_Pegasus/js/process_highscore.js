/**
 * Highscore Object
 * @param name
 * @param score
 * @constructor
 */


// key in localStorage
const USERS = 'users';

// Define object
function User(name, score) {

    this.name = name;
    this.score = score;
}

function updateHighscore(newUserString) {
    // retrieve highscore from localStorage
    let usersString = localStorage.getItem(USERS);
    // parse users
    let users = JSON.parse(usersString);
    // if no highscorelist exists, create a new one
    if (users == null) {
        users = [];
    }
    let newUser =JSON.parse(newUserString);
    users.push(newUser);

    // sort new highscore
    users.sort(compare);
    // store stringified user array.
    localStorage.setItem(USERS, JSON.stringify(users));

}

// write own compare function, like qsort -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function compare(a, b) {
    if (a.score < b.score)
        return 1;
    else if (a.score > b.score)
        return -1;
    else
        return 0;
}

function submitName(username, score) {
    let newUser = new User(username, score)
    updateHighscore(JSON.stringify(newUser));
}