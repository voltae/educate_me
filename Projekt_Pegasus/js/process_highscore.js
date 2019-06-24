/**
 * Highscore Object
 * @param name
 * @param score
 * @constructor
 */


// key in localStorage
const USERS = 'users';

// max amount of entries
const MAX = 10;

// Define object
function User(name, score) {

    this.name = name;
    this.score = score;
}

function getScoreObjects() {
    // retrieve highscore from localStorage
    let usersString = localStorage.getItem(USERS);
    // parse users
    let users = JSON.parse(usersString);
    // if no highscorelist exists, create a new one
    if (users == null) {
        users = [];
    }
    return users;
}

function updateHighscore(newUserString) {
    let usersTemp = getScoreObjects();
    let newUser =JSON.parse(newUserString);
    usersTemp.push(newUser);
    // sort highscore right after insert
    usersTemp.sort(compare);

    let users = [];
    let i = 0;
    // allow only a MAX amount of entries in highscore.
    while (usersTemp[i] && i < MAX) {
        users[i] = usersTemp[i];
        i++;
    }
    // store stringified user array.
    localStorage.setItem(USERS, JSON.stringify(users));
}

/**
 * returns true if array has not reach MAX or is better than last one
 */
function isValueInHighscore (score) {
    let users = getScoreObjects();
    if (users.length < MAX)
        return true;
    // get last object
    for (let user of users) {
        if (user.score < score)
            return true;
    }
    return false;
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
    let newUser = new User(username, score);
    updateHighscore(JSON.stringify(newUser));
}