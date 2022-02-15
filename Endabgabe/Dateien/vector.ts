namespace Endabgabe2M {
    export class Vector {
        public x: number;
        public y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        public static getDifference(_v0: Vector, _v1: Vector): Vector { // kann entweder weg oder in movable umschreiben
            // static Statische Methoden werden ohne Instanzierung einer Klasse aufgerufen und sind über eine erzeugte Instanz nicht aufrufbar.
            // Oft werden in statische Methoden für Hilfsfunktionen verwendet.
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }

        public get length(): number {
            return Math.hypot(this.x, this.y);
        } 

        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        public scale(_factor: number): void {
            this.x *= (_factor * .99);
            this.y *= (_factor * .25);
        }

        public add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }
       
    }
}