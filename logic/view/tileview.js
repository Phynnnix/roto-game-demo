class TileView extends View{
    constructor(parent){
        super();
        this.elem.classList.add("tile-base");
        this.showOn(parent);
    }

    applyType(type){
        this.elem.classList.remove("tile-empty");
        this.elem.classList.remove("tile-dorm");
        this.elem.classList.remove("tile-farm");
        this.elem.classList.remove("tile-forge");
        this.elem.classList.remove("tile-arcanum");
        this.elem.classList.remove("tile-library");
        this.elem.classList.remove("tile-vault");
        this.elem.classList.remove("tile-rock");
        switch(type){
            case TileController.EMPTY:
                this.elem.classList.add("tile-empty");
                break;
            case TileController.DORM:
                this.elem.classList.add("tile-dorm");
                break;
            case TileController.FARM:
                this.elem.classList.add("tile-farm");
                break;
            case TileController.FORGE:
                this.elem.classList.add("tile-forge");
                break;
            case TileController.ARCANUM:
                this.elem.classList.add("tile-arcanum");
                break;
            case TileController.LIBRARY:
                this.elem.classList.add("tile-library");
                break;
            case TileController.VAULT:
                this.elem.classList.add("tile-vault");
                break;
            case TileController.ROCK:
                this.elem.classList.add("tile-rock");
                break;
        }
    }

    applyGold(gold){
        if(gold > 0){
            this.elem.classList.add("tile-gold-rock");
        }else{
            this.elem.classList.remove("tile-gold-rock");
        }
    }
}