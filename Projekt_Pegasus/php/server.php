<?php
session_start();

$session_name = 'user';
// set cookie if not exists, max duration 1 day
if (!isset($_SESSION[$session_name])) {
  $_SESSION[$session_name] = [];
}
// get index array from cookie
$index_array = $_SESSION[$session_name];

// Question class definiton
class Question
{
  public $question;
  public $answer;
  public $index;
  public $alternatives = [];
  
  function __construct($question, $answer, $alternatives)
  {
    $this->question = $question;
    $this->answer = $answer;
    $this->alternatives = $alternatives;
  }
}

$unsend = initQuestions($index_array);

if (count($unsend) == 0) {
     $question = new Question('','',''); 
     echo json_encode($question);
     $_SESSION[$session_name] = [];
  }
else {  
  $index = rand(0, count($unsend) - 1);
  $question = $unsend[$index];
  $question->index = $index + 1;
  
  $jsonQuest = json_encode($question);
  echo $jsonQuest;
  array_push($index_array, $index);
  sort($index_array);
  $_SESSION[$session_name] = $index_array;
}

// init new question array
function initQuestions($index_array)
{
  // constant array of questions
$questions = array(
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
  $temp = array();

  for ($i = 0; $i < count($questions); $i++) {
    $question = $questions[$i];
    $question->index = $i;
    $temp[$i] = $questions[$i];
  }
  for ($i = 0; $i < count($index_array); $i++) {
    if ($temp->index == $index_array[$i]) {
      array_slice($temp, $i, 1);
    }
  }
  return $temp;
}
