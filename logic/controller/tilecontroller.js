class TileController extends Controller{
    static EMPTY = 0;
    static DORM = 1;
    static FARM = 2;
    static FORGE = 3;
    static LIBRARY = 4;
    static ARCANUM = 5;
    static VAULT = 6;
    static ROOM = 7;
    static ROOMS = [1,2,3,4,5,6];
    static ROCK = 9;

    constructor(){
        super();
        this.api = "API/tile.php";
    }

    push(){
        let call = new APICall();
        this.model.id = this.id;
        let data = new APICallData("API/tile.php", {"push": "change"}, {gameid:game.id, object:this.model});
        call.callTo(data).postAll().then(res => {console.log(res[0].answer)});
    }

    get type(){
        return this.model.type;
    }

    set type(type){
        if(type == TileController.EMPTY)
            this.model = new EmptyTile();
        else if(type == TileController.ROCK)
            this.model = new RockTile();
        else if(TileController.ROOMS.some(tp=>tp==type))
            this.model = new RoomTile(type);
        this.view.applyType(type);
    }

    get gold(){
        return this.model.gold;
    }

    set gold(g){
        this.model.gold = g;
        this.view.applyGold(g);
    }

    generate(type){
        if(type == TileController.EMPTY)
            this.model = new EmptyTile();
        else if(type == TileController.ROCK)
            this.model = new RockTile();
        else if(TileController.ROOMS.some(tp=>tp==type))
            this.model = new RoomTile(type);
        this.push();
        return this;
    }

    setupView(parent){
        this.view = new TileView(parent);

        this.view.applyType(this.model.type);
        if(this.model.type == TileController.ROCK)
            this.view.applyGold(this.gold);
    }

    hideGold(g){
        if(this.type == TileController.ROCK){
            this.gold = g;
            this.push();
            return true;
        }
        return false;
    }

    place(roomTile){
        if(TileController.ROOMS.some(tp=>tp==roomTile)){
            this.type = roomTile;
            this.push();
            return true;
        }
        return false;
    }

    remove(){
        this.type = TileController.EMPTY;
        this.push();
        return true;
    }

    isType(type){
        return type == this.type;
    }

}