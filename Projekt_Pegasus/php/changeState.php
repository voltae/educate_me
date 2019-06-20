<?php
session_start();

const SESSION_NAME = 'user';    //!< distinguish between names: different user are detected
const TYPE_USE ='type';         //!< distinguish between type: test, examine teach
const RESET = 'reset';          //!< has user reset, begin from top?
const RANDOM = 'random';        //!< session variable is random enabled?

$type = $_POST[TYPE_USE];
$reset = $_POST[RESET];
$sess = ($_SESSION[SESSION_NAME]);
// begin with full array
if ($reset == 'true') {
    resetCurrentSession($predefinedQuestions);
}

switch ($type) {
    case 'exam':
        $_SESSION[RANDOM] = 'true';
        resetCurrentSession($predefinedQuestions);
        break;
    case 'teach':
    case 'test':
        $_SESSION[RANDOM] = 'false';
        break;
    default:
        die("wrong name in selection");
        break;
}
$_SESSION[TYPE_USE] = $type;
