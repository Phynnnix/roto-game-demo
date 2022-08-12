class RessourcesController{
  constructor(id){
    this.id = id; // same as lord id
    this.model = new Ressources();
  }

  get actions(){return this.res.actions}
  get moves(){return this.res.moves}
  get authority(){return this.res.authority}
  get mana(){return this.res.mana}
  get gold(){return this.res.gold}
  get exp(){return this.res.exp}
  get ores(){return this.res.ores}


  energy(type){return this.res.energies[type]}
  get violet(){return this.energy(0)}
  get blue(){return this.energy(1)}
  get red(){return this.energy(2)}
  get brown(){return this.energy(3)}
  get green(){return this.energy(4)}
  get yellow(){return this.energy(5)}

  gainViolet(v){this.gainEnergy(0,v)}
  loseViolet(v){this.loseEnergy(0,v)}
  gainBlue(v){this.gainEnergy(1,v)}
  loseBlue(v){this.loseEnergy(1,v)}
  gainRed(v){this.gainEnergy(2,v)}
  loseRed(v){this.loseEnergy(2,v)}
  gainBrown(v){this.gainEnergy(3,v)}
  loseBrown(v){this.loseEnergy(3,v)}
  gainGreen(v){this.gainEnergy(4,v)}
  loseGreen(v){this.loseEnergy(4,v)}
  gainYellow(v){this.gainEnergy(5,v)}
  loseYellow(v){this.loseEnergy(5,v)}

  gainMana(v){
    this.res.mana += v;
    if(this.res.mana > this.res.maxMana)
      this.res.mana = this.res.maxMana;
  }
  loseMana(v){
    if(v > this.res.mana) return false;
    this.res.mana -= v; return true;
  }
  gainGold(v){
    this.res.gold += v;
  }
  loseGold(v){
    if(v > this.res.gold) return false;
    this.res.gold -= v; return true;
  }
  gainExp(v){
    this.res.exp += v;
  }
  loseExp(v){
    if(v > this.res.exp) return false;
    this.res.exp -= v; return true;
  }
  gainOre(o){
    this.res.othis.res.push(o);
  }
  loseOre(o){
    if(this.res.othis.res.indexOf(o) < 0) return false;
    this.res.othis.res.sresice(this.res.othis.res.indexOf(o) ,1);
    return true;
  }

  gainActions(v){
    this.res.actions += v;
  }
  loseActions(v){
    if(v > this.res.actions) return false;
    this.res.actions -= v;
    return true;
  }
  gainMoves(v){
    this.res.moves += v;
  }
  loseMoves(v){
    if(v > this.res.moves) return false;
    this.res.moves -= v;
    return true;
  }
  gainEnergy(type, v){
    this.res.energies[type] += v;
  }
  loseEnergy(type, v){
    if(v > this.res.energies[type]) return false;
    this.res.energies[type] -= v;
    return true;
  }
  gainAuthority(v){
    this.res.authority += v;
    if(this.res.authority > this.res.maxAuthority)
      this.res.authority = this.res.maxAuthority;
  }
  loseAuthority(v){
    if(v > this.res.authority) return false;
    this.res.authority -= v;
    return true;
  }

  reset(){
    this.res.actions = 0;
    this.res.moves = 0;
    this.res.energy = [0, 0, 0, 0, 0, 0];
    this.res.authority = 0;
  }
}
