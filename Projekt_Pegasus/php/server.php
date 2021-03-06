<?php
session_start();

const SESSION_NAME = 'user';    //!< distinguish between names: different user are detected
const TYPE_USE = 'type';         //!< distinguish between type: test, examine teach
const RESET = 'reset';          //!< has user reset, begin from top?
const RANDOM = 'random';        //!< session variable is random enabled?
const AMOUNT = 'amount';         //!< how many question get asked per exam
const ASKED = 'asked';          //!< how many questions has been asket
$index_array = array();
$predefinedQuestions = predefinedQuests();  // get the predefined quest array

// if not set session cookie, create a new on with full index array
if (!isset($_SESSION[SESSION_NAME])) {
    $_SESSION[SESSION_NAME] = getFullIndexArray(count($predefinedQuestions));
    $_SESSION[RANDOM] = 'false';
    $_SESSION[TYPE_USE] = 'teach';
    $_SESSION[AMOUNT] = 10;      // set 10 question as default
    $_SESSION[ASKED] = 0;

}

$reset = $_SESSION[RESET];

// if reset is set begin with new array
if ($reset == 'true') {
    resetCurrentSession($predefinedQuestions);
    $_SESSION[RESET] = 'false'; // restore the normal working
    $_SESSION[ASKED] = 0;       // reset the value of asked quests
}

// get index array from session
$index_array = $_SESSION[SESSION_NAME];
$random = $_SESSION[RANDOM];
$amount = $_SESSION[AMOUNT];

// test if amount is greater than actual array
if ($amount > count($predefinedQuestions)) {
    $amount = count($predefinedQuestions);
}

sendQuestions($predefinedQuestions, $index_array, $random, $amount);


function sendQuestions($predefinedQuestions, $index_array, $random, $amount)
{
    // counter

// get the questions that had not been already send
    $unsend = initQuestions($predefinedQuestions, $index_array);

    // if sate is in exam print out only the given amount
    if ($_SESSION[ASKED] < $amount && $_SESSION[TYPE_USE] == 'exam') {
        outpuSingleQuest($unsend, $random);
    } // if sate is in teach or exercice print out entire array
    else if (($_SESSION[TYPE_USE] == 'teach' || $_SESSION[TYPE_USE] == 'exercise') && count($unsend) > 0) {
        outpuSingleQuest($unsend, $random);
    } // if all questions had been send, return an index of -1 to signal the client cycle done
    else {
        $question = new Question('', '', '');
        $question->index = -1;
        echo json_encode($question);

        // and begin a new full cycle
        $_SESSION[SESSION_NAME] = getFullIndexArray(count($predefinedQuestions));
        $_SESSION[ASKED] = 0;
    }
}

function outpuSingleQuest($unsend, $random)
{
    // if random mode has been set, pick a random number from the unsend, else simple take the first
    $random == 'true' ? $index = rand(0, count($unsend) - 1) : $index = 0;
    $unsend = array_values($unsend);  // pick the corresponding item
    $question = $unsend[$index];    // create an quest object

    array_splice($_SESSION[SESSION_NAME], $index, 1);  // remove this index from session index array
    $jsonQuest = json_encode($question);    // convert the object to json
    $_SESSION[ASKED]++;
    echo $jsonQuest;    // and send it to the client.
}

// Question class definiton
class Question
{
    public $question;
    public $answer;
    public $index;
    public $alternatives = [];  // alternative answers array

    // constructior
    function __construct($question, $answer, $alternatives)
    {
        $this->question = $question;
        $this->answer = $answer;
        $this->alternatives = $alternatives;
    }
}

// init new unsend quest array
function initQuestions($questions, $index_array)
{
    $temp = array();
    // filter out all objects with a corresponing index in session index array
    for ($i = 0; $i < count($questions); $i++) {
        $question = $questions[$i];
        $question->index = $i;
        for ($j = 0; $j < count($index_array); $j++) {
            if ($question->index == $index_array[$j]) {
                $temp[$i] = $question;
            }
        }
    }
    return $temp;
}

function predefinedQuests()
{
    // constant array of questions
    return array(
        new Question("Wie viel wiegt ein ausgewachsenes Nashorn?", "3400 kg", array("120 kg", "25 t", "8.000 kg")),
        new Question("Wie lange kann ein Blauwaal maximal unter Wasser bleiben, ohne Luft zu holen?", "50 Minuten", array('3 Stunden', '20 Sekunden', '1 Tag')),
        new Question("Wie viele Planeten existieren in unserem Sonnensystem?", "8", array("3", "9", "15")),
        new Question(" Wo leben Eisbären?", "Rund um den Nordpol", array("Südpol", "Australien", "Mond")),
        new Question("Wie lange ist der Umfang der Erde, auch genannt Äquator?", "40.075,017 km", array("34.999 m", "512 km", "803.434 cm")),
        new Question("Wie alt können Pferde werden?", "Zwischen 25-30 Jahre", array("Maximal 5 Jahre", "9 Monate", "13 Jahre")),
        new Question("Wie schnell können Geparden laufen?", "100-120 km/h", array("80 m/s", "35 km/h", "1800 km/h")),
        new Question("Welcher Staat war 2017 der größte Kartoffelproduzent?", "China", array("USA", "Deutschland", "Brasilien")),
        new Question("Welcher ist der größte Ozean der Erde?", "Pazifischer Ozean", array("Indischer Ozean", "Südlicher Ozean", "Arktischer Ozean")),
        new Question("Wie lange kann ein Mensch die Luft anhalten?", "fast 22 Minuten", array("3 Minuten", "1 Stunden", "1680 Sekunden")),
        new Question("Aus wievielen Staaten bestehen die Vereinigten Staaten von Amerika?", "50", array("38", "12", "47")),
        new Question("Was ist der teuerste existierende Rohstoff dieser Welt?", "Californium 252", array("Gold", "Titan", "Quarz")),
        new Question("Wie heißt der Prozess, welcher für die Stoff- und Energieumwandlung bei Pflanzen notwendig ist?", "Fotosynthese", array("Regeneration", "Antithese", "Kalte Fusion")),
        new Question("Das wieviel-fache ihres Körpergewichtes können Ameisen tragen?", "30fach", array("2fach", "10fach", "140fach")),
        new Question("Wie groß kann ein Königspungiun werden?", "85-95cm", array("2m", "178 cm", "12 cm"))
    );
}

// create an index array with the given index count
function getFullIndexArray($predefinedQuestsCount)
{
    $temp = array();
    for ($i = 0; $i < $predefinedQuestsCount; $i++) {
        $temp[$i] = $i;
    }
    return $temp;
}

// reset the current session
function resetCurrentSession($predefinedQuestions)
{
    $_SESSION[SESSION_NAME] = getFullIndexArray(count($predefinedQuestions));

}