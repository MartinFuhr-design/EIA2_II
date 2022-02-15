"use strict";
var Endabgabe2;
(function (Endabgabe2) {
    class Worker extends Endabgabe2.Moveable {
        constructor(_mood, _moodColor, _position) {
            super(new Endabgabe2.Vector(_position.x, _position.y));
            this.mood = _mood;
            this.moodColor = _moodColor;
            this.origin = new Endabgabe2.Vector(this.position.x, this.position.y);
        }
        draw() {
            Endabgabe2.crc2.save();
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.arc(this.position.x, this.position.y, this.highlighted ? this.radius * 1.2 : this.radius, 0, 2 * Math.PI);
            Endabgabe2.crc2.fillStyle = this.moodColor;
            Endabgabe2.crc2.fill();
            Endabgabe2.crc2.lineWidth = this.highlighted ? 2 : 1;
            Endabgabe2.crc2.strokeStyle = "black";
            Endabgabe2.crc2.stroke();
            Endabgabe2.crc2.textAlign = "center";
            Endabgabe2.crc2.textBaseline = "middle";
            Endabgabe2.crc2.fillStyle = "black";
            Endabgabe2.crc2.font = "30px Arial";
            Endabgabe2.crc2.fillText(this.mood.toString(), this.position.x, this.position.y);
            Endabgabe2.crc2.restore();
        }
    }
    Endabgabe2.Worker = Worker;
})(Endabgabe2 || (Endabgabe2 = {}));
//# sourceMappingURL=otherWorker.js.map