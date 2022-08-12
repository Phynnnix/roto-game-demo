class PriorityQueue {
  constructor(pfc){
    this.queue = [];
    this.positions = {};
    this.pfc = pfc;
  }

  isEmpty(){
    return this.queue.length == 0;
  }

  dequeue(){
    let de = this.queue.pop();
    delete this.positions[this.pfc.serialPosition(de)];
    return de[0];
  }

  contains(node){
    return this.pfc.serialPosition(node) in this.positions;
  }

  enqueue(node, distance) {
    this.positions[this.pfc.serialPosition(node)] = this.queue.length;
    this.queue.push([node, distance]);
    if(this.queue.length == 1) return;
    let i = this.queue.length - 1;
    this.siftDown(i, distance);
    return;
  }

  update(node, distance) {
    let i = this.positions[this.pfc.serialPosition(node)];
    if(this.queue[i-1][1] < distance){
      this.siftDown(i, distance);
    }else if(this.queue[i+1][1] > distance){
      this.siftUp(i, distance);
    }
  }

  siftDown(i, distance) {
    let j = i - 1;
    while (j >= 0 && this.queue[j][1] < distance){
      this.swap(i,j);
      i--;
      j--;
    }
  }

  siftUp(i, distance) {
    let j = i + 1;
    while (j < this.queue.length && this.queue[j][1] > distance){
      this.swap(i,j);
      i++;
      j++;
    }
  }

  swap(i, j) {
    let pi = this.pfc.serialPosition(this.queue[i]);
    let pj = this.pfc.serialPosition(this.queue[j]);
    [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
    [this.positions[pi], this.positions[pj]] = [j,i];
  }
}
