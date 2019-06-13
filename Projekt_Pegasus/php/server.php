<?php 
session_start();
 header("Content-Type: application/json; charset=-utf-8");

class Question {
    public $question;
    public $answer;
    public $index;
    public $alternatives = [];
    
  function __construct($question, $answer, $index, $alternatives) {
      $this->question = $question;
      $this->answer = $answer;
      $this->index= $index;
      $this->alternatives=$alternatives;
  }
}
$questions = array(
     new Question("1. Frage", "1. richtige Antwort", 1, array('1.1 alternative', '1.2 alternative', '1.3 alternative')),
     new Question("2. Frage", "2. richtige Antwort", 2, array('2.1 alternative', '2.2 alternative', '2.3 alternative')),
     new Question("3. Frage", "3. richtige Antwort", 3, array('3.1 alternative', '3.2 alternative', '3.3 alternative')),
     new Question("4. Frage", "4. richtige Antwort", 4, array('4.1 alternative', '4.2 alternative', '4.3 alternative')),
     new Question("5. Frage", "5. richtige Antwort", 5, array('5.1 alternative', '5.2 alternative', '5.3 alternative'))
  );

$question = $questions[array_rand($questions)];

$jsonQuest = json_encode($question);
echo $jsonQuest;

?>