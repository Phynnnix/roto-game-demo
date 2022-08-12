class TileOrganizer extends Organizer{
    constructor(){
        super("API/tile.php");
    }

    new(){
        let tc = new TileController();
        this.register(tc);
        return tc;
    }

    pull(){
        super.pull((data => {
            console.log(data);
            console.log(this.keys);
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                const key = this.keys[index];
                const tl = this.getElement(key);
                if(tl.type != element.type){
                    tl.type = element.type;
                }
            }
        }));
    }
}