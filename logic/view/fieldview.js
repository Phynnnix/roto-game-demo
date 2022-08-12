class FieldView extends View{
  static MOUSEDOWNFIELD = null;
  static MOUSEUPFIELD = null;

  constructor(parent){
    super();
    this.pos = [0,0];
    this.elem.classList.add("field-base");
    let creatureSpace = document.createElement("div");
    let ownerOverlaySpace = document.createElement("div");
    let goldOverlaySpace = document.createElement("div");
    let tileSpace = document.createElement("div");
    this.elem.appendChild(creatureSpace);
    this.elem.appendChild(tileSpace);
    this.elem.appendChild(ownerOverlaySpace);
    this.elem.appendChild(goldOverlaySpace);
    creatureSpace.classList.add("field-creature-container");
    goldOverlaySpace.classList.add("field-gold-overlay");
    ownerOverlaySpace.classList.add("field-owner-overlay");
    tileSpace.classList.add("field-tile-container");
    this.newSpaceFor("creatures", creatureSpace);
    this.newSpaceFor("owner", ownerOverlaySpace);
    this.newSpaceFor("gold", goldOverlaySpace);
    this.newSpaceFor("tile", tileSpace);
    let thisfield = this;

    this.elem.ondrag = (ev)=>{
      ev.preventDefault();
      ev.stopPropagation();
    };
    this.elem.onmouseenter = (ev)=>{
      if(Game.MOUSEDOWN[0]){
        let allFields = document.getElementsByClassName("field-base");
        for(let fld of allFields){
          fld.classList.remove("field-preselected");
        }
        let rect = thisfield.getOtherViewRect(FieldView.MOUSEDOWNFIELD.pos[0], FieldView.MOUSEDOWNFIELD.pos[1], thisfield.pos[0], thisfield.pos[1]);
        rect.forEach(element => {
          element.classList.add("field-preselected");
        });
      }
    }
    this.elem.onmousedown = (ev)=>{
      if(ev.button == 0){
        let allFields = document.getElementsByClassName("field-base");
        for(let fld of allFields){
          fld.classList.remove("field-preselected");
          fld.classList.remove("field-selected");
        }
        FieldView.MOUSEDOWNFIELD = thisfield;
        thisfield.elem.classList.add("field-preselected");
      }
    };
    this.elem.onmouseup = (ev)=>{
      if(ev.button == 0){
        let allFields = document.getElementsByClassName("field-base");
        for(let fld of allFields){
          fld.classList.remove("field-preselected");
          fld.classList.remove("field-selected");
        }
        FieldView.MOUSEUPFIELD = thisfield;
        let rect = thisfield.getOtherViewRect(
          FieldView.MOUSEDOWNFIELD.pos[0], 
          FieldView.MOUSEDOWNFIELD.pos[1], 
          FieldView.MOUSEUPFIELD.pos[0], 
          FieldView.MOUSEUPFIELD.pos[1]
        );
        rect.forEach(element => {
          element.classList.add("field-selected");
        });
        game.context.setBuildRoomContext(
          game.playfield.findFieldRect(
            FieldView.MOUSEDOWNFIELD.pos[0], 
            FieldView.MOUSEDOWNFIELD.pos[1], 
            FieldView.MOUSEUPFIELD.pos[0], 
            FieldView.MOUSEUPFIELD.pos[1]
          )
        );
      }
    };

    this.showOn(parent);
  }

  getOtherView(n,m){
    return document.getElementsByClassName("field-pos-n-"+n+" field-pos-m-"+m)[0];
  }

  getOtherViewRect(n1, m1, n2, m2){
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
        rect.push(this.getOtherView(n,m));
      }
    }
    return rect;
  }

  applyPosition(n,m){
    this.pos = [n,m];
    replaceClassByPrefix(this.elem, "field-pos-n-", n);
    replaceClassByPrefix(this.elem, "field-pos-m-", m);
    this.elem.style.gridColumnSart = n+1;
    this.elem.style.gridColumnEnd = n+1;
    this.elem.style.gridRowSart = m+1;
    this.elem.style.gridRowEnd = m+1;
  }

  applyGold(gold){
    if(gold > 0){
      this.elem.classList.add("gold-field");
    }else{
      this.elem.classList.remove("gold-field");
    }
  }

  applyOwner(owner){
    let ownerOverlaySpace = this.getSpaceFor("owner");
    ownerOverlaySpace.classList.remove("owned-by-1");
    ownerOverlaySpace.classList.remove("owned-by-2");
    ownerOverlaySpace.classList.remove("owned-by-3");
    ownerOverlaySpace.classList.remove("owned-by-4");
    if(owner != 0){
      ownerOverlaySpace.classList.add("owned-by-"+owner);
    }
  }

  applySelection(select){
    if(select){
      this.elem.classList.add("field-selected");
    }else{
      this.elem.classList.remove("field-selected");
    }
  }

}
