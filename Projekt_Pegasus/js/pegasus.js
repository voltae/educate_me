window.addEventListener('load', setup);

function setup() {
    document.getElementById('next_quest').addEventListener('click', getNext);
}


function getNext() {
    if (window.XMLHttpRequest) {
        xmlhttp =  new XMLHttpRequest();
    } 
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status ==200) {
            document.getElementById('quest_field').innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open('GET', '/../php/server.php');
    xmlhttp.addEventListener('load', function(event) {
        console.log(XMLHttpRequest.responseText);
    })
    xmlhttp.send();
}