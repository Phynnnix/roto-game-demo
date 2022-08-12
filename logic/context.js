class Context extends View{
    constructor(){
        super();
    }

    setupView(parent){
        this.elem.classList.add("context-flex-container");

        this.setupPlayfieldRegion();
        this.setupMapControlContext();
        this.setupBuildRoomContext();

        this.showOn(parent);
    }

    setupPlayfieldRegion(){
        let pfr = document.createElement("div");
        this.newSpaceFor("playfieldcontext", pfr);
        pfr.classList.add("context-flex-mediator");
        this.elem.appendChild(pfr);
    }

    setupMapControlContext(){
        let brc = document.createElement("div");
        this.newSpaceFor("mapcontrol", brc);
        brc.classList.add("context-flex-element");
        brc.classList.add("context-mapcontrol");
        brc.classList.add("context-active");
        let controlcore = document.createElement("div"); 
        let controlup = document.createElement("div");
        let controldown = document.createElement("div");
        let controlleft = document.createElement("div");
        let controlright = document.createElement("div");
        let controlplus = document.createElement("div");
        let controlminus = document.createElement("div");
        controlcore.appendChild(controlup);
        controlcore.appendChild(controldown);
        controlcore.appendChild(controlleft);
        controlcore.appendChild(controlright);
        controlcore.appendChild(controlplus);
        controlcore.appendChild(controlminus);
        
        controlcore.classList.add("control-mapcontrol-element");
        controlup.classList.add("control-mapcontrol-element");
        controldown.classList.add("control-mapcontrol-element");
        controlleft.classList.add("control-mapcontrol-element");
        controlright.classList.add("control-mapcontrol-element");
        controlplus.classList.add("control-mapcontrol-element");
        controlminus.classList.add("control-mapcontrol-element");

        controlcore.classList.add("control-mapcontrol-core");
        controlup.classList.add("control-mapcontrol-up");
        controldown.classList.add("control-mapcontrol-down");
        controlleft.classList.add("control-mapcontrol-left");
        controlright.classList.add("control-mapcontrol-right");
        controlplus.classList.add("control-mapcontrol-plus");
        controlminus.classList.add("control-mapcontrol-minus");

        controlup.onclick = (ev)=>{
            game.playfield.view.scrollSteps(0,-2);
        };
        controldown.onclick = (ev)=>{
            game.playfield.view.scrollSteps(0,2);
        };
        controlleft.onclick = (ev)=>{
            game.playfield.view.scrollSteps(-2,0);
        };
        controlright.onclick = (ev)=>{
            game.playfield.view.scrollSteps(2,0);
        };
        controlplus.onclick = (ev)=>{
            game.playfield.view.zoom(1.1);
        };
        controlminus.onclick = (ev)=>{
            game.playfield.view.zoom(1.0/1.1);
        };

        brc.appendChild(controlcore);

        this.getSpaceFor("playfieldcontext").appendChild(brc);
    }

    setupBuildRoomContext(){
        let brc = document.createElement("div");
        this.newSpaceFor("buildroom", brc);
        brc.classList.add("context-flex-element");
        brc.classList.add("context-buildroom");

        for(let type of TileController.ROOMS){
            let buildarea = document.createElement("div"); 
            let buildbutton = document.createElement("div");
            let buildprice = document.createElement("div");
            buildarea.classList.add("context-buildroom-area");
            buildarea.classList.add("context-buildroom-area-"+type);
            buildbutton.classList.add("context-buildroom-button");
            buildprice.classList.add("context-buildroom-price");
            buildarea.appendChild(buildbutton);
            buildarea.appendChild(buildprice);

            this.newSpaceFor("buildprice-"+type, buildprice);
            this.newSpaceFor("buildbutton-"+type, buildbutton);
            brc.appendChild(buildarea);
        }

        this.getSpaceFor("playfieldcontext").appendChild(brc);
    }

    setBuildRoomContext(rect){
        for(let type of TileController.ROOMS){
            this.showBuildRoomContext(false);
            if(RoomController.canBeRoom(rect)){
                this.showBuildRoomContext(true);
                let btn = this.getSpaceFor("buildbutton-"+type);
                let prc = this.getSpaceFor("buildprice-"+type);
                btn.onclick = '';
                btn.classList.remove("context-buildroom-allowed");
                prc.classList.remove("context-buildroom-allowed");
                while (prc.firstChild) {
                    prc.removeChild(prc.lastChild);
                }
                
                let cost = RoomController.costOfRoom(rect, type, game.ownLordId);
                prc.appendChild(document.createTextNode(""+cost));
                if(RoomController.canBeBuild(rect, type, game.ownLordId)){
                    if(cost < 600){ //TODO: Kosten gegen Ressourcen prüfen!
                        btn.classList.add("context-buildroom-allowed");
                        prc.classList.add("context-buildroom-allowed");
                        btn.onclick = (ev)=>{
                            let rm = game.roomorga.new();
                            rm.generate(rect, type, game.ownLordId);
                            game.context.setBuildRoomContext(rect);
                            //TODO: Kosten abziehen!
                        };
                    }
                }
            }
        }
    }

    showBuildRoomContext(active){
        if(active){
            this.getSpaceFor("buildroom").classList.add("context-active");
        }else{
            this.getSpaceFor("buildroom").classList.remove("context-active");
        }
    }
}