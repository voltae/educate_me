window.addEventListener('load', setup);
let result;     // global reference to class variable for result protocol

function setup() {
    document.getElementById('next-quest').addEventListener('click', getNext); // add listener to quest button

    start();

}

// start function handles restart either
function start() {
    result = new Results();     // create new result protocol reference
    // deactivate restart menu till quests are all done
    let menuitem = document.getElementById('restart');
    menuitem.removeEventListener('click', start);
    menuitem.classList.add('disabled');     // set menu item inactive;

    document.getElementById('feedback').innerText = 'Primary Science - Prüfungsmodul';

    // start new result counting
    result.resetCorrect();
    result.resetCount();
    result.setCurrentExam(true);
    document.getElementById('exam-field').hidden = !result.isCurrentExam;   // if current exam running set to false
}

// class function for result protocol
class Results {
    constructor () {
        this.count = 0;
        this.correct = 0;
        this.isCurrentExam = false;
    }

    incrementCount() { this.count++; }
    getCount() { return this.count; }
    resetCount() { this.count = 0 }

    incrementCorrect() { this.correct++;}
    getCorrect() { return this.correct; }
    resetCorrect() { this.correct = 0; }

    isCurrentExam() { return this.isCurrentExam; }
    setCurrentExam(value) { this.isCurrentExam = value; }
}


function getNext() {
    if (result.isCurrentExam) {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        xmlhttp.open('GET', '/../php/server.php');
        xmlhttp.addEventListener('load', getRespond);
        xmlhttp.addEventListener('error', getError);
        xmlhttp.send();
    }
}

function getRespond(event) {
    let respond = JSON.parse(event.target.responseText);
    let questionField = document.getElementById('question-field');
    if(parseInt(respond.index) >= 0){
        // add the question text
        result.incrementCount();
        questionField.getElementsByTagName('h3')[0].innerText= result.getCount() + ". Frage"; // this is the header h3
        questionField.getElementsByTagName('p')[0].innerText = respond.question; // this is the question paragraph

        updateQuestions(respond);

    } else {
        document.getElementById('feedback').innerText ='Du hast '+ result.getCorrect() + ' Fragen von ' +result.getCount()+ ' richtig beantwortet!';
       let menuitem =  document.getElementById('restart');
        menuitem.addEventListener('click', start); // add listener to start again
        menuitem.classList.remove('disabled');

        const score = parseInt(result.getCorrect() / result.getCount() * 100); // calculate score
        document.getElementById('answers').innerText= score + " % richtig"; // this is the header h3
        result.setCurrentExam(false);
        document.getElementById('exam-field').hidden = !result.isCurrentExam;  // if current exam not running set to true
        // set highscore only if score is better than the least entry in highscore
        if (isValueInHighscore(score)) {
            setHighscore(score);
        }
    }
}

function updateQuestions(respond) {
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
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.addEventListener('click', function() {
            evaluateAnswer(element, respond.answer);
        });
        button.innerText = element;
        button.className ='btn btn-outline-primary';
        td.appendChild(button);
        tr.appendChild(td);
    });
}
function evaluateAnswer(element, answer) {
    let feedback = document.getElementById("feedback-field");
    if(element === answer) {
        feedback.className='alert alert-success';
        feedback.innerText = "Super, diese Antwort ist richtig!";
        result.incrementCorrect();
    } else {
        feedback.className='alert alert-warning';
        feedback.innerText = "Schade. Diese Antwort ist leider falsch!";
    }
    getNext();
}

function setHighscore(score) {
    let name = prompt("High Score - Bitte Name eingeben", "Name");

    if (name != null && name != "") {
        submitName(name, score);
    }

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

function getError() {
}

