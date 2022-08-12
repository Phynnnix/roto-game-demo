class Tile extends Model{
  constructor(){
    super();
    this.type = -1;
    this.diggable = false;
  }
}

class EmptyTile extends Tile{
  constructor(){
    super();
    this.type = TileController.EMPTY;
  }
}

class RockTile extends Tile{
  constructor(g){
    super();
    this.type = TileController.ROCK;
    this.diggable = true;

    this.gold = g;
  }
}

class RoomTile extends Tile{
  constructor(type){
    super();
    this.type = type
    this.owner = 0;
  }
}
