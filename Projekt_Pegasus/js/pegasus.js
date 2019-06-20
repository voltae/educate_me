window.addEventListener('load', setup);

function setup() {
    document.getElementById('next-quest').addEventListener('click', getNext);
    let stateItems = document.getElementsByClassName('switchState');
    for (menuItem of stateItems) {
        menuItem.addEventListener('click', setState);
    }
}


function getNext() {
    if (window.XMLHttpRequest) {
        xmlhttp =  new XMLHttpRequest();
    }
    xmlhttp.open('GET', '/../php/server.php');
    xmlhttp.addEventListener('load', getRespond);
    xmlhttp.addEventListener('error', getError);
    xmlhttp.send();
}

function setState(event) {
    if (window.XMLHttpRequest) {
        xmlhttp =  new XMLHttpRequest();
    }
    xmlhttp.open('POST', '/../php/server.php');
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var name = event.target.className;
    if (name.includes('nav-link')) {
       name = name.replace('nav-link', '');
    } else if (name.includes('dropdown-item')) {
        name = name.replace('dropdown-item', '');
    }
    name = name.trim();
    xmlhttp.send("type=" +name);
}
function getRespond(event) {
    let respond = JSON.parse(event.target.responseText);
    let questionField = document.getElementById('question-field')
    if(parseInt(respond.index) >= 0){
        // add the question text
        questionField.getElementsByTagName('h3')[0].innerText= getCount() + ". Frage"; // this is the header h3
        questionField.getElementsByTagName('p')[0].innerText = respond.question; // this is the question paragraph

        // add the answer buttons
        let quest_field = document.getElementById('quest-field');
        quest_field.innerHTML="";
        let table = document.createElement('tr');
        quest_field.appendChild(table);
        table.className = 'table table-borderless';

        let tr = document.createElement("tr");
        table.appendChild(tr);
        let answers = respond.alternatives;
        answers.push(respond.answer);   // add he answer to the buttons

        answers = shuffle(answers);
        answers.forEach(element => {
            var td = document.createElement('td');
            var button = document.createElement('button');
            button.addEventListener('click', function() {
                evaluateAnswer(element, respond.answer);
            });
            button.innerText = element;
            button.className ='btn btn-outline-primary';
            td.appendChild(button);
            tr.appendChild(td);
        });
    } else {
        counter = 0;
        getNext();
    }
}

function evaluateAnswer(element, answer) {
    console.log(element);
    console.log(answer);

    let feedback = document.getElementById("feedback-field");
    if(element === answer) {
        feedback.className='alert alert-success';
        feedback.innerText = "Super, diese Antwort ist richtig!";
    } else {
        feedback.className='alert alert-warning';
        feedback.innerText = "Schade. Diese Antwort ist leider falsch!";
    }
    getNext();
}


/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function logRespond(event) {
    console.log(XMLHttpRequest.responseText);
}

var counter = 0;
function getCount(){
    return ++counter;
}

function getError() {

}
