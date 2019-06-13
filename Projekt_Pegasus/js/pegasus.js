window.addEventListener('load', setup);

function setup() {
    document.getElementById('next-quest').addEventListener('click', getNext);

}


function getNext() {
    if (window.XMLHttpRequest) {
        xmlhttp =  new XMLHttpRequest();
    } 
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById('quest-field').innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open('GET', '/../php/server.php');
    xmlhttp.addEventListener('load', getRespond);
    xmlhttp.addEventListener('error', getError);
    xmlhttp.send();
}

function getRespond(event) {
    var respond = JSON.parse(event.target.responseText);
    var questionField = document.getElementById('question-field')
    // add the question text
    questionField.getElementsByTagName('h3')[0].innerText= respond.index + ". Frage"; // this is the hesader h3
    questionField.getElementsByTagName('p')[0].innerText = respond.question; // this is the question paragraph

    // add the answer buttons
    var quest_field = document.getElementById('quest-field');
    let alternatives = respond.alternatives;
    alternatives.forEach(element => {
        var button = document.createElement('button');
        button.addEventListener('click', function() {
            evaluateAnswer(element, respond.answer);
        });

        button.innerText = element;
        quest_field.appendChild(button);
    });
}

function evaluateAnswer(element, answer) {
    console.log(element);
    console.log(answer);
}

function getError() {

}