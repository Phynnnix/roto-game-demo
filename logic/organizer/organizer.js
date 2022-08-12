class Organizer{
    constructor(api){
        this.elements = {};
        this.maxId = 2000000000;
        this.api = api;
    }

    get keys(){
        return Object.keys(this.elements);
    }

    getRandomId() {
        return Math.floor(Math.random() * this.maxId + 1);
    }

    hasId(id){
        return id in this.elements;
    }

    register(element){
        let rid = this.getRandomId();
        while(this.hasId(rid)){rid = this.getRandomId();}
        this.registerAt(element, rid);
    }

    delete(element){
        delete this.elements[element];
    }

    registerAt(element, id){
        if(this.hasId(id)){
            return false;
        }
        element.setId(id);
        element.setOrganizer(this);
        this.elements[id] = element;
        return true;
    }

    getElement(id){
        return this.elements[id];
    }

    forEach(callback){
        for(let element of Object.values(this.elements)){
            callback(element);
        }
    }

    pull(pullfunc){
        let call = new APICall();
        let data = new APICallData(this.api, {"action": "getchanged", "gameid": game.id});
        call.callTo(data).getAll().then(res => {
            let response = res[0];
            let data = response.answer;
            pullfunc(data);
        });
    }
}