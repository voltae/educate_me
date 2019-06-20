<?php
session_start();

const SESSION_NAME = 'user';    //!< distinguish between names: different user are detected
const TYPE_USE ='type';         //!< distinguish between type: test, examine teach
const RESET = 'reset';          //!< has user reset, begin from top?
const RANDOM = 'random';        //!< session variable is random enabled?

$type = $_POST[TYPE_USE];
$reset = $_POST[RESET];
switch ($type) {
    case 'exam':
        $_SESSION[RANDOM] = TRUE;
        break;
    case 'teach':
    case 'test':
        $_SESSION[RANDOM] = FALSE;
        break;
    default:
        die("wrong name in selection");
        break;
}
$_SESSION[TYPE_USE] = $type;
$_SESSION[RESET] = ($reset == 'true' ? TRUE : FALSE);