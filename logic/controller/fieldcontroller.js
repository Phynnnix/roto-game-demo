class FieldController extends Controller{
    static BASE = 0;
    static PILLAR = 1;
    static #OUTSIDE = new OutsideField();

    static findDisplacedField(f, dn, dm){
      if(f.isOutside()) return f;
      if(dn == 0 && dm == 0) return f;
      if(dn > 0) return this.findDisplacedField(f.r, --dn, dm);
      if(dn < 0) return this.findDisplacedField(f.l, ++dn, dm);
      if(dm > 0) return this.findDisplacedField(f.b, dn, --dm);
      if(dm < 0) return this.findDisplacedField(f.t, dn, ++dm);
    }
  
    static pairAdj(f1, f2){
      if(Math.abs(f1.n-f2.n) + Math.abs(f1.m-f2.m) == 1){
        if(f1.n < f2.n){
          f2.l = f1;
          f1.r = f2;
        }else if(f1.n > f2.n){
          f2.r = f1;
          f1.l = f2;
        }else if(f1.m < f2.m){
          f1.b = f2;
          f2.t = f1;
        }else{
          f1.t = f2;
          f2.b = f1;
        }
        return true;
      }
      return false;
    }

    constructor(){
      super();
    }

    generate(type, n, m){
      if(type == FieldController.BASE){
        this.model = new Field(n,m);
        let tl = game.tileorga.new();
        tl.generate(TileController.EMPTY);
        this.model.tile = tl.id;
      }
      else if(type == FieldController.PILLAR)
        this.model = new PillarField(n,m);
      return this;
    }

    load(model){
      this.model = model;
    }

    setupView(parent){
      if(!this.isOutside()){
        this.view = new FieldView(parent);

        if(this.isPillar()){
          this.view.getSpaceFor("tile").classList.add("field-pillar");
        }else{
          this.tile.setupView(this.view.getSpaceFor("tile"));
        }
        
        this.view.applyGold(this.model.gold);
        this.view.applyPosition(this.n, this.m);
        this.view.applyOwner(this.owner);
      }
    }

    equals(other){
      return this.model.id == other.model.id;
    }

    get tile(){
      return game.tileorga.getElement(this.model.tile);
    }

    get l(){
      if(this.model.l < 0)
        return FieldController.#OUTSIDE;
      return game.fieldorga.getElement(this.model.l);
    }
    get t(){
      if(this.model.t < 0)
        return FieldController.#OUTSIDE;
      return game.fieldorga.getElement(this.model.t);
    }
    get r(){
      if(this.model.r < 0)
        return FieldController.#OUTSIDE;
      return game.fieldorga.getElement(this.model.r);
    }
    get b(){
      if(this.model.b < 0)
        return FieldController.#OUTSIDE;
      return game.fieldorga.getElement(this.model.b);
    }
    set l(v){
      if(v.isOutside())
        this.model.l = -1;
      else
        this.model.l = v.id;
    }
    set t(v){
      if(v.isOutside())
        this.model.t = -1;
      else
        this.model.t = v.id;
    }
    set r(v){
      if(v.isOutside())
        this.model.r = -1;
      else
        this.model.r = v.id;
    }
    set b(v){
      if(v.isOutside())
        this.model.b = -1;
      else
        this.model.b = v.id;
    }

    get m(){
      return this.model.m;
    }
    get n(){
      return this.model.n;
    }

    get owner(){
      return this.model.owner;
    }

    set owner(ownerId){
      this.model.owner = ownerId;
      this.view.applyOwner(ownerId);
    }

    rN(n){
      if(this.isOutside() || n == 0) return this;
      if(n == 1) return this.r;
      return this.r.rN(n-1);
    }

    tN(n){
      if(this.isOutside() || n == 0) return this;
      if(n == 1) return this.t;
      return this.t.tN(n-1);
    }

    lN(n){
      if(this.isOutside() || n == 0) return this;
      if(n == 1) return this.l;
      return this.l.lN(n-1);
    }

    bN(n){
      if(this.isOutside() || n == 0) return this;
      if(n == 1) return this.b;
      return this.b.bN(n-1);
    }

    isOutside(){return this.model.isOutside;}
    isPillar(){return this.model.isPillar;}
    isEmpty(){return !(this.isOutside() || this.isPillar()) && this.tile.isType(TileController.EMPTY);}
    isBase(){return !(this.isOutside() || this.isPillar());}
    
    get gold(){
      return this.model.gold;
    }

    set gold(v){
      this.model.gold = v;
      this.view.applyGold(this.model.gold)
    }

    putGold(v){
      this.gold += v;
    }

    withdrawGold(v){
      if(v > this.model.gold){
        let tmp = this.model.gold;
        this.gold = 0;
        return tmp;
      }
      this.gold -= v;
      return v;
    }

    hasGold(){
      return this.model.gold > 0;
    }

    get creatureCount(){
      return this.model.creatures.length;
    }

    holdsCreature(creature){
      return this.findCreature(creature) != -1;
    }

    findCreature(creature){
      for (var i = 0; i < this.creatureCount; i++) {
        if(this.model.creatures[i] == creature){
          return i;
        }
      }
      return -1;
    }

    removeCreature(creature){
      let i = this.findCreature(creature);
      if(i > -1){
        this.model.creatures.splice(i,1);
        return true;
      }
      return false;
    }

    addCreature(creature){
      if(!this.holdsCreature(creature) && this.canStayOn(creature)){
        this.model.creatures.push(creature.id);
        return true;
      }
      return false;
    }

    canTraverse(creature){
      let travCreature = null; // TODO: Creature Organizer, from creature
      if(!this.isBase()) return false;
      if(this.tile.isType(TileController.ROCK) && !creature.canMoveThroughRock()) return false;
      if(this.isWarField()) return false;
      for (var c of this.model.creatures) {
        let cr = null;// TODO: Creature Organizer
        if(!cr.hasSameOwner(creature)) return false;
      }
      return true;
    }

    canStayOn(creature){
      let soCreature = null; // TODO: Creature Organizer, from creature
      if(!this.isBase()) return false;
      if(this.isType("Rock")) return false;
      if(this.isWarField()) return false;
      for (var c of this.model.creatures) {
        let cr = null; // TODO: Creature Organizer
        if(cr.hasSameOwner(soCreature) && !cr.hasSameType(soCreature)) return false;
      }
      return true;
    }

    isWarField(){
      return false;
    }
}
