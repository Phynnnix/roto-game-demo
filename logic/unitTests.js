function log(name, unexpected){
  console.log("The " + name + " found " + unexpected + " unexpected results.");
  return unexpected;
}

function startTests(){
  unexpected = 0;

  unexpected += log("Model Test", startModelTests());
  unexpected += log("Controller Test", startControllerTests());
  unexpected += log("View Test", startViewTests());

  return unexpected;
}
/**********
MODEL TESTS
**********/
function startModelTests(){
  unexpected = 0;

  unexpected += log("Creature Test", creatureTest());

  return unexpected;
}
/**
Test creature.js
**/
function creatureTest(){
  unexpected = 0;

  c1 = new Creature(1, 0, 1);
  if(c1.count != 1 || c1.owner != 0 || c1.type.nr != 1){
    console.log("Not well defined Creature Behavior on c1");
    unexpected++;
  }

  c2 = new Creature(2, 1, 2);
  if(c2.count != 2 || c2.owner != 1 || c2.type.nr != 2){
    console.log("Not well defined Creature Behavior on c2");
    unexpected++;
  }

  c3 = new Creature(3, 0, 5);
  if(c3.count != 5 || c3.owner != 0 || c3.type.nr != 3){
    console.log("Not well defined Creature Behavior on c3");
    unexpected++;
  }

  return unexpected;
}

/***************
CONTROLLER TESTS
***************/
function startControllerTests(){
  unexpected = 0;

  unexpected += log("Field Controller Test", startFieldControllerTest());
  unexpected += log("Playfield Controller Test", startPlayfieldControllerTest());

  return unexpected;
}

function startFieldControllerTest(){
  let unexpected = 0;
  let step = "";
  let field1, field2, field3, field4, fieldE, fieldG, creature1, creature2, creatureSOT, creatureOOT, creatureSOOT, tile1, tile2, tile3;
  try{
    step = "generate Fields";
    let generator = FieldController.generator();
    field1 = generator.base(0,0,0);
    field2 = generator.base(3,7,2);
    field3 = generator.base(6,4,10);
    field4 = generator.pillar(3,5);
    fieldE = generator.base(1,1,1);
    fieldG = generator.base(2,2,2);
    step = "generate creatures";
    creature1 = {owner: 0,type:{nr:1,name:"x"},get c(){return this},equals(o){return this===o || this===o.c},appendTo(l){l.push(this);},hasSameType(o){return this.equals(o)},hasSameOwner(o){return this.equals(o)},canMoveThroughRock:()=>{return false}};
    creature2 = {owner: 1,type:{nr:2,name:"y"},get c(){return this},equals(o){return this===o || this===o.c},appendTo(l){l.push(this);},hasSameType(o){return this.equals(o)},hasSameOwner(o){return this.equals(o)},canMoveThroughRock:()=>{return true}};
    creatureSOT = {owner: 0,type:{nr:1,name:"x"},get c(){return this},equals(o){return this===o || this===o.c},appendTo(l){l.push(this);},hasSameType(o){return true},hasSameOwner(o){return true},canMoveThroughRock:()=>{return false}};
    creatureOOT = {owner: 2,type:{nr:3,name:"z"},get c(){return this},equals(o){return this===o || this===o.c},appendTo(l){l.push(this);},hasSameType(o){return false},hasSameOwner(o){return false},canMoveThroughRock:()=>{return false}};
    creatureSOOT = {owner: 0,type:{nr:3,name:"z"},get c(){return this},equals(o){return this===o || this===o.c},appendTo(l){l.push(this);},hasSameType(o){return false},hasSameOwner(o){return true},canMoveThroughRock:()=>{return false}};
    step = "generate tiles";
    tile1 = {type:{nr:9,name:"Rock"}, diggable: true, isType(t){return t==this.type.name||t==this.type.nr}, isEmpty:()=>{return false}, isGoldRockTile(){return false}, gold: 0};
    tile2 = {type:{nr:1,name:"Dorm"}, diggable: false, isType(t){return t==this.type.name||t==this.type.nr||t=="Room"||t==7}, isEmpty:()=>{return false}};
    tile3 = {type:{nr:4,name:"Library"}, diggable: false, isType(t){return t==this.type.name||t==this.type.nr||t=="Room"||t==7}, isEmpty:()=>{return false}};
  }catch(e){
    console.log("Error While Constructing (FieldControllerTest): "+e.message);
    unexpected++;
    return unexpected;
  }
  step = "place tiles wrongly";
  if(field1.placeTile(tile1)){unexpected++; console.log("can place tile1 on field1, unexpectedly.");}
  if(field2.placeTile(tile1)){unexpected++; console.log("can place tile1 on field2, unexpectedly.");}
  if(field3.placeTile(tile2)){unexpected++; console.log("can place tile2 on field3, unexpectedly.");}
  if(field4.placeTile(tile3)){unexpected++; console.log("can place tile3 on field4, unexpectedly.");}
  if(field4.removeTile()){unexpected++; console.log("can remove tile from pillar (field4)");}
  try{
    step = "concat fields";
    field1.r = field2;
    field1.b = field3;
    field2.l = field1;
    field2.b = field4;
    field3.r = field4;
    field3.t = field1;
    field4.l = field3;
    field4.t = field2;

    step = "remove tiles";
    field1.removeTile();
    field2.removeTile();
    field3.removeTile();
    fieldE.removeTile();

    step = "place tiles";
    field1.placeTile(tile1);
    field2.placeTile(tile2);
    field3.placeTile(tile3);

    step = "place creatures";
    field2.addCreature(creature1);
    field3.addCreature(creature2);
  }catch(e){
    console.log("Error while preparation of fields: "+e.message);
    unexpected++;
    return unexpected;
  }
  try{
    step = "test emptyness";
    if(!fieldE.isEmpty()){unexpected++; console.log("empty field not empty (fieldE)");}
    if(field1.isEmpty()){unexpected++; console.log("non empty (Rock) field empty (field1)");}
    if(field4.isEmpty()){unexpected++; console.log("non empty (pillar) field empty (field4)");}
    step = "test pillarness";
    if(field1.isPillar()){unexpected++; console.log("non Pillar is pillar (field1)");}
    if(!field4.isPillar()){unexpected++; console.log("Pillar is not pillar (field4)");}

    step = "test isType";
    if(!field1.isType(9)){unexpected++; console.log("Rock has not type 9 (field1)");}
    if(field1.isType(8)){unexpected++; console.log("Rock has type 8 (field1)");}
    if(!field2.isType(1)){unexpected++; console.log("Dorm has not type 1 (field2)");}
    if(field2.isType(2)){unexpected++; console.log("Dorm has type 2 (field2)");}
    if(!field3.isType(4)){unexpected++; console.log("Library has not type 4 (field3)");}
    if(field3.isType(3)){unexpected++; console.log("Library has type 3 (field3)");}
    if(field4.isType(1)){unexpected++; console.log("Pillar has type (field4)");}

    step = "test equals";
    if(!field1.equals(field1)){unexpected++; console.log("field1 doesnt equal field1");}
    if(field1.equals(field2)){unexpected++; console.log("field2 does equal field1");}

    step = "test concat";
    if(!field1.r.equals(field2)){unexpected++; console.log("field2 isnt right of field1");}
    if(!field2.l.equals(field1)){unexpected++; console.log("field1 isnt left of field2");}
    if(!field3.t.equals(field1)){unexpected++; console.log("field1 isnt above field3");}
    if(!field1.b.equals(field3)){unexpected++; console.log("field3 isnt below field1");}

    if(!field1.t.isOutside()){unexpected++; console.log("above field1 isnt outside");}

    step = "test values & hasGold";
    if(!(field1.n == 0 && field1.m == 0 && field1.gold == 0)){unexpected++; console.log("field1 doesn't reflect correct values");}
    if(field1.hasGold()){unexpected++; console.log("field1 has gold");}
    if(field4.hasGold()){unexpected++; console.log("field4 (pillar) has gold");}
    if(!fieldG.hasGold()){unexpected++; console.log("fieldG hasn't gold");}

    step = "test placing & removal of creatures";
    if(!field2.holdsCreature(creature1)){unexpected++; console.log("field2 doesnt hold creature1");}
    if(!field3.holdsCreature(creature2)){unexpected++; console.log("field3 doesnt hold creature2");}
    if(!field2.removeCreature(creature1)){unexpected++; console.log("field2 couldnt remove creature1");}
    if(field2.holdsCreature(creature1)){unexpected++; console.log("field2 still holds creature1 (after first remove)");}
    if(field2.removeCreature(creature1)){unexpected++; console.log("field2 could remove creature1 twice");}
    if(field2.holdsCreature(creature1)){unexpected++; console.log("field2 still holds creature1 (after second remove)");}
    if(!field2.addCreature(creature1)){unexpected++; console.log("field2 can't add creature1");}
    if(!field2.holdsCreature(creature1)){unexpected++; console.log("field2 doesnt hold creature1 (after re-adding)");}

    step = "test canStayOn";
    if(field2.canStayOn(creatureSOOT)){unexpected++; console.log("creature with same owner but other type may stay");}
    if(!field2.canStayOn(creatureSOT)){unexpected++; console.log("creature with same owner and type may not stay");}
    if(!field2.canStayOn(creatureOOT)){unexpected++; console.log("creature with other owner and type may not stay");}
    step = "test canTraverse";
    if(!field2.canTraverse(creatureSOOT)){unexpected++; console.log("creature with same owner but other type may not traverse");}
    if(!field2.canTraverse(creatureSOT)){unexpected++; console.log("creature with same owner and type may not traverse");}
    if(field2.canTraverse(creatureOOT)){unexpected++; console.log("creature with other owner and type may traverse");}

    step = "test warfield";
    if(!field2.addCreature(creatureOOT)){unexpected++; console.log("cant add opposing creature");}
    if(!field2.isWarField()){unexpected++; console.log("field2 isnt warfield after adding opposing creature");}
    if(field2.canStayOn(creatureSOT)){unexpected++; console.log("creature may stay on Warfield");}
    if(field2.canTraverse(creatureSOT)){unexpected++; console.log("creature may traverse Warfield");}

}catch(e){
    console.log("Error While testing fieldcontroller functions at step '"+step+"': "+e.message);
    unexpected++;
    return unexpected;
  }

  return unexpected;
}

function startPlayfieldControllerTest() {
  let unexpected = 0;
  let playfieldModel, playfield;
  let src, trg, path1, path2, sPath, shPath;
  let minion, horror;
  try{
    playfieldModel = new Playfield(31,31);
    playfield = new PlayfieldController(playfieldModel, null);
    minion = new CreatureController(new Creature("Minion", 1, 1));
    horror = new CreatureController(new Creature("Horror", 1, 1));
  }catch(e){
    console.log("Error While Constructing (PlayfieldControllerTest): "+e.message);
    unexpected++;
    return unexpected;
  }
  try{
    playfield.generate();
  }catch(e){
    console.log("Playfield Generation Error: "+e.message);
    unexpected++;
  }
  try{
    for (let dm = 1; dm < 5; dm++) {
      for (let dn = 1; dn < 5; dn++) {
        for (let m = 0; m < (playfield.mDim - dm); m++) {
          for (let n = 0; n < (playfield.nDim - dn); n++) {
            if(!playfield.findField(n+dn,m+dm).equals(playfield.findField(n,m).rN(dn).bN(dm))){
              console.log("Fields aren't appropriately distanced ("+n+","+m+")+("+dn+","+dm+")=|=("+(n+dn)+","+(m+dm)+")");
              unexpected++;
            }
          }
        }
      }
    }
        
    if(!playfield.findField(28,28).isType("Rock")){
      console.log("Field isn't initialized as Rock after generation.");
      unexpected++;
    }
    if(!playfield.findField(0,0).l.isOutside() ||
      !playfield.findField(0,0).t.isOutside() ||
      !playfield.findField(30,0).r.isOutside() ||
      !playfield.findField(30,0).t.isOutside() ||
      !playfield.findField(0,30).l.isOutside() ||
      !playfield.findField(0,30).b.isOutside() ||
      !playfield.findField(30,30).r.isOutside() ||
      !playfield.findField(30,30).b.isOutside()
        ){
      console.log("Boundaries aren't corectly set after generation.");
    }
  }catch(e){
    console.log("Error occured while testing generation: "+e.message);
    console.error(e);
    unexpected++;
  }
  try{
    src = playfield.findField(3, 3);
    trg = playfield.findField(5, 2);
    path1 = [src, src.l, src.lN(2),
      src.lN(2).t, src.lN(2).tN(2), src.lN(2).tN(2).r,
      src.lN(2).tN(2).r.t, src.lN(2).tN(2).r.t.r, src.lN(2).tN(2).r.t.rN(2),
      src.lN(2).tN(2).r.t.rN(3), src.lN(2).tN(2).r.t.rN(3).b, trg]; // n=5, m=1, 12
    path2 = [src, src.b, src.b.r, src.b.rN(2),
      src.b.rN(3), src.b.rN(4), src.b.rN(5), src.b.rN(6),
      src.b.rN(7), src.b.rN(7).t, src.b.rN(7).tN(2),
      src.b.rN(7).tN(2).l, src.b.rN(7).tN(2).lN(2),
      src.b.rN(7).tN(2).lN(3), src.b.rN(7).tN(2).lN(4), trg]; // 16
    for (var i = 0; i < path1.length - 1; i++) {
      path1[i].removeTile();
    }
    for (var i = 1; i < path2.length; i++) {
      path2[i].removeTile();
    }
    sPath = playfield.aStar(src, trg, minion);
    shPath = playfield.aStar(src, trg, horror);
  }catch(e){
    console.log("Error While Calculating A*: "+e.message);
    unexpected++;
  }
  try{
    if(sPath[0] !== src){console.log("A* Path doesn't begin with src."); unexpected++;}
    if(sPath[sPath.length-1] !== trg){console.log("A* Path doesn't end with trg."); unexpected++;}
    if(path1.length != sPath.length){console.log("A* Path doesn't have right size"); unexpected++;}
    else{
      for (var i = 0; i < sPath.length; i++) {
        if(sPath[i] !== path1[i]){console.log("A* Path doesn't equal correct Path ("+i+")"); unexpected++;}
      }
    }
    if(shPath[0] !== src){console.log("A* Horror Path doesn't begin with src."); unexpected++;}
    if(shPath[shPath.length-1] !== trg){console.log("A* Horror Path doesn't end with trg."); unexpected++;}
    if(path1.length >= shPath.length){console.log("A* Horror Path doesn't have right size"); unexpected++;}
  }catch(e){
    console.log("Error While Testing A*: "+e.message);
    unexpected++;
  }
  return unexpected;
}

function startRessourcesControllerTest(){
  let unexpected = 0;

  try{
    let rc = new RessourcesController(new Ressources());
  }catch(e){
    console.log("Error while Constructing (RessourcesControllerTest): "+e.message);
    unexpected++;
  }
  try{

  }catch(e){
    console.log("Something went wrong (RessourcesControllerTest): "+e.message);
    unexpected++;
  }

  return unexpected;
}

/*********
VIEW TESTS
*********/
let fieldtest_playfield, fieldtest_flex, fieldtest_fields;
function startViewTests(){
  unexpected = 0;
  startFieldViewTest();

  return unexpected;
}

function startFieldViewTest(){
  let testsize = 31;
  let generator = FieldController.generator();
  fieldtest_playfield = document.createElement("div");
  fieldtest_playfield.classList.add("playfield");
  fieldtest_flex = document.createElement("div");
  fieldtest_flex.classList.add("playfield-field-container");
  fieldtest_flex.style.gridTamplateColumns = "repeat("+testsize+", 1fr)";
  fieldtest_flex.style.gridTamplateRows = "repeat("+testsize+", 1fr)";
  fieldtest_playfield.appendChild(fieldtest_flex);
  fieldtest_fields = [];
  for (var i = 0; i < testsize; i++) {
    for (var j = 0; j < testsize; j++) {
      let mi = Math.abs((i-15))-7;
      let mj = Math.abs((j-15))-7;
      let gold = (2-(i+1)%3)*(2-(j+1)%3) * Math.max(Math.ceil((-1 * (mi * mi) - (mj * mj) + 28) / 4) - 1, 0);
      let f = generator.base(j,i,gold);
      let fv = f.node();
      fv.title = "Gold: "+f.gold+"; n: "+f.n+"; m: "+f.m+"; type: "+f.type;
      fieldtest_flex.appendChild(fv);
      fieldtest_fields.push(f);
    }
  }
}
function displayFieldViewTest(){
  document.body.appendChild(fieldtest_playfield);
}
function hideFieldViewTest(){
  document.body.removeChild(fieldtest_playfield);
}


/**********
Misc Tests
**********/
function visualizePlayfieldASCII(pf, path = null){
  let lines = [" "];
  let current = pf.fields;
  let linestart = pf.fields;
  let done = false;
  let line = false;
  while(!done){
    lines.push("");
    if(linestart.b.isOutside()){
      lines.push(" ");
      done = true;}
    while(!line){
      if(current.t.isOutside()){lines[current.m] += "o"}
      if(current.l.isOutside()){lines[current.m+1] += "o"}
      if(current.b.isOutside()){lines[current.m+2] += "o"}
      if(path !== null && path.includes(current)){
        if(current === path[0]){lines[current.m+1] += "S"}
        else if(current === path[path.length-1]){lines[current.m+1] += "T"}
        else if(path[path.indexOf(current) + 1] === current.l){lines[current.m+1] += "<"}
        else if(path[path.indexOf(current) + 1] === current.t){lines[current.m+1] += "^"}
        else if(path[path.indexOf(current) + 1] === current.r){lines[current.m+1] += ">"}
        else {lines[current.m+1] += "v"}
      }
      else if(current.isPillar()){lines[current.m+1] += "X"}
      else if(current.isType("Rock")){lines[current.m+1] += "+"}
      else{lines[current.m+1] += " "}
      if(current.r.isOutside()){
        lines[current.m+1] += "o";
        line = true;
      }
      current = current.r;
    }
    line = false;
    linestart = linestart.b;
    current = linestart;
  }
  let ASCIIfield = "";
  for (var i = 0; i < lines.length; i++) {
    ASCIIfield += lines[i] + "\n";
  }
  console.log(ASCIIfield);
}
