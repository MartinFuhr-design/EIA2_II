"use strict";
var Endabgabe2;
(function (Endabgabe2) {
    class RestaurantField {
        constructor() {
            this.padding = 5 * Endabgabe2.scale;
            this.width = 80 * Endabgabe2.scale;
            this.height = 90 * Endabgabe2.scale;
            this.color = "grey";
        }
        draw() {
            Endabgabe2.crc2.save();
            Endabgabe2.crc2.fillStyle = "white";
            Endabgabe2.crc2.fillRect(0, 0, Endabgabe2.crc2.canvas.width, Endabgabe2.crc2.canvas.height);
            // left table
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = "#433410";
            Endabgabe2.crc2.fillRect(this.padding, this.padding, 200, this.height);
            Endabgabe2.crc2.stroke();
            //right table
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = "#433410";
            Endabgabe2.crc2.fillRect(this.padding + (this.width + 50), this.padding, 200, this.height);
            Endabgabe2.crc2.stroke();
            //door
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.rect(this.padding + this.width + 610, (this.padding + (this.height / 2)) - 10, 5, 50);
            Endabgabe2.crc2.strokeStyle = "black";
            Endabgabe2.crc2.lineWidth = 20;
            Endabgabe2.crc2.stroke();
            //storage
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = "#8a6a1a";
            Endabgabe2.crc2.fillRect(this.padding, this.padding, 200, 150);
            Endabgabe2.crc2.stroke();
            //reorder
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = "#8a6a1a";
            Endabgabe2.crc2.fillRect(this.padding, this.padding + 300, 200, 150);
            Endabgabe2.crc2.stroke();
            // https://stackoverflow.com/questions/40006524/write-vertical-text-on-canvas/40006604
            let lager = ["L", "A", "G", "E", "R"];
            for (let j = 0; j < lager.length; j++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = "black";
                Endabgabe2.crc2.font = "13px Arial";
                Endabgabe2.crc2.fillText(lager[j], 110, 80 + j * 15);
                Endabgabe2.crc2.restore();
            }
            let cut = ["S", "C", "H", "N", "E", "I", "D", "E", "N"];
            for (let k = 0; k < cut.length; k++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = "black";
                Endabgabe2.crc2.font = "13px Arial";
                Endabgabe2.crc2.fillText(cut[k], 110, 195 + k * 15);
                Endabgabe2.crc2.restore();
            }
            let store = ["S", "T", "O", "R", "E"];
            for (let l = 0; l < store.length; l++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = "black";
                Endabgabe2.crc2.font = "13px Arial";
                Endabgabe2.crc2.fillText(store[l], 110, 370 + l * 15);
                Endabgabe2.crc2.restore();
            }
            //Kasse Fläche
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = "#8a6a1a";
            Endabgabe2.crc2.fillRect(this.padding + (this.width + 50), this.padding, 200, 120);
            Endabgabe2.crc2.stroke();
            //Kasse Box
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = "grey";
            Endabgabe2.crc2.fillRect(this.padding + (600), this.padding + 20, 50, 80);
            Endabgabe2.crc2.stroke();
            //glass
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = "lightblue";
            Endabgabe2.crc2.fillRect(this.padding + (this.width * 2 - 160), this.padding, 10, this.height);
            Endabgabe2.crc2.stroke();
            let i = 1;
            for (let x = 0; x < 3; x++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = this.color;
                Endabgabe2.crc2.fillRect(40, 30 + (5 * x) + i, this.capacity, 40);
                Endabgabe2.crc2.restore();
                i += 45;
            }
            for (let x = 0; x < 3; x++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = this.color;
                Endabgabe2.crc2.fillRect(140, -105 + (5 * x) + i, this.capacity, 40);
                Endabgabe2.crc2.restore();
                i += 45;
            }
            for (let x = 0; x < 3; x++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = this.color;
                Endabgabe2.crc2.fillRect(40, -90 + (5 * x) + i, this.capacity, 40);
                Endabgabe2.crc2.restore();
                i += 45;
            }
            for (let x = 0; x < 3; x++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = this.color;
                Endabgabe2.crc2.fillRect(140, -225 + (5 * x) + i, this.capacity, 40);
                Endabgabe2.crc2.restore();
                i += 45;
            }
            for (let x = 0; x < 3; x++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = this.color;
                Endabgabe2.crc2.fillRect(40, -210 + (5 * x) + i, this.capacity, 40);
                Endabgabe2.crc2.restore();
                i += 45;
            }
            for (let x = 0; x < 3; x++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = this.color;
                Endabgabe2.crc2.fillRect(140, -345 + (5 * x) + i, this.capacity, 40);
                Endabgabe2.crc2.restore();
                i += 45;
            }
            for (let x = 0; x < 3; x++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = this.color;
                Endabgabe2.crc2.fillRect(580, -640 + (5 * x) + i, this.capacity, 40);
                Endabgabe2.crc2.restore();
                i += 45;
            }
            for (let x = 0; x < 3; x++) {
                Endabgabe2.crc2.beginPath();
                Endabgabe2.crc2.fillStyle = this.color;
                Endabgabe2.crc2.fillRect(580, -625 + (5 * x) + i, this.capacity, 40);
                Endabgabe2.crc2.restore();
                i += 45;
            }
            //teig 
            Endabgabe2.crc2.beginPath();
            Endabgabe2.crc2.fillStyle = this.color;
            Endabgabe2.crc2.fillRect(25 + (400 * 2 - 326), 25 + 146, this.capacity, 40);
            Endabgabe2.crc2.restore();
        }
    }
    Endabgabe2.RestaurantField = RestaurantField;
})(Endabgabe2 || (Endabgabe2 = {}));
//# sourceMappingURL=field.js.map