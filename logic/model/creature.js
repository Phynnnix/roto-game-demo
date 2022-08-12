class Creature{
  constructor(t, o, c){
    this.type = CreatureType.get(t);
    this.owner = o;
    this.count = c;
  }

  /***
  updates the DB with the newest changes.
  ***/
  push(){}
  /***
  fetches the state of the table from the DB.
  ***/
  pull(){}
}

class CreatureType{
  constructor(tr, tm, s, bc, mf){
    this.nr = tr;
    this.name = tm;
    this.strength = s;
    this.bindingCost = bc;
    this.movementFactor = mf;
  }

  get creationCost(){return this.bindingCost * 2;}
  get survivalStrength(){return this.strength / 2;}

  static get(type){
    const m = new CreatureType(0, "Minion", 2, .5, .25);
    const s = new CreatureType(1, "Scholar", 2, 1, 1);
    const w = new CreatureType(2, "Warrior", 6, 1, 1);
    const c = new CreatureType(3, "Cultist", 6, 3, 3);
    const a = new CreatureType(4, "Assassin", 10, 3, 3);
    const h = new CreatureType(5, "Horror", 22, 7, 6);
    if(type == "Minion" || type == 0){
      return m;
    }else if(type == "Scholar" || type == 1){
      return s;
    }else if(type == "Warrior" || type == 2){
      return w;
    }else if(type == "Cultist" || type == 3){
      return c;
    }else if(type == "Assassin" || type == 4){
      return a;
    }else if(type == "Horror" || type == 5){
      return h;
    }
  }
}
