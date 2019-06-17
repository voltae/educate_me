window.addEventListener('load', setup);

function setup() {
    document.getElementById('next-quest').addEventListener('click', getNext);
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

function getRespond(event) {
    var respond = JSON.parse(event.target.responseText);
    var questionField = document.getElementById('question-field')
    if(parseInt(respond.index) >= 0){
        // add the question text
        questionField.getElementsByTagName('h3')[0].innerText= getCount() + ". Frage"; // this is the header h3
        questionField.getElementsByTagName('p')[0].innerText = respond.question; // this is the question paragraph

        // add the answer buttons
        var quest_field = document.getElementById('quest-field');
        quest_field.innerHTML="";
        var table = document.createElement('tr');
        quest_field.appendChild(table);
        table.className = 'table table-borderless';

        var tr = document.createElement("tr");
        table.appendChild(tr);
        var answers = respond.alternatives;
        answers.push(respond.answer);   // add he answer to the buttons

        answers = shuffleArray(answers);
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

    var feedback = document.getElementById("feedback-field");
    if(element == answer) {
        feedback.className='alert alert-success';
        feedback.innerText = "Super, diese Antwort ist richtig!";
    } else {
        feedback.className='alert alert-warning';
        feedback.innerText = "Schade. Diese Antwort ist leider falsch!";  
    }
}

function shuffleArray(array) {
    array.sort(() => Math.random - 0.5);
    return array;
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
