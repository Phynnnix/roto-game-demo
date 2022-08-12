class View{
  constructor(){
    this.elem = document.createElement("div");
    this.elem.classList.add("view-element");
    this.elem.classList.add(this.constructor.name+"-view");

    this.spaces = {};
  }
  
  showOn(parent){
    parent.append(this.elem);
  }

  htmlNode(){
    return this.elem;
  }

  newSpaceFor(name, node){
    this.spaces[name] = node;
  }

  getSpaceFor(name){
    return this.spaces[name];
  }
}
