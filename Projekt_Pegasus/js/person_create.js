
/*
 * Copyright (c) 2019. Valentin Platzgummer \nlast modified:6/2/19 7:27 PM
 */

window.addEventListener('load', init);

function init() {
    var radioFieldSet = document.getElementById('role');
    var radios = radioFieldSet.getElementsByTagName('input');
    for (var radio of radios) {
        radio.onclick = appendTable;
    }
}
function print_radio(event) {

    console.log(event.target.id);

}
function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];

    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

function appendTable(event) {
    if (event) {
        var table = document.getElementById('person-variable-fields');
        var role_table = document.createElement('tbody');
        var role = event.target.id;
        if (role == 'employee') {
            var row = role_table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.textContent = 'Angestellten Nr';

            input = document.createElement('INPUT');
            input.setAttribute('name', 'emp_id');
            input.setAttribute('required', 'true');
            cell2.appendChild(input);
        }
        if (role == 'passager') {
            var row = role_table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.textContent = 'Passagier Nr';

            input = document.createElement('INPUT');
            input.setAttribute('name', 'pass_id');
            input.setAttribute('required', 'true');
            cell2.appendChild(input);
        }

        if (role == 'engineer') {
            var row1 = role_table.insertRow(0);
            var cell1 = row1.insertCell(0);
            var cell2 = row1.insertCell(1);
            cell1.textContent = 'Techniker Lizenz Nr';

            input = document.createElement('INPUT');
            input.setAttribute('name', 'lic_id');
            input.setAttribute('required', 'true');
            cell2.appendChild(input);

            var row2 = role_table.insertRow(1);
            var cell1 = row2.insertCell(0);
            var cell2 = row2.insertCell(1);
            cell1.textContent = 'Techniker - Schiff Typ';

            input = document.createElement('INPUT');
            input.setAttribute('name', 'ship_type');
            cell2.appendChild(input);
        }
        if (role == 'capitan') {
            var row1 = role_table.insertRow(0);
            var cell1 = row1.insertCell(0);
            var cell2 = row1.insertCell(1);
            cell1.textContent = 'Kapit&auml;ns Patent';

            input = document.createElement('INPUT');
            input.setAttribute('name', 'cap_pat');
            input.setAttribute('required', 'true');
            cell2.appendChild(input);
        }
        table.innerHTML ="";
        table.appendChild(role_table);
    }
}
