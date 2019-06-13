<?php 
session_start();
 header("Content-Type: application/json; charset=-utf-8");

class Question {
    public $question;
    public $rightAnswer;
    public $alternatives = [];
  }

$firstQuestion = new Question;
$firstQuestion->question = '1. Frage';
$firstQuestion->rightAnswer = '1. richtige Antwort';
$firstQuestion->alternatives = array('1.1 alternative', '1.2 alternative', '1.3 alternative');

$jsonQuest = json_encode($firstQuestion);
echo $jsonQuest;
?>


