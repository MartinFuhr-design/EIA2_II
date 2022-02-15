"use strict";
var Endabgabe2;
(function (Endabgabe2) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        static getDifference(_v0, _v1) {
            // static Statische Methoden werden ohne Instanzierung einer Klasse aufgerufen und sind über eine erzeugte Instanz nicht aufrufbar.
            // Oft werden in statische Methoden für Hilfsfunktionen verwendet.
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }
        get length() {
            return Math.hypot(this.x, this.y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= (_factor * .99);
            this.y *= (_factor * .25);
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    }
    Endabgabe2.Vector = Vector;
})(Endabgabe2 || (Endabgabe2 = {}));
//# sourceMappingURL=vector.js.map