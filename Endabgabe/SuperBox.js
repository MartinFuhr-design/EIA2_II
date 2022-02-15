"use strict";
var Endabgabe2;
(function (Endabgabe2) {
    class Box {
        constructor(_i, _j, _name, _color, _capacity, _fillLevel, _createheight) {
            this.boxheight = 40;
            this.boxwidth = 70;
            this.highlighted = false;
            this.capacity = _capacity;
            let randomFill = Math.floor(Math.random() * this.capacity);
            if (_fillLevel) {
                this.otherfullLevel = _fillLevel;
                if (randomFill + _fillLevel <= this.capacity - 10) {
                    let difference = this.capacity - (randomFill + _fillLevel);
                    this.fillLevel -= difference;
                }
                else {
                    this.fillLevel = randomFill + _fillLevel;
                }
            }
            else {
                this.fillLevel = randomFill;
                this.otherfullLevel = randomFill;
            }
            if (_createheight)
                this.createHight = _createheight;
            else
                this.createHight = 100;
            this.position = new Endabgabe2.Vector(_i, _j);
            this.radius = 6 * Endabgabe2.scale;
            this.name = _name;
            this.color = _color;
        }
        draw() {
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = this.color;
            Endabgabe2.crc2.fillRect(this.position.x, this.position.y, this.fillLevel, 40);
            Endabgabe2.crc2.fillStyle = "black";
            Endabgabe2.crc2.font = this.highlighted ? "16px Arial" : "13px Arial";
            Endabgabe2.crc2.fillText(this.name, this.position.x + 10, this.position.y + 20);
            Endabgabe2.crc2.restore();
        }
        paint() {
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = this.color;
            Endabgabe2.crc2.fillRect(this.position.x, this.position.y, this.otherfullLevel, 40);
            Endabgabe2.crc2.fillStyle = "black";
            Endabgabe2.crc2.font = this.highlighted ? "16px Arial" : "13px Arial";
            Endabgabe2.crc2.fillText(this.name, this.position.x + 10, this.position.y + 20);
            Endabgabe2.crc2.restore();
        }
        create() {
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = this.color;
            Endabgabe2.crc2.fillRect(this.position.x, this.position.y, this.otherfullLevel, this.createHight);
            Endabgabe2.crc2.fillStyle = "black";
            Endabgabe2.crc2.font = this.highlighted ? "16px Arial" : "13px Arial";
            Endabgabe2.crc2.fillText(this.name, this.position.x + 10, this.position.y + 20);
            Endabgabe2.crc2.restore();
        }
        createCircle() {
            Endabgabe2.crc2.save();
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.arc(this.position.x, this.position.y, this.radius * 1.2, 0, 2 * Math.PI, false);
            Endabgabe2.crc2.fillStyle = this.color;
            Endabgabe2.crc2.fill();
            Endabgabe2.crc2.lineWidth = 1;
            Endabgabe2.crc2.strokeStyle = "black";
            Endabgabe2.crc2.stroke();
            Endabgabe2.crc2.restore();
        }
        isClicked(mx, my, shape) {
            if (shape.boxwidth) {
                // this is a rectangle
                var rLeft = shape.position.x;
                var rRight = shape.position.x + shape.boxwidth;
                var rTop = shape.position.y;
                var rBott = shape.position.y + shape.boxheight;
                // math test to see if mouse is inside rectangle
                if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
                    return (true);
                }
            }
            // the mouse isn't in any of the shapes 
            return (false);
        }
    }
    Endabgabe2.Box = Box;
})(Endabgabe2 || (Endabgabe2 = {}));
//# sourceMappingURL=SuperBox.js.map