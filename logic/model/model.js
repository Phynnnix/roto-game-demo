class Model{
    constructor(){
        this.id = null;
        this.className = this.constructor.name;
    }

    getJSON(id){
        this.id = id;
        return JSON.stringify(this);
    }

    loadJSON(json){
        soul = json.parse();
        if(this.className != soul.className)
            return false;
        for(fragment in soul){
            this[fragment] = soul[fragment];
        }
        return true;
    }
}