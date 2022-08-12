class Game extends View{
    static MOUSEDOWN = {0: false, 1: false, 2: false, 3: false};
    static PHASES = {
        "SETUP":0,
        "FARMING":1,
        "LORD":2,
        "BINDING":3,
        "ACTION":4,
        "MOVING":5,
        "FIGHTING":6,
        "ORES":7,
        "CLEANUP":8
    };

    constructor(id){
        super();
        this.id = id;
        this.ownLordId = 1;

        this.context = new Context();

        this.fieldorga = new FieldOrganizer();
        this.tileorga = new TileOrganizer();
        this.roomorga = new RoomOrganizer();

        this.playfield = new PlayfieldController();

        this.cps = 20;
        this.pullcycle = setInterval(()=>this.pull(), Math.floor(1000 * 1/this.cps));
    }

    generate(){
        this.generateView();
        this.playfield.generate(31,31).setupView(this.getSpaceFor("playfield"));
        this.context.setupView(this.getSpaceFor("context"));
    }

    pull(){
        console.log("...pulling...");
        this.tileorga.pull();
    }

    generateView(){
        let tabButtons = [];
        let tabRegions = [];
        this.elem.classList.add("game-base");
        this.elem.onmousedown = (ev)=>{
            ev.preventDefault();
            ev.stopPropagation();
            Game.MOUSEDOWN[ev.button] = true;
        };
        this.elem.onmouseup = (ev)=>{
            ev.preventDefault();
            ev.stopPropagation();
            Game.MOUSEDOWN[ev.button] = false;
        };
        let tabSpace = document.createElement("nav");
        this.elem.appendChild(tabSpace);
        tabSpace.classList.add("game-tab-container");
        this.newSpaceFor("tab", tabSpace);

        let playfieldSpace = document.createElement("div");
        this.elem.appendChild(playfieldSpace);
        playfieldSpace.classList.add("game-playfield-tab");
        playfieldSpace.classList.add("game-tab-region");
        this.newSpaceFor("playfield", playfieldSpace);
        let playfieldButton = document.createElement("div");
        tabSpace.appendChild(playfieldButton);
        playfieldButton.appendChild(document.createTextNode("Spielfeld"));
        playfieldButton.classList.add("game-playfield-button");
        playfieldButton.classList.add("game-tab-button");
        tabRegions.push(playfieldSpace);
        tabButtons.push(playfieldButton);

        let lordSpace = document.createElement("div");
        this.elem.appendChild(lordSpace);
        lordSpace.classList.add("game-lord-tab");
        lordSpace.classList.add("game-tab-region");
        this.newSpaceFor("lord", lordSpace);
        let lordButton = document.createElement("div");
        tabSpace.appendChild(lordButton);
        lordButton.appendChild(document.createTextNode("Overlords"));
        lordButton.classList.add("game-lord-button");
        lordButton.classList.add("game-tab-button");
        tabRegions.push(lordSpace);
        tabButtons.push(lordButton);

        
        playfieldButton.onclick = (ev)=>{
            tabButtons.forEach((button)=>{button.classList.remove("tab-button-active");});
            tabRegions.forEach((button)=>{button.classList.remove("tab-region-active");});
            playfieldButton.classList.add("tab-button-active");
            playfieldSpace.classList.add("tab-region-active");
        };
        lordButton.onclick = (ev)=>{
            tabButtons.forEach((button)=>{button.classList.remove("tab-button-active");});
            tabRegions.forEach((button)=>{button.classList.remove("tab-region-active");});
            lordButton.classList.add("tab-button-active");
            lordSpace.classList.add("tab-region-active");
        };
        
        let contextSpace = document.createElement("div");
        this.elem.appendChild(contextSpace);
        contextSpace.classList.add("game-context-container");
        this.newSpaceFor("context", contextSpace);

        this.showOn(document.body)
    }
}
var game;

function setup(){
    let newButton = document.createElement("div");
    newButton.classList.add("setup-new-button");
    newButton.appendChild(document.createTextNode("neues Spiel"));
    newButton.onclick = ()=>{
        let call = new APICall();
        let data = new APICallData("API/game.php", {"gameid": "new"});
        call.callTo(data).getAll().then(res => {newGame(res[0].answer)});
        newButton.remove();
    };
    document.body.appendChild(newButton);
}

function newGame(id){
    game = new Game(id);
    game.generate();
}

function loadGame(){
    
}