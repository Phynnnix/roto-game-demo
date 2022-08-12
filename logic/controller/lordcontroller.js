class LordController{
  constructor(id, lord){
    this.id = id;
    this.lord = lord;
    this.res = null;
  }

  get ressources(){
    if(this.res === null) this.res = new RessourcesController(this.id);
    return this.res;
  }

  addCreature(c){

  }
}
