"use strict";
var Endabgabe2;
(function (Endabgabe2) {
    // Martin Fuhr
    // Matrikelnummer: 266629
    // MKB-2 
    window.addEventListener("load", handleload);
    let canvas; //export weg
    Endabgabe2.scale = 5;
    let div;
    let canvasDiv;
    let workHalf = 0.6;
    let workSpace;
    let divHTML;
    let divPlayer;
    divPlayer = document.createElement("div");
    let divProgress = document.createElement("div");
    let formNumbers = [];
    let mood = [":)", ":|", ":(", "N N"];
    let moodColor = ["green", "yellow", "red", "blue"];
    let food = ["Yufka", "Döner", "Lahmacun"];
    let extraWishes = ["", "ohne Zwiebeln", "extra scharf", "ohne Tomaten"];
    let ingredients = ["Tomate", "Salat", "Zwiebeln"];
    let ingredColor = ["red", "green", "rosybrown"];
    let ingredientsRow2 = ["Fleisch", "Soße", "Kraut"];
    let ingredColor2 = ["brown", "darkgrey", "yellow"];
    let movables = [];
    let storageBoxes = [];
    let cutBoxes = [];
    let buyBoxes = [];
    let tableBoxes = [];
    let allBoxes = [];
    let dough = [];
    let boxes;
    let createDoener = [];
    let circle = [];
    let creationBox = [];
    let costumerArray = [];
    let workerArray = [];
    let posCostumer;
    let happyCostumer;
    let field;
    let allCostumer;
    let workWorker;
    let draggedPlayer;
    let mousePos;
    let listenToMouseMove = false;
    let animation = false;
    let getOrderText = false;
    let doenerBoolean = false;
    let doenerReady;
    doenerReady = document.createElement("div");
    let butt = document.createElement("button");
    butt.addEventListener("click", giveDoener);
    let foodAmount;
    foodAmount = document.createElement("div");
    let numberOfFood = 0;
    let startTime = false;
    let walkitalki = false;
    let num = 0;
    let counter = [];
    let newHappy = 0;
    let oldHappy = 100;
    let i = 0;
    //get current mouse position relative to canvas
    //https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas 
    function getMousePos(_ev) {
        let rect = canvas.getBoundingClientRect();
        return new Endabgabe2.Vector((_ev.clientX - rect.left) / (rect.right - rect.left) * canvas.width, (_ev.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);
    }
    function handleload(_event) {
        let start = document.querySelector("button");
        start.addEventListener("click", getFormData);
    }
    function getFormData(_event) {
        let formData = new FormData(document.forms[0]);
        div = document.querySelector(".form");
        div.innerHTML = "";
        div.classList.add("visible");
        canvasDiv = document.querySelector(".canvasDiv");
        canvasDiv.classList.remove("visible");
        let worker;
        let costumer;
        let moodMin;
        let capacityBox;
        let buyingProducts;
        worker = Number(formData.get("Number"));
        costumer = Number(formData.get("Number1"));
        moodMin = Number(formData.get("Slider"));
        capacityBox = Number(formData.get("Slider3"));
        buyingProducts = Number(formData.get("Text"));
        formNumbers.push(worker, costumer, moodMin, capacityBox, buyingProducts);
        handleLoad2();
        //Damit die grauen Felder auch die größe haben
        field.capacity = formNumbers[3];
    }
    function handleLoad2() {
        canvas = document.getElementsByTagName("canvas")[0];
        Endabgabe2.crc2 = canvas.getContext("2d"); // ! damit nicht null ist
        field = new Endabgabe2.RestaurantField();
        // set canvas dimensions handled by scene
        canvas.width = field.width + (2 * field.padding) + 600;
        canvas.height = field.height + (2 * field.padding);
        workSpace = Endabgabe2.crc2.canvas.height * workHalf;
        // später wenn happiness und verkauftes essen gezeigtwerden soll updateScore();
        canvas.addEventListener("mousedown", getPlayer); // Checken ob shootBall, getPlayer oder showplayerInformation passieren soll
        canvas.addEventListener("mousemove", dragPlayer);
        canvas.addEventListener("mousemove", currentMousePosWorker);
        canvas.addEventListener("mousemove", currentMousePosBox);
        canvas.addEventListener("mouseup", fill);
        canvas.addEventListener("mousedown", fillCut);
        createGame();
        window.requestAnimationFrame(update);
    }
    function isMouseInShape(mx, my, shape) {
        if (shape.boxwidth) {
            // this is a rectangle
            var rLeft = shape.position.x;
            var rRight = shape.position.x + shape.boxwidth;
            var rTop = shape.position.y;
            var rBott = shape.position.y + shape.boxheight;
            // math test to see if mouse is inside rectangle
            if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
                //wenn ja dann gibt es true zurück
                return (true);
            }
        }
        // the mouse isn't in any of the shapes -> false
        return (false);
    }
    //https://learntutorials.net/de/html5-canvas/topic/5318/ziehen-von-pfadformen-und-bildern-auf-leinwand
    function fill(_event) {
        mousePos = getMousePos(_event);
        //Wenn ein Worker gedragged ist
        if (draggedPlayer) {
            //für alle buyBoxes
            for (let box of buyBoxes) {
                if (box instanceof Endabgabe2.Box) {
                    //Wenn Worker befindet sich in der Box:
                    if (isMouseInShape(draggedPlayer.position.x, draggedPlayer.position.y, box)) {
                        //radius wird kleiner
                        draggedPlayer.radius = 20;
                        //er bewegt sich nicht, läuft also nicht random weiter, kann aber vom User wieder mit shift und Maus verschoben werden
                        draggedPlayer.walkAnimation = false;
                        //für alle storage boxen:
                        for (let storagebox of storageBoxes) {
                            if (storagebox instanceof Endabgabe2.Box) {
                                //Wenn der spieler sich in buy boxes auf Tomate befindet, dann wird hier box mit Name Tomate angesprochen
                                if (storagebox.name == box.name) {
                                    //Balken erscheint, wann der Prozess beendet ist.
                                    divHTML = document.getElementById("waitingTime");
                                    divPlayer.classList.add("progress");
                                    divProgress.classList.add("color");
                                    divHTML.append(divPlayer);
                                    divPlayer.appendChild(divProgress);
                                    //wenn Balken nicht voll ist (Zeichen !=) also 100% erreicht hat
                                    if (divPlayer.getAttribute("animation") != 100 + "%") {
                                        //die Dauer des füllens des Balkens beträgt 5ms, deswegen wird die Zeit für 5ms gestoppt mit setTimeout
                                        //und dann der Balken entfernt (anders ging es nicht)
                                        setTimeout(function () {
                                            divPlayer.removeChild(divProgress);
                                            divHTML.removeChild(divPlayer);
                                            //Jetzt wird geschaut, um wie viel es sich füllt. Generell umd die ANzahl die der User in Form angibt,
                                            //aber wenn die Box die geleert wird nicht mehr so viel drinnen hat, kann nicht die gesamte Anzahl 
                                            //entfernt werden
                                            //Wenn also der Füllstand von Stoagebox kleiner als die (Kapazität - 10) ist wird der gesamte Betrag vom
                                            //Formelement hinzugefügt
                                            if (storagebox.fillLevel < storagebox.capacity - 10) {
                                                storagebox.fillLevel += formNumbers[4];
                                                storagebox.draw();
                                            }
                                            //Ist der Füllstand größer als die Kapazität wird der Füllstand von der Kapazität abgezogen und die differenz
                                            // für storagebox als Füllmenge hinzugefügt
                                            else {
                                                let difference = storagebox.capacity - storagebox.fillLevel;
                                                storagebox.fillLevel += difference;
                                                box.draw();
                                            }
                                        }, 5000);
                                    }
                                }
                            }
                        }
                        //setzt glaube ich alles zurück, sozusagen für das nächste mal
                        return;
                    }
                    //ist Maus nicht mehr in einer Box, dann läuft der Worker wieder rum und erhält seinen ursprungsradius
                    else {
                        draggedPlayer.radius = 30;
                        draggedPlayer.walkAnimation = true;
                    }
                }
            }
        }
        if (draggedPlayer) {
            let player = draggedPlayer;
            for (let box of cutBoxes) {
                if (box instanceof Endabgabe2.Box) {
                    if (isMouseInShape(draggedPlayer.position.x, draggedPlayer.position.y, box)) {
                        draggedPlayer.walkAnimation = false;
                        divHTML = document.getElementById("waitingTime");
                        divPlayer.classList.add("progress");
                        divProgress.classList.add("color");
                        divHTML.append(divPlayer);
                        divPlayer.appendChild(divProgress);
                        if (divPlayer.getAttribute("animation") != 100 + "%") {
                            setTimeout(function () {
                                divPlayer.removeChild(divProgress);
                                divHTML.removeChild(divPlayer);
                                if (box.fillLevel < box.capacity - 10) {
                                    player.radius = 20;
                                    box.fillLevel += formNumbers[4];
                                    box.draw();
                                    //bis hier hin alles gleich. Jetzt wollen wir aber noch, dass der Füllstand bei Storage entfernt wird
                                    //dafür geht es in die Funktion updateFillLevel. Damit wir auch nur die eine Box und die andere Box ansprechen
                                    // werden diese der Funktion mitgegeben
                                    for (let storagebox of storageBoxes) {
                                        if (storagebox instanceof Endabgabe2.Box) {
                                            updateFillLevel(box, storagebox);
                                        }
                                    }
                                }
                                else {
                                    let difference = box.capacity - box.fillLevel;
                                    box.fillLevel += difference;
                                    box.draw();
                                }
                            }, 5000);
                        }
                        return;
                    }
                    else {
                        draggedPlayer.radius = 30;
                        draggedPlayer.walkAnimation = true;
                    }
                }
            }
        }
        if (draggedPlayer) {
            let player = draggedPlayer;
            for (let box of buyBoxes) {
                if (box instanceof Endabgabe2.Box) {
                    if (isMouseInShape(draggedPlayer.position.x, draggedPlayer.position.y, box)) {
                        draggedPlayer.walkAnimation = false;
                        divHTML = document.getElementById("waitingTime");
                        divPlayer.classList.add("progress");
                        divProgress.classList.add("color");
                        divHTML.append(divPlayer);
                        divPlayer.appendChild(divProgress);
                        console.log((divPlayer.getAttribute("animation") != 100 + "%"));
                        if (divPlayer.getAttribute("animation") != 100 + "%") {
                            setTimeout(function () {
                                divPlayer.removeChild(divProgress);
                                divHTML.removeChild(divPlayer);
                                if (box.fillLevel < box.capacity - 10) {
                                    player.radius = 20;
                                    box.fillLevel += formNumbers[4];
                                    box.draw();
                                    for (let storagebox of storageBoxes) {
                                        if (storagebox instanceof Endabgabe2.Box) {
                                            updateFillLevel(box, storagebox);
                                        }
                                    }
                                }
                                else {
                                    let difference = box.capacity - box.fillLevel;
                                    box.fillLevel += difference;
                                    box.draw();
                                }
                            }, 5000);
                        }
                        return;
                    }
                    else {
                        draggedPlayer.radius = 30;
                        draggedPlayer.walkAnimation = true;
                    }
                }
            }
            if (draggedPlayer) {
                let player = draggedPlayer;
                for (let box of tableBoxes) {
                    if (box instanceof Endabgabe2.Box) {
                        if (isMouseInShape(draggedPlayer.position.x, draggedPlayer.position.y, box)) {
                            draggedPlayer.walkAnimation = false;
                            divHTML = document.getElementById("waitingTime");
                            divPlayer.classList.add("progress");
                            divProgress.classList.add("color");
                            divHTML.append(divPlayer);
                            divPlayer.appendChild(divProgress);
                            console.log((divPlayer.getAttribute("animation") != 100 + "%"));
                            if (divPlayer.getAttribute("animation") != 100 + "%") {
                                setTimeout(function () {
                                    divPlayer.removeChild(divProgress);
                                    divHTML.removeChild(divPlayer);
                                    if (box.otherfullLevel < box.capacity - 10) {
                                        player.radius = 20;
                                        box.otherfullLevel += formNumbers[4];
                                        box.paint();
                                        for (let cutbox of cutBoxes) {
                                            if (cutbox instanceof Endabgabe2.Box) {
                                                updateFillLevel(box, cutbox);
                                            }
                                        }
                                    }
                                    else {
                                        let difference = box.capacity - box.otherfullLevel;
                                        box.otherfullLevel += difference;
                                        box.paint();
                                    }
                                }, 5000);
                            }
                            return;
                        }
                        else {
                            draggedPlayer.radius = 30;
                            draggedPlayer.walkAnimation = true;
                        }
                    }
                }
            }
            for (let movable of circle) {
                if (movable instanceof Endabgabe2.Box) {
                    if (draggedPlayer) {
                        //befindet sich der gedraggde Worker im Kreis
                        if (distance(draggedPlayer.position, movable.position) - movable.radius <= 0) {
                            //bewegt er sich nicht mehr
                            draggedPlayer.walkAnimation = false;
                            // save Startposition von dem Spieler der ausgetauscht werden soll 
                            draggedPlayer.position = movable.position;
                            draggedPlayer.origin = movable.position;
                            //befindet sich der Worker im oberen Kreis
                            if (draggedPlayer.origin == movable.position && movable.name == "2") {
                                //wird OrderText true und somit er scheint die Bestellung des Kunden
                                getOrderText = true;
                            }
                            //befindet sich der Spieler im unteren Kreis
                            else {
                                //Wird animation true und der User kann den Döner zubereiten
                                animation = true;
                                //Kunden Bestellung erscheint nicht mehr
                                getOrderText = false;
                                //Wenn Döner zubereitet werden kann entsteht ein Button zum abgeben des Döners
                                doenerReady = document.getElementById("doenerToEat");
                                butt.classList.add("butt");
                                butt.innerHTML = "Bitte Chef";
                                doenerReady.appendChild(butt);
                            }
                        }
                    }
                }
            }
            //draggedPlayer zurücksetzten -> kein Spieler in Box
            draggedPlayer = null;
        }
    }
    function giveDoener() {
        for (let creation of creationBox) {
            if (creation instanceof Endabgabe2.Box) {
                //Dönerfläche wird weiß
                //Button verschwindet
                //doenerBoolean = true, damit erscheint dieser braune Punkt am Kunden, als Zeichen, dass er sein Döner bekommen hat
                creation.color = "white";
                creation.create();
                doenerReady.removeChild(butt);
                doenerBoolean = true;
                // walken = true;
                //die Anzeige an verkauften Produkten steigt an
                numberOfFood++;
                foodAmount = document.getElementById("foodNumber");
                foodAmount.innerHTML = "Food: " + numberOfFood;
            }
        }
    }
    //Füllstand von TableBoxen regeln
    function fillCut(_event) {
        mousePos = getMousePos(_event);
        if (animation == true) {
            for (let box of tableBoxes) {
                if (box instanceof Endabgabe2.Box) { //nochmal probieren und field color ändern zu storage color
                    //bei Mausklick wird geschaut, ob Maus in einer Box ist, wenn ja dann weiter
                    if (box.isClicked(mousePos.x, mousePos.y, box)) {
                        //gleich wie vorhin: Überprüfung des Füllstandes und füllen je nach Füllstand
                        if (box.otherfullLevel > 10) {
                            box.otherfullLevel -= formNumbers[4];
                            box.paint();
                            for (let creation of creationBox) {
                                if (creation instanceof Endabgabe2.Box) {
                                    //je nach dem auf welche Box gedrückt wird, wird die Farbe auf die Zubereitungsbox übertragen
                                    creation.color = box.color;
                                    creation.create();
                                }
                            }
                        }
                        else {
                            //Differenz des Füllstandes berechnen
                            let difference = 10 - box.otherfullLevel;
                            box.otherfullLevel -= difference;
                            box.paint();
                        }
                        return;
                    }
                }
            }
        }
        //dasselbe für das Brot, nur Brot Box ändert nicht den Füllstand, deswegen fällt das weg
        if (animation == true) {
            for (let box of dough) {
                // let draggedPlayerStartposition: CoWorker | null = draggedPlayer;
                if (box instanceof Endabgabe2.Box) { //nochmal probieren und field color ändern zu storage color
                    if (box.isClicked(mousePos.x, mousePos.y, box)) {
                        // draggedPlayer.radius = 20;
                        for (let creation of creationBox) {
                            if (creation instanceof Endabgabe2.Box) {
                                creation.color = box.color;
                                creation.create();
                            }
                        }
                        return;
                    }
                }
            }
        }
        animation = false;
    }
    function updateFillLevel(_box, _otherbox) {
        //haben die beiden Boxen denselben Namen also Tomate
        if (_box.name == _otherbox.name)
            //box = cutbox und otherbox = storagebox
            //StorageBox sein füllLevel ist größer als 10
            if (_otherbox.fillLevel > 10) {
                //dann wird der Komplette FormStand abgezogen
                _otherbox.fillLevel -= formNumbers[4];
                _otherbox.draw();
            }
            //Ist füllstand kleiner als 10 wird die komplette Füllmenge abgeozogen
            else {
                let difference = 0 + _otherbox.fillLevel;
                _otherbox.fillLevel -= difference;
            }
    }
    //Mausposition wird ständig gelesen bei mousemove
    function currentMousePosWorker(_e) {
        // catch mousemove events to get current mouse position
        mousePos = getMousePos(_e);
        for (let movable of movables) {
            if (movable instanceof Endabgabe2.Worker) {
                movable.highlighted = false;
                //hovert die Maus über ein Worker, wird der größer
                if (distance(mousePos, movable.position) - movable.radius <= 0) {
                    movable.highlighted = true;
                }
                //sonst wieder kleiner, sprich Zeile 601
            }
        }
    }
    //dasselbe hier nur wenn die Maus über einer Box hovert, dann wird die Schriftgröße der Boxnamen größer
    function currentMousePosBox(_e) {
        // catch mousemove events to get current mouse position
        mousePos = getMousePos(_e);
        for (let movable of allBoxes) {
            if (movable instanceof Endabgabe2.Box) {
                if (isMouseInShape(mousePos.x, mousePos.y, movable)) {
                    // the mouse is inside this shape
                    // select this shape
                    movable.highlighted = true;
                    // and return (==stop looking for 
                    //     further shapes under the mouse)
                    return;
                }
                else {
                    movable.highlighted = false;
                }
            }
        }
    }
    function getPlayer(_event) {
        mousePos = getMousePos(_event);
        let playerClicked = getPlayerClick(mousePos);
        for (let movable of movables) {
            if (movable instanceof Endabgabe2.Worker) {
                if (distance(mousePos, movable.position) - movable.radius <= 0) { //Maus befindet sich in Worker
                    if (_event.shiftKey) { //soll erst hören wenn shiftkey gedrückt wird
                        listenToMouseMove = true; //Worker hört auf Mausbewegung, wenn boolean = true
                        draggedPlayer = playerClicked; // Zuweisung
                        movable.walkAnimation = false; //Worker läuft nicht mehr rum
                    }
                }
            }
        }
    }
    function dragPlayer(_event) {
        // Get mouse position all the time while mouse is moving
        if (_event.shiftKey && listenToMouseMove == true) {
            let mousePosition = new Endabgabe2.Vector(_event.offsetX, _event.offsetY);
            // Set position of draggedPlayer to mouseposition
            if (draggedPlayer) {
                draggedPlayer.walkAnimation = false;
                draggedPlayer.position = mousePosition;
                draggedPlayer.radius = 20;
            }
        }
    }
    //Überprüft ob etwas geklickt wurde ----> muss in der jeweiligen Klasse angegeben werden -> Worker
    function getPlayerClick(_clickPosition) {
        for (let player of movables) {
            if (player instanceof Endabgabe2.Worker) {
                //isClicked kann nur _clickPosition entgegen nehmen wenn bboolean = true ist
                if (player.isClicked(_clickPosition) && player != draggedPlayer) { // Wenn die Person unter der Maus nicht der gedraggte Spieler ist
                    return player;
                }
            }
        }
        return null; // Rückgabewert null, wenn kein Spieler unter der Mausposition ist
    }
    function createGame() {
        movables = [];
        createWorker();
        //einer gleich zu beginn
        createCostumer();
        //create Kunden je nachdem welche Anzahl pro Zeit gewählt wurden
        // Zeit gleich 1 min, deswegen 2 alle 30s,...
        createBoxes();
        if (formNumbers[1] == 1) {
            setInterval(createCostumer, 60000);
        }
        else if (formNumbers[1] == 2) {
            setInterval(createCostumer, 30000);
        }
        else if (formNumbers[1] == 3) {
            setInterval(createCostumer, 20000);
        }
        else if (formNumbers[1] == 4) {
            setInterval(createCostumer, 15000);
        }
        else if (formNumbers[1] == 5) {
            setInterval(createCostumer, 12000);
        }
    }
    function createBoxes() {
        let i = 1;
        //Brotbox
        boxes = new Endabgabe2.Box(field.padding + (field.width * 2 - 326), field.padding + 146, "Brot", "orange", formNumbers[3], formNumbers[3]);
        dough.push(boxes);
        allBoxes.push(boxes);
        //Weiße große Fläche auf dem Tisch
        boxes = new Endabgabe2.Box(field.padding + (field.width * 2 - 326), field.padding + 250, "", "white", formNumbers[3], 70, 100);
        createDoener.push(boxes);
        //kleine weiße Fläche auf der großen Weißen, die mit den Farben gefüllt wird
        boxes = new Endabgabe2.Box(field.padding + (field.width * 2 - 320), field.padding + 255, "", "white", formNumbers[3], 60, 90);
        creationBox.push(boxes);
        //StorageBox links
        for (let x = 0; x < 3; x++) {
            boxes = new Endabgabe2.Box(40, 30 + (5 * x) + i, ingredients[x], ingredColor[x], formNumbers[3]);
            //Position um 45 nach unten verschoben
            i += 45;
            storageBoxes.push(boxes);
            allBoxes.push(boxes);
        } // Storagebox rechts
        for (let x = 0; x < 3; x++) {
            boxes = new Endabgabe2.Box(140, -105 + (5 * x) + i, ingredientsRow2[x], ingredColor2[x], formNumbers[3]);
            i += 45;
            storageBoxes.push(boxes);
            allBoxes.push(boxes);
        }
        for (let x = 0; x < 3; x++) {
            boxes = new Endabgabe2.Box(40, -90 + (5 * x) + i, ingredients[x], ingredColor[x], formNumbers[3]);
            i += 45;
            cutBoxes.push(boxes);
            allBoxes.push(boxes);
        }
        for (let x = 0; x < 3; x++) {
            boxes = new Endabgabe2.Box(140, -225 + (5 * x) + i, ingredientsRow2[x], ingredColor2[x], formNumbers[3]);
            i += 45;
            cutBoxes.push(boxes);
            allBoxes.push(boxes);
        }
        for (let x = 0; x < 3; x++) {
            boxes = new Endabgabe2.Box(40, -210 + (5 * x) + i, ingredients[x], "grey", formNumbers[3]);
            i += 45;
            buyBoxes.push(boxes);
            allBoxes.push(boxes);
        }
        for (let x = 0; x < 3; x++) {
            boxes = new Endabgabe2.Box(140, -345 + (5 * x) + i, ingredientsRow2[x], "grey", formNumbers[3]);
            i += 45;
            buyBoxes.push(boxes);
            allBoxes.push(boxes);
        }
        for (let x = 0; x < 3; x++) {
            boxes = new Endabgabe2.Box(580, -640 + (5 * x) + i, ingredients[x], ingredColor[x], formNumbers[3], formNumbers[3]);
            i += 45;
            tableBoxes.push(boxes);
            allBoxes.push(boxes);
        }
        for (let x = 0; x < 3; x++) {
            boxes = new Endabgabe2.Box(580, -625 + (5 * x) + i, ingredientsRow2[x], ingredColor2[x], formNumbers[3], formNumbers[3]);
            i += 45;
            tableBoxes.push(boxes);
            allBoxes.push(boxes);
        }
        //create circle for creatingDoener
        boxes = new Endabgabe2.Box(420, workSpace + 20, "1", "white", formNumbers[3]);
        circle.push(boxes);
        //Circle für Bestellungaufnehmen
        boxes = new Endabgabe2.Box(420, 90, "2", "white", formNumbers[3]);
        circle.push(boxes);
    }
    function createWorker() {
        for (let j = 0; j < formNumbers[0]; j++) {
            workWorker = new Endabgabe2.Worker(mood[0], moodColor[0], new Endabgabe2.Vector(300, (200 + i)));
            i += 20;
            workWorker.walkAnimation = true;
            movables.push(workWorker);
            workerArray.push(workWorker);
            counter.push(workWorker);
            happyUnhappy();
        }
    }
    //alle werden erstellt, aber unten erst nach random zum laufen gebracht
    function createCostumer() {
        allCostumer = new Endabgabe2.Costumer(mood[0], moodColor[0], food[Math.floor(Math.random() * food.length)], extraWishes[Math.floor(Math.random() * extraWishes.length)], new Endabgabe2.Vector(field.padding + field.width + 610, (field.padding + (field.height / 2))), 0);
        allCostumer.walkAnimation = true;
        allCostumer.walkAnimationOthers = false;
        num += 15;
        movables.push(allCostumer);
        costumerArray.push(allCostumer);
        posCostumer = new Endabgabe2.Vector(720, 100);
        counter.push(allCostumer);
        happyUnhappy();
    }
    function happyUnhappy() {
        console.log(counter.length);
        console.log(movables.length);
        if (counter.length < movables.length) {
            newHappy = oldHappy - ((movables.length - counter.length) * 10);
        }
        if (counter.length == movables.length) {
            newHappy = oldHappy;
        }
        happyCostumer = document.querySelector(".chart");
        happyCostumer.setAttribute("style", "width: " + newHappy + "%");
    }
    function update() {
        field.draw();
        for (let box of storageBoxes) {
            box.draw();
        }
        for (let box of cutBoxes) {
            box.draw();
        }
        for (let box of buyBoxes) {
            box.draw();
        }
        for (let box of dough) {
            box.paint();
        }
        for (let box of tableBoxes) {
            box.paint();
        }
        for (let box of createDoener) {
            box.create();
        }
        for (let circlePlace of circle) {
            circlePlace.createCircle();
        }
        for (let box of creationBox) {
            box.create();
        }
        for (let moveable of movables) {
            if (moveable instanceof Endabgabe2.Worker) {
                //Wenn walkAnimation = true, darf er laufen
                if (moveable.walkAnimation == true && walkitalki == false) {
                    moveable.move();
                }
                // Wenn Empfindlichkeit > 5 dann soll das alles passieren, sonst ist er immer happy
                if (formNumbers[2] > 5) {
                    //Veränderung der Stimmung, je nach Kundenanzahl im Laden
                    if (costumerArray.length >= 3 && costumerArray.length <= 4) {
                        moveable.mood = mood[1];
                        moveable.moodColor = moodColor[1];
                    }
                    //Wenn keine Kunden im Laden sind, schläft er nach 10s ein
                    else if (costumerArray.length == 0 && moveable.walkAnimation == true) {
                        setTimeout(function () {
                            moveable.mood = mood[3];
                            moveable.moodColor = moodColor[3];
                        }, 12000);
                    }
                    else if (costumerArray.length > 4) {
                        moveable.mood = mood[2];
                        moveable.moodColor = moodColor[2];
                        // moveable.happy = false;
                    }
                    else if (costumerArray.length > 0) {
                        moveable.mood = mood[0];
                        moveable.moodColor = moodColor[0];
                    }
                    let p = moveable;
                    if (p.moodColor === moodColor[2]) {
                        counter = counter.filter(item => item.moodColor !== moodColor[2]);
                        happyUnhappy();
                    }
                }
                moveable.draw();
            }
            else if (moveable instanceof Endabgabe2.Costumer) {
                let oldPos = posCostumer;
                if (moveable.walkAnimation == true) {
                    moveable.walk(oldPos);
                    startTime = true;
                    moveable.walkAnimationOthers = true;
                }
                if (moveable.position != costumerArray[0].position && moveable.walkAnimationOthers == true) {
                    let newPos = new Endabgabe2.Vector(720 + num, 100 + num);
                    moveable.walkAnimation = false;
                    moveable.walk(newPos);
                }
                //ist Kunde an der Position Kasse, wird die Individuelle Zeit gestartet, wie lamnge der Kunde im Laden ist
                if (moveable.position <= new Endabgabe2.Vector(720, 100) && startTime == true) {
                    setInterval(function () {
                        moveable.time += 1;
                    }, 1000);
                    //je nachdem wie lange er im Laden ist, verändert sich seine Stimmung
                    if (moveable.time > 20000 && moveable.time < 50000) {
                        moveable.mood = mood[1];
                        moveable.moodColor = moodColor[1];
                    }
                    if (moveable.time > 50000) {
                        moveable.mood = mood[2];
                        moveable.moodColor = moodColor[2];
                    }
                }
                let p = moveable;
                if (p.moodColor === moodColor[2]) {
                    counter = counter.filter(item => item.moodColor !== moodColor[2]);
                    happyUnhappy();
                }
                //wenn das true, dann erscheint der bestelltext und der kunde läuft zur nächsten Position
                if (getOrderText == true) {
                    let wishFood = "Einen " + moveable.foodCostumer + " " + moveable.extraWishesCostumer + " bitte.";
                    Endabgabe2.crc2.beginPath();
                    Endabgabe2.crc2.fillStyle = "yellow";
                    Endabgabe2.crc2.fillRect(700, 20, 350, 70);
                    Endabgabe2.crc2.fillStyle = "black";
                    Endabgabe2.crc2.font = "20px Arial";
                    Endabgabe2.crc2.fillText(wishFood.toString(), 710, 50);
                    Endabgabe2.crc2.restore();
                    setTimeout(function () {
                        costumerArray[0].walkAnimation = false;
                        moveable.walkAnimationOthers = false;
                        let newNew = new Endabgabe2.Vector(720, 350);
                        // posCostumer = new Vector(720, 300);
                        costumerArray[0].walk(newNew);
                        if (costumerArray.length > 1) {
                            costumerArray[1].walk(oldPos);
                        }
                    }, 2000);
                }
                if (doenerBoolean == true) {
                    //wenn true erscheint der Punkt am Kunen, als Zeichen er hat seinen dömer und er läuft raus
                    Endabgabe2.crc2.beginPath();
                    Endabgabe2.crc2.arc(costumerArray[0].position.x + 30, costumerArray[0].position.y + 30, 10, 0, 2 * Math.PI);
                    Endabgabe2.crc2.fillStyle = "brown";
                    Endabgabe2.crc2.fill();
                    Endabgabe2.crc2.restore();
                    startTime = false;
                    let newNeu = new Endabgabe2.Vector(1040, 255);
                    costumerArray[0].walk(newNeu);
                }
                //befindet er sich an der Position, wird er aus dem moveable Array und dem costumer Array entfernt und döenerBooelan = false
                if (moveable.position.x > 1036) {
                    movables.splice(movables.indexOf(moveable), 1);
                    costumerArray.shift();
                    doenerBoolean = false;
                    num -= 15;
                    if (moveable.moodColor == moodColor[0] || moveable.moodColor == moodColor[1]) {
                        counter.splice(counter.indexOf(moveable), 1);
                        happyUnhappy();
                    }
                }
            }
            moveable.draw();
            // happyUnhappy();
        }
        window.requestAnimationFrame(update);
    }
    //gets distance between two vectors
    //https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
    function distance(_v1, _v2) {
        let d = Math.sqrt(Math.pow(_v2.x - _v1.x, 2) + Math.pow(_v2.y - _v1.y, 2));
        return d;
    }
})(Endabgabe2 || (Endabgabe2 = {}));
//# sourceMappingURL=main.js.map