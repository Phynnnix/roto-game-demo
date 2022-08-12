class Controller extends Organizable{
    constructor(){
        super();
        this.model = null;
        this.view = null;
    }

    /**
     * generates a new controller of given type.
     * Used if a new game is created.
     */
    generate(){

    }

    /**
     * loads data for the controller from the database.
     * Used if joining a game.
     */
    load(){

    }

    /**
     * pushes the model into the database.
     * Used to keep the DB updated.
     */
    push(){

    }

    /**
     * pulls the model from the database.
     * used to keep the local game updated.
     */
    pull(){

    }

    show(onnode){
        onnode.appendChild(this.view.htmlNode());
    }

    remove(fromnode){
        fromnode.removeChild(this.view.htmlNode);
    }
}