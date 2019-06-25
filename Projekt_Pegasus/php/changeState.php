<?php
session_start();

const SESSION_NAME = 'user';    //!< distinguish between names: different user are detected
const TYPE_USE ='type';         //!< distinguish between type: test, examine teach
const RESET = 'reset';          //!< has user reset, begin from top?
const RANDOM = 'random';        //!< session variable is random enabled?
const AMOUNT = 'amount';         //!< how many question get asked per exam
const ASKED = 'asked';          //!< how many questions has been asket

$type = $_POST[TYPE_USE];
$reset = $_POST[RESET];
$amount = $_POST[AMOUNT];
switch ($type) {
    case 'exam':
        $_SESSION[RANDOM] = TRUE;
        $_SESSION[AMOUNT] = $amount;
        $_SESSION[] = 0;    // reset the asked questions
        break;
    case 'exercise':
    case 'teach':
        $_SESSION[RANDOM] = FALSE;
        break;
    default:
        die("wrong name in selection");
        break;
}
$_SESSION[TYPE_USE] = $type;
$_SESSION[RESET] = ($reset == 'true' ? TRUE : FALSE);