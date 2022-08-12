class GeneralField{
  constructor(){
    this.isOutside = false;
    this.isPillar = false;
  }
}

class PillarField extends GeneralField{
  constructor(n, m){
    super();
    this.n = n;
    this.m = m;
    this.l = -1;
    this.t = -1;
    this.r = -1;
    this.b = -1;
    this.isPillar = true;
  }

}

class Field extends PillarField{
  constructor(n, m){
    super(n, m);
    this.tile = -1;
    this.room = -1;
    this.creatures = [];
    this.owner = 0;
    this.gold = 0;
    this.isPillar = false;
  }
}

class OutsideField extends GeneralField{
  constructor(){
    super();
    this.isOutside = true;
  }

}
