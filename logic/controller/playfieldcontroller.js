class PlayfieldController extends Controller{
  constructor(){
    super();
  }

  generate(n,m){
    let entry = game.fieldorga.new().generate(FieldController.BASE, 0, 0);
    this.model = new Playfield(n,m);

    for (var m = 0; m < this.model.mDim; m++) {
      for (var n = 0; n < this.model.nDim; n++) {
        if(n != 0 || m != 0){
          let nf = null;
          if((n+1) % ((this.model.nDim+1)/4) == 0 && (m+1) % ((this.model.mDim+1)/4) == 0){
            nf = game.fieldorga.new().generate(FieldController.PILLAR, n,m);
          }
          else nf = game.fieldorga.new().generate(FieldController.BASE, n,m);;
          if(m > 0) FieldController.pairAdj(nf, FieldController.findDisplacedField(entry, n, m-1));
          if(n > 0) FieldController.pairAdj(nf, FieldController.findDisplacedField(entry, n-1, m));
        }
      }
    }
    this.setFieldNetwork(entry);
    return this;
  }

  load(){
    this.generate(); //TODO: load from DB

  }

  setupView(parent){
    this.view = new PlayfieldView(parent);
    for (var m = 0; m < this.model.mDim; m++) {
      for (var n = 0; n < this.model.nDim; n++) {
        let current = this.findField(n, m);
        current.setupView(this.view.getSpaceFor("field"));
      }
    }
  }

  get supportField(){
    return game.fieldorga.getElement(this.model.support);
  }

  set supportField(field){
    this.model.support = field.id;
  }

  get nDim(){
    return this.model.nDim;
  }
  get mDim(){
    return this.model.mDim;
  }

  setFieldNetwork(net){
    this.supportField = FieldController.findDisplacedField(net, Math.ceil(this.model.nDim/2)-net.n, Math.ceil(this.model.mDim/2)-net.m);
  }

  getSerialAt(n, m){
    return this.model.nDim * m + n;
  }

  serialPosition(f){
    return this.getSerialAt(f.n, f.m);
  }

  getFieldAtSerial(serial){
    let n = serial % this.model.nDim;
    let m = (serial - n) / this.model.nDim;
    return this.findField(n, m);
  }

  findField(n, m){
    let sup = this.supportField;
    return FieldController.findDisplacedField(sup, n-sup.n, m-sup.m);
  }

  findFieldRect(n1, m1, n2, m2){
    let nLeft = n1;
    let nRight = n2;
    if(n1 > n2){
      nLeft = n2;
      nRight = n1;
    }
    let mTop = m1;
    let mBottom = m2;
    if(m1 > m2){
      mTop = m2;
      mBottom = m1
    }
    let rect = [];
    for(var n = nLeft; n <= nRight; n++){
      for (let m = mTop; m <= mBottom; m++) {
        rect.push(this.findField(n,m).id);
      }
    }
    return rect;
  }

  hasConnectionToThrone(field, lord){
    return true;
  }

  isAdjacentToThrone(field, lord){
    return true;
  }

  aStar(source, target, creature){
    let predecessors = {};
    let distances = {};
    let openList = new PriorityQueue(this);
    let closedList = {};
    let heuristic = (node) => {
      return Math.sqrt(Math.pow(node.n-target.n,2) + Math.pow(node.m-target.m, 2));
    }
    let getg = (node) => {return distances[this.serialPosition(node)];}
    let setg = (node, g) => {distances[this.serialPosition(node)] = g;}
    let getpre = (node) => {return predecessors[this.serialPosition(node)];}
    let setpre = (node, pre) => {predecessors[this.serialPosition(node)] = pre;}
    let close = (node) => {closedList[this.serialPosition(node)] = node;}
    let isClosed = (node) => {return this.serialPosition(node) in closedList;}
    let expand = (cur) => {
      let successors = [];
      if(cur.l.canTraverse(creature)){successors.push(cur.l);}
      if(cur.t.canTraverse(creature)){successors.push(cur.t);}
      if(cur.r.canTraverse(creature)){successors.push(cur.r);}
      if(cur.b.canTraverse(creature)){successors.push(cur.b);}
      for (var successor of successors) {
        if(successor in closedList) continue;
        let tg = getg(cur) + 1;
        if(openList.contains(successor) && tg > getg(successor)) continue;
        setpre(successor, cur);
        setg(successor, tg);
        let f = tg + heuristic(successor);
        if(openList.contains(successor)){openList.update(successor, f);}
        else{openList.enqueue(successor, f);}
      }
    }
    openList.enqueue(source, 0);
    distances[this.serialPosition(source)] = 0;

    while(!openList.isEmpty()){
      let current = openList.dequeue();
      if(current === target){
        let path = [target];
        let pre = target;
        while(pre !== source){
          pre = getpre(pre);
          path.push(pre);
        }
        path = path.reverse();
        return path;
      }
      close(current);
      expand(current);
    }
    return null;
  }
}
