namespace Endabgabe2M {
    export class Box {
        public position: Vector;
        public fillLevel: number;
        public radius: number;
        public name: string;
        public color: string;
        public capacity: number;
        public boxheight: number = 40;
        public boxwidth: number = 70;
        public highlighted: boolean = false;
        public otherfullLevel: number;
        private createHight: number;
     


        constructor(_i: number, _j: number, _name: string, _color: string, _capacity: number, _fillLevel?: number, _createheight?: number) {
            this.capacity = _capacity;
            let randomFill: number = Math.floor(Math.random() * this.capacity);
           
            if (_fillLevel) {
                this.otherfullLevel = _fillLevel;
                if (randomFill + _fillLevel <= this.capacity - 10) {
                    let difference: number = this.capacity - (randomFill + _fillLevel); 
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
    
            this.position = new Vector(_i, _j);
            this.radius = 6 * scale;
        
            this.name = _name;
            this.color = _color;

            
        }

   
    

    public draw(): void {
        crc2.beginPath();
        crc2.fillStyle = this.color;
        crc2.fillRect(this.position.x, this.position.y, this.fillLevel, 40);
        crc2.fillStyle = "black";
        crc2.font = this.highlighted ? "16px Arial" : "13px Arial";
        crc2.fillText(this.name, this.position.x + 10, this.position.y + 20);
        crc2.restore();

    }

    public paint(): void {
        crc2.beginPath();
        crc2.fillStyle = this.color;
        crc2.fillRect(this.position.x, this.position.y, this.otherfullLevel, 40);
        crc2.fillStyle = "black";
        crc2.font = this.highlighted ? "16px Arial" : "13px Arial";
        crc2.fillText(this.name, this.position.x + 10, this.position.y + 20);
        crc2.restore();

    }

    public create(): void {
        crc2.beginPath();
        crc2.fillStyle = this.color;
        crc2.fillRect(this.position.x, this.position.y, this.otherfullLevel, this.createHight);
        crc2.fillStyle = "black";
        crc2.font = this.highlighted ? "16px Arial" : "13px Arial";
        crc2.fillText(this.name, this.position.x + 10, this.position.y + 20);
        crc2.restore();

    }

    public createCircle(): void {
        crc2.save();

        crc2.beginPath();
        crc2.arc(this.position.x, this.position.y, this.radius * 1.2, 0, 2 * Math.PI, false);
        crc2.fillStyle = this.color;
        crc2.fill();
        crc2.lineWidth = 1;
        crc2.strokeStyle = "black";
        crc2.stroke();

        crc2.restore();

    }
    

   
  public isClicked(mx: number, my: number, shape: Box): Boolean {
    if (shape.boxwidth) {
        // this is a rectangle
        var rLeft: number = shape.position.x;
        var rRight: number = shape.position.x + shape.boxwidth;
        var rTop: number = shape.position.y;
        var rBott: number = shape.position.y + shape.boxheight;
        // math test to see if mouse is inside rectangle

        if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {

            return (true);
        }

    }
    // the mouse isn't in any of the shapes 
    return (false);
}

    }

    
}