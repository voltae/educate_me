# educate_me
# Allgemein
Educational Web app for children aged 7-10
## Topic 
Basic Science

## Design Details
### Teach
Frage erscheint im Fragefeld. User hat die Möglichkeit mittels Antwort Button die richtige Anwort einzusehen.
_Wie kommt User zur nächste Frage Button oder Time out?_
### Practice
Frage wird angezeigt, User hat Auswahl der Antworten anch Mulitple Choice Prinzip aus 4 Möglichkeiten. Immer nur 1 richtig.
**ProgessBar**
### Test
8 Fragen random ausgewählt. UI wie Practice aber mit mitprotokollieren der Anzahl der richtigen und falschen Antworten.
ab 50% positiv -> Highscore wird automatisch erstellt, Smiley angezeigt; unter 50% -> Wiederholung nach einem Timer (bsp 30 sec; check ob Timer trotz refresh bestehen bleibt) möglich; sadface wird angezeigt. Es wird kein Highscore gespeichert.
# Technische Implementierung
Die App ist als Server - Client App ausgeführt. Der Client sendet einen AJAX-Request an den Server und erhält als AJAX-Response einen JSON String mit der Frage und den möglichen Antworten. Das Protokoll ist [hier](#protocol) beschrieben. Der Client übernimmt die gesamte App-logik:
* Lernen 
* Üben
* Test
* Highscore

## Server
Verwendung von serverseitigen _PHP_ um Client Fragen zu schicken. Dabei wird für denen Request immer **ein Fragen-JSON** gesendet. Der Server hat alle Fragen in einem Objektarray geschrieben und ist so ausgeführt, daß das Array jederzeit erweitert werden kann. So wäre es z.B. möglich das Array von der Festplatte einzulesen.
### Protokoll
Server ist als **stateful Server** ausgeführt, d.h. er führt Buch, welche Fragen dem Clienten bereits geschickt wurden. aus den verbleibenden sucht Server jeweils zufällig eine Frage aus und schickt diese nach jedem Ajax-Request an Client. Falls alle Fragen durch (Zyklus beendet) schickt Server eine quest mit **index -1** um Ende zu signalisieren.
Nächster Request ist dann bereits Beginn eines neuen Fragenzyklus.
Übertragen wird mittels **JSON Decoding** Client encodiert JSON und hat dann alle Informationen, grundlegend für Protokoll ist Objektdefinition. Beispiel einer überrtagenen JSON Quest:
```{"question":"Das wieviel-fache ihres K\u00f6rpergewichtes k\u00f6nnen Ameisen tragen?","answer":"30fach","index":13,"alternatives":["2fach","10fach","140fach"]}```

### <a id="protocol"></a>Objekt Prototyp ###
#### declaration
```class Question
{
  public $question;  
  public $answer;
  public $index;
  public $alternatives = [];  // alternative answers array
}
```
#### Server states
Der Server kennt 2 Zustände, **not-random** und **random**. Im Falle not-random schickt der Server die Fragen in sequentieller Ordnung, im Zustand random hingegen werden die Fragen zufallsmäßig gemischt. Der Server schickt hinterenander alle gespeicherten Fragen, falls dieser Block zuende ist sendet der Server `index = -1` an den Client um zu signalisieren, hier endet ein Zyklus. Dann beginnt der Server wieder mit neuen Zyklus.
Der Server unterscheidet ob er im *exam* Modus ist, oder im *Übungsmodus*. Im exam Modus sendet er nur eine bestimmte Anzahl an Fragen, die er vom Client via post-request bekommt. 
## Client
Client ist in Html, CSS und Javascript ausgeführt. Als Responsive Framework wurde ![Bootstrap 4](https://getbootstrap.com) verwendet
### Request
Mittels AJAX nach jedem Click auf Frage eine asynchronen Request an Server. Der Client teilt den Server den gewünschten Zustand mit (ranodm, not-random) und erhält für jeden Request eine Frage als Respond.
### Respond
* Parsen des JSON Resond, aufteilen der Nachricht auf Buttons, Fragemodus ist multiple choice mit jeweils **einer richtigen Antwort** 
### Modi
#### lernen
In diesem Modus bekommt die Schüler die einzelne Frage, und hat Zeit sich eine Antwort zu überlegen. Mit clicken auf den Antwort-Button erscheint dann nur die richitge Antwort, damit kann der Schüler sein Wissen mit der richtigen Antwort vergleichen, oder lernen indem einfach auf Antwort gedrückt wird.
#### üben
Der Modus lehnt sich bereits an den Test Modus an, der Schüler bekommt alle 4 Möglichkeiten zur Auswahl, hat aber beliebig viele Versuche pro Frage. Es wird ein schriftliches Feedback ausgegeben, aber die Anzahl der richtigen und falschen eingaben werden nicht mitprotokolliert. Fragen werdn sequentiell, nichtzufällig gestellt.
#### test
In dem Modus kann der Schüler sein Wissen unter Beweis stellen uns sich mit seinen Kollegen vergleichen. Er bekommt pro  Versuch eine neue Frage, unabhängig ob sie richtig oder falsch beantwortet worden ist. Die Anzahl der richtigen Antworten wird mitprotokolliert. Der Schüler kann den Test nicht von beenden und wieder beginnen, sondern nur entweder vollständign ausführen oder abbrechen. Fragen werden dem Schüler nach Zufallsprinzip gestellt, es gibt keine zeitliche Einschränkung. Der Schüler bekommt **nicht alle** Fragen gestellt, sondern eine zuäälige Auswahl davon. Die Anzahl ist z.Z als globale Konstante definiert.
#### Highscore
Jeder Test wird bewertet und zwar prozentuell richtige Antworten an Gesamtfragen. Die besten 10 dürfen sich in eine Highscore Liste eintragen. Diese ist client-seitig gespeichert im Browser localStorage.
