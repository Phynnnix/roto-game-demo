class RoomController extends Controller{
  static canBeRoom(rect){
    if(rect.length <= 1) return false;
    for (var fieldId of rect) {
      let field = game.fieldorga.getElement(fieldId);
      if(!field.isEmpty())
        return false;
    }
    return true;
  }

  static canBeBuild(rect, tile, by){
    if(!this.canBeRoom(rect)) return false;
    return true;
  }

  static roomOf(fieldId){
    let roomId = -1;
    game.roomorga.forEach((room)=>{
      if(room.has(fieldId)){
        roomId = room.id; 
        return;
      }
    });
    return roomId;
  }

  static costOfRoom(rect, tile, by){
    return 100 + 15 * rect.length + 30 * tile - by;
  }

  constructor(){
    super();
    this.model = new Room();
  }

  generate(rect, type, by){
    this.model.type = type;
    this.model.fields = rect;
    this.model.owner = by;
    for (var fieldId of rect) {
      let field = game.fieldorga.getElement(fieldId);
      field.tile.place(type);
      field.owner = by;
    }
    return this;
  }

  load(){

  }

  destroy(){
    for (var fieldId of this.model.fields) {
      let field = game.fieldorga.getElement(fieldId);
      field.tile.remove();
      field.owner = -1;
    }
    game.roomorga.delete(this.id);
  }
  
  get size(){
    return this.model.fields.length;
  }

  get nDim(){
    return this.room(this.size-1).n - this.room(0).n;
  }

  get mDim(){
    return this.room(this.size-1).m - this.room(0).m;
  }

  get owner(){
    return this.model.owner;
  }

  room(index){
    game.fieldorga.getElement(index);
  }

  has(fieldId){
    if(fieldId in this.model.fields) return true;
    return false;
  }
/*
  perfection(){
    if(this.nDim() != this.mDim() || this.nDim() % 2 != 1)
      return 0;
    let perfectTunnels = true;
    let edge = [this.fields[0].l, this.fields[0].t, this.fields[this.size() - 1].r, this.fields[this.size() - 1].b];
    for (var i = 0; i < this.nDim() && perfectTunnels; i++) {
      if(i != ((this.nDim() - 1) / 2)){
        if(!edge[0].isType("Rock")) perfectTunnels = false;
        if(!edge[1].isType("Rock")) perfectTunnels = false;
        if(!edge[2].isType("Rock")) perfectTunnels = false;
        if(!edge[3].isType("Rock")) perfectTunnels = false;
      }
      edge = [edge[0].b, edge[1].r, edge[2].t, edge[3].l];
    }
    if(perfectTunnels) return (this.nDim() - 1) / 2;
    return 0;
  }
  */

  isActive(){
    return true;
  }
}
