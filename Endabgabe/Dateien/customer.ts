namespace Endabgabe2M {

    export class Costumer extends Moveable {

        constructor(_mood: string, _moodColor: string, _food: string, _extraWishes: string, _position: Vector, _time: number) {
            super(new Vector(_position.x, _position.y));
            
            this.origin = new Vector (this.position.x, this.position.y);
                
          
            this.mood = _mood;
            this.moodColor = _moodColor;
            this.speedx = 0.7 * scale;
            this.foodCostumer = _food;
            this.extraWishesCostumer = _extraWishes;
           
        }

      

        public draw(): void {
            crc2.save();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.fillStyle = this.moodColor;
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.textAlign = "center";
            crc2.textBaseline = "middle";
            crc2.fillStyle = "black";
            crc2.font = "30px Arial";
            crc2.fillText(this.mood.toString(), this.position.x, this.position.y);

            crc2.restore();
        }
        

    }

}