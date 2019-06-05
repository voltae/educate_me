# educate_me
Educational Web app for children aged 7-10
## Basic science
### Teach
Frage erscheint im Fragefeld. User hat die Möglichkeit mittels Antwort Button die richtige Anwort einzusehen.
_Wie kommt User zur nächste Frage Button oder Time out?_
### Practice
Frage wird angezeigt, User hat Auswahl der Antworten anch Mulitple Choice Prinzip aus 4 Möglichkeiten. Immer nur 1 richtig.
** Progess Bar **
### Test
8 Fragen random ausgewählt. UI wie Practice aber mit mitprotokollieren der Anzahl der richtigen und falschen Antworten.
ab 50% positiv -> Highscore wird automatisch erstellt, Smiley angezeigt; unter 50% -> Wiederholung nach einem Timer (bsp 30 sec; check ob Timer trotz refresh bestehen bleibt) möglich; sadface wird angezeigt. Es wird kein Highscore gespeichert.
### Technische Implementierung
Highscore: Mittels Webstorage speichern;
Fragen und Antworten: Array (JSON List?);

## Task detail
* Create an educational Web app for children aged 7-10 (2nd grade++)
* Choose one educational subject: 
  1. basic math
  2. German
  3. English
  4. basic science
  5. music
* Content
  * Section to teach the subject
  * Section to practice the suResponsive design: might adapt to Laptop browser as well as mobile phone screen; use, e.g., the Chrome tools (Command+Shift+M (Mac) or Ctrl+Shift+M (Windows, Linux)
  * Any framework or library to support the exercise can be chosen but has to be understood by every group member 
  * Storing data in the browser with, e.g., taffyDB possible Backend code, e.g., via Node.js or PHP and a (local) Web server is not mandatory Object with interaction capability
  * Section to test the subject that leads to a test result
  * Section with stored high scores of previous test results
## Mandatory
* Design and implement the educational Web app
* Appropriate UI that is appealing for the target group
* Usage of JavaScript for actions and events
* Readme that sums up the features and roughly explains the code structure (Markdown recommended as describing markup language
## Optional
* Responsive design: might adapt to Laptop browser as well as mobile phone screen; use, e.g., the Chrome tools (Command+Shift+M (Mac) or Ctrl+Shift+M (Windows, Linux)
* Any framework or library to support the exercise can be chosen but has to be understood by every group member
* Storing data in the browser with, e.g., taffyDB possible
* Backend code, e.g., via Node.js or PHP and a (local) Web server is not mandatory
## Grading
* Max 200 points per group of 4 possible, with 50 points max per member
* Major: Proper usage of mentioned technologies important Major: Balancing of invested time budget for (1) technology showcase versus (2) UI design crucial
* Minor: developing a ”real” education framework


