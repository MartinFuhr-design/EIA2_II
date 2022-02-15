"use strict";
var Endabgabe2;
(function (Endabgabe2) {
    class Moveable {
        //https://ulli.mingram.net/JS_Kurs_10oop.html
        //auch gut: http://digitalewelt.blaustern.bplaced.net/?p=465
        constructor(_position) {
            this.time = 0;
            this.walkAnimation = false;
            this.walkAnimationOthers = false;
            this.direction = [];
            this.richtung = [1, -1];
            this.radius = 6 * Endabgabe2.scale;
            this.position = _position;
            this.speedx = 0.7 * Endabgabe2.scale;
            this.richtungx = (Math.floor(Math.random() * 2) + 3) * this.richtung[Math.floor(Math.random() * 2)];
            this.richtungy = (Math.floor(Math.random() * 2) + 2) * this.richtung[Math.floor(Math.random() * 2)];
            this.direction.push(this.richtungx, this.richtungy);
        }
        move() {
            let diffVector = Endabgabe2.Vector.getDifference(new Endabgabe2.Vector(this.richtungx, this.richtungy), this.position); // target neue position und this.position position vom
            let vectorLength = Math.round(Math.sqrt(Math.pow(diffVector.x, 2) + Math.pow(diffVector.y, 2))); // Vektor länge 
            if (vectorLength === 0) { // wenn 0 dann ist person an der position
                return;
            }
            let scaleFactor = (this.speedx / vectorLength);
            diffVector.scale(scaleFactor);
            this.position.add(diffVector);
            //position x und y eine random Richtung geben
            this.position.x += this.direction[0];
            this.position.y += this.direction[1];
            //Damit die Worker sich nur in einem Bereich bewegen
            //wenn die bedingung wahr ist, der Worker also an einer Wand ist, wird seine Richtung minus genommen
            if (this.position.x + this.direction[0] < 255)
                this.direction[0] = -this.direction[0];
            if (this.position.y + this.direction[1] < 30)
                this.direction[1] = -this.direction[1];
            if (this.position.x + this.direction[0] > 450)
                this.direction[0] = -this.direction[0];
            if (this.position.y + this.direction[1] > Endabgabe2.crc2.canvas.height - 30)
                this.direction[1] = -this.direction[1];
        }
        walk(_target) {
            // let diffVector: Vector = new Vector(_target.x - this.position.x, _target.y - this.position.y);
            let diffVector = Endabgabe2.Vector.getDifference(_target, this.position); // target neue position und this.position position vom Objekt
            let vectorLength = Math.round(Math.sqrt(Math.pow(diffVector.x, 2) + Math.pow(diffVector.y, 2))); // Vektor länge 
            if (vectorLength === 0) { // wenn 0 dann ist person an der position
                return;
            }
            let scaleFactor = this.speedx / vectorLength;
            diffVector.scale(scaleFactor);
            this.position.add(diffVector);
        }
        draw() {
            // console.log("Moveable move");
        }
        // Wenn Player geklickt wurde:
        isClicked(_clickPosition) {
            //Klickposition wird berechnet
            let difference = new Endabgabe2.Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            //wenn sich die Zahl im Radius befindet, dann wird true zu main.ts weitergegebn
            return (difference.length < this.radius);
        }
    }
    Endabgabe2.Moveable = Moveable;
})(Endabgabe2 || (Endabgabe2 = {}));
//https://ulli.mingram.net/JS_Kurs_10oop.html
//# sourceMappingURL=moveable.js.map