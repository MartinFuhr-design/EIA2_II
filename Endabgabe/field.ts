namespace Endabgabe2M {
    export class RestaurantField {
        public padding: number = 5 * scale;
        public width: number = 80 * scale;
        public height: number = 90 * scale;
        public capacity: number;
        private color: string = "grey";
        
    public draw(): void {
        crc2.save();
        crc2.fillStyle = "white";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

         // left table
        crc2.beginPath();
        crc2.fillStyle = "#433410";
        crc2.fillRect(this.padding, this.padding, 200, this.height);
        crc2.stroke();
        //right table
        crc2.beginPath();
        crc2.fillStyle = "#433410";
        crc2.fillRect(this.padding + (this.width + 50), this.padding, 200, this.height);
        crc2.stroke();
        //door
        crc2.beginPath();
        crc2.rect(this.padding + this.width + 610, (this.padding + (this.height / 2)) - 10, 5, 50);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 20;
        crc2.stroke();

        //storage
        crc2.beginPath();
        crc2.fillStyle = "#8a6a1a";
        crc2.fillRect(this.padding, this.padding, 200, 150);
        crc2.stroke();

        //reorder
        crc2.beginPath();
        crc2.fillStyle = "#8a6a1a";
        crc2.fillRect(this.padding, this.padding + 300, 200, 150);
        crc2.stroke();


        // https://stackoverflow.com/questions/40006524/write-vertical-text-on-canvas/40006604
        let lager: string[] = ["L", "A", "G", "E", "R"];
        for (let j: number = 0; j < lager.length; j++) {
        crc2.beginPath();
        crc2.fillStyle = "black";
        crc2.font = "13px Arial";
        crc2.fillText(lager[j], 110, 80 + j * 15);
        crc2.restore();
        }

        let cut: string[] = ["S", "C", "H", "N", "E", "I", "D", "E", "N"];
        for (let k: number = 0; k < cut.length; k++) {
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.font = "13px Arial";
            crc2.fillText(cut[k], 110, 195 + k * 15);
            crc2.restore();
            }

        let store: string[] = ["S", "T", "O", "R", "E"];
        for (let l: number = 0; l < store.length; l++) {
                crc2.beginPath();
                crc2.fillStyle = "black";
                crc2.font = "13px Arial";
                crc2.fillText(store[l], 110, 370 + l * 15);
                crc2.restore();
                }

        //Kasse Fläche
        crc2.beginPath();
        crc2.fillStyle = "#8a6a1a";
        crc2.fillRect(this.padding + (this.width + 50), this.padding, 200, 120);
        crc2.stroke();

        //Kasse Box
        crc2.beginPath();
        crc2.fillStyle = "grey";
        crc2.fillRect(this.padding + (600), this.padding + 20, 50, 80);
        crc2.stroke();

        //glass
        crc2. beginPath();
        crc2.fillStyle = "lightblue";
        crc2.fillRect(this.padding + (this.width * 2 - 160), this.padding, 10, this.height);
        crc2.stroke();

      
        let i: number = 1;

        for (let x: number = 0; x < 3; x++) {
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(40, 30 + (5 * x) + i, this.capacity, 40);
            crc2.restore();
            i += 45;
            

        }
        for (let x: number = 0; x < 3; x++) {
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(140, - 105 + (5 * x) + i, this.capacity, 40);
            crc2.restore();
            i += 45;
         
        }

        for (let x: number = 0; x < 3; x++) {

            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(40, - 90 + (5 * x) + i, this.capacity, 40);
            crc2.restore();
            i += 45;
      
        }
        for (let x: number = 0; x < 3; x++) {
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(140, - 225 + (5 * x) + i, this.capacity, 40);
            crc2.restore();
            i += 45;
       
        }
        for (let x: number = 0; x < 3; x++) {

            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(40, - 210 + (5 * x) + i, this.capacity, 40);
            crc2.restore();
            i += 45;
         
        }
        for (let x: number = 0; x < 3; x++) {
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(140, - 345 + (5 * x) + i, this.capacity, 40);
            crc2.restore();
            i += 45;
         
        }
        for (let x: number = 0; x < 3; x++) {
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(580, - 640 + (5 * x) + i, this.capacity, 40);
            crc2.restore();
            i += 45;
         
        }

        for (let x: number = 0; x < 3; x++) {

            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(580, - 625 + (5 * x) + i, this.capacity, 40);
            crc2.restore();
            i += 45;
        }
       
         //teig 
        crc2.beginPath();
        crc2.fillStyle = this.color;
        crc2.fillRect(25 + (400 * 2 - 326), 25 + 146, this.capacity, 40);
        crc2.restore();

    }

    

}
}

