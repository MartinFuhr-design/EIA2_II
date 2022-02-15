namespace Endabgabe2M {
    export abstract class Moveable {
        public position: Vector;
        public radius: number;
        public mood: string;
        public moodColor: string;
        public origin: Vector;
        public highlighted: boolean; // so oder false
        public foodCostumer: string;
        public extraWishesCostumer: string;
        public time: number = 0;
        public walkAnimation: boolean = false;
        public walkAnimationOthers: boolean = false;
        protected speedx: number;
        private direction: number[] = []; 
        private richtung: number [ ] = [1, -1];
        private richtungx: number;
        private richtungy: number;
        
      
       
//https://ulli.mingram.net/JS_Kurs_10oop.html

//auch gut: http://digitalewelt.blaustern.bplaced.net/?p=465
        constructor(_position: Vector) {
            this.radius = 6 * scale;
            this.position = _position;

            this.speedx = 0.7 * scale;
            
            this.richtungx = (Math.floor(Math.random() * 2) + 3) * this.richtung[Math.floor(Math.random() * 2)]; 
            this.richtungy = (Math.floor(Math.random() * 2) + 2) * this.richtung[Math.floor(Math.random() * 2)]; 
            this.direction.push(this.richtungx, this.richtungy);
         
            
        }


        public move(): void {
            let diffVector: Vector = Vector.getDifference(new Vector (this.richtungx, this.richtungy), this.position); // target neue position und this.position position vom
            let vectorLength: number = Math.round(Math.sqrt(Math.pow(diffVector.x, 2) + Math.pow(diffVector.y, 2))); // Vektor länge 
            if (vectorLength === 0) { // wenn 0 dann ist person an der position
                return; 
            }
            let scaleFactor: number = (this.speedx / vectorLength);
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
            if (this.position.y + this.direction[1] > crc2.canvas.height - 30)
            this.direction[1] = -this.direction[1];
        }

        public walk(_target: Vector): void {
              // let diffVector: Vector = new Vector(_target.x - this.position.x, _target.y - this.position.y);
            let diffVector: Vector = Vector.getDifference(_target, this.position); // target neue position und this.position position vom Objekt
            let vectorLength: number = Math.round(Math.sqrt(Math.pow(diffVector.x, 2) + Math.pow(diffVector.y, 2))); // Vektor länge 
            if (vectorLength === 0) { // wenn 0 dann ist person an der position
                return; 
            }
            let scaleFactor: number = this.speedx / vectorLength;
            diffVector.scale(scaleFactor);
            this.position.add(diffVector);
        }


        public draw(): void {
            // console.log("Moveable move");
        }

         
       // Wenn Player geklickt wurde:
       public isClicked(_clickPosition: Vector): Boolean {
        //Klickposition wird berechnet
       let difference: Vector = new Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
       //wenn sich die Zahl im Radius befindet, dann wird true zu main.ts weitergegebn
       return (difference.length < this.radius);
   }

   
    }
}

//https://ulli.mingram.net/JS_Kurs_10oop.html