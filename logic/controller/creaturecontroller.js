class CreatureController{
  constructor(creature){
    this.c = creature;
  }

  equals(other){
    return this.c == other.c;
  }

  appendTo(array){
    array.push(this.c);
  }

  get type(){
    return this.c.type;
  }
  get count(){
    return this.c.count;
  }
  set count(v){
    this.c.count = v;
  }

  get strength(){
    return this.type.strength * this.count;
  }
  get bindingCost(){
    return this.type.bindingCost * this.count;
  }
  get movementFactor(){
    return this.type.movementFactor * this.count;
  }
  get creationCost(){
    return this.type.creationCost * this.count;
  }
  get survivalStrength(){
    return this.type.survivalStrength * this.count;
  }

  remove(){
    this.count = 0;
  }

  add(c){
    this.count += c;
  }

  sub(c){
    if (c <= 0 || c >= this.count) return false;
    this.count -= c;
    return true;
  }

  canMoveThroughRock(){
    return this.type.nr == 5;
  }

  canDig(){
    return this.type.nr == 0;
  }

  isType(t){
    return t == this.type.name || t == this.type.nr;
  }

  hasSameOwner(creature){
    return this.c.owner === creature.c.owner;
  }

  hasSameType(creature){
    return this.c.type.nr == creature.c.type.nr;
  }

  canMove(position, target, playfield, ressources){
    if(target.canStayOn()) return false;
    let path = playfield.aStar(position, target, this);
    if(path === null) return false;
    if(!ressources.hasMoves(this.movementCost(path))) return false;
    return path;
  }

  movementCost(path){
    return Math.ciel(path.length * this.movementFactor);
  }

  move(path, ressources){
    if(!path) return false;
    let position = path[0];
    let target = path[path.length - 1];
    ressources.payMoves(this.movementCost(path));
    position.removeCreature(this);
    field.creature = cr;
    cr.field = field;
    return true;
  }

  canSwallow(cr){
    return cr1.isType(cr2.type.name);
  }

  swallow(cr){
    if(!this.canCombine(cr1, cr2)) return false;
    cr1.add(cr2.count);
    if(cr2.field.creature === cr2) cr2.field.creature = null;
    cr2.remove();
    return true;
  }

  split(count){
    if(!cr.sub(count)) return false;
    return new Creature(cr.type.nr, cr.owner, count);
  }
}
