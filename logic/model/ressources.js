class Ressources{
  constructor(){
    this.health = 5;
    this.strength = 1;
    this.range = 0;

    this.mana = 0;
    this.gold = 0;
    this.exp = 0;
    this.ores = [];

    this.actions = 0;
    this.moves = 0;
    this.energies = [0, 0, 0, 0, 0, 0];
    this.authority = 0;

    this.limit = 0;
  }

  get maxMana(){
    return 4 + this.limit * 5;
  }

  get maxAuthority(){
    return 9 + this.limit * 10;
  }
}
