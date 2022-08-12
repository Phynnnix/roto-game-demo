class PlayfieldView extends View{
    constructor(parent){
        super();
        let fieldSpace = document.createElement("div");
        this.elem.appendChild(fieldSpace);
        fieldSpace.classList.add("playfield-field-container");
        this.scale = 1;
        this.elem.onwheel = (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            if (ev.deltaY < 0) {
                this.zoom(1.05);
            }
            else {
                this.zoom(1.0 / 1.05);
            }
        };
        this.newSpaceFor("field", fieldSpace);
        this.showOn(parent);
    }

    zoom(factor){
        let x = this.scrollStepX;
        let y = this.scrollStepY;
        this.scale = Math.min(Math.max(1.0/5.0, this.scale*factor), 2);
        let fieldSpace = this.getSpaceFor("field");
        fieldSpace.style.height = `calc(${this.scale} * 3000px)`;
        fieldSpace.style.width = `calc(${this.scale} * 3000px)`;
        this.scrollToStep(x,y, false);
    }

    get scrollStepX(){
        let stepX = Math.ceil(this.getSpaceFor("field").clientWidth / game.playfield.nDim);
        let x = Math.floor(this.elem.scrollLeft / stepX);
        return x;
    }

    get scrollStepY(){
        let stepY = Math.ceil(this.getSpaceFor("field").clientHeight / game.playfield.mDim);
        let y = Math.floor(this.elem.scrollTop / stepY);
        return y;

    }

    scrollToStep(x,y, smooth = true){
        let stepX = Math.ceil(this.getSpaceFor("field").clientWidth / game.playfield.nDim);
        let stepY = Math.ceil(this.getSpaceFor("field").clientHeight / game.playfield.mDim);
        this.elem.scrollTo({
            top: Math.min(this.elem.scrollTopMax, Math.max(y * stepY, 0)),
            left: Math.min(this.elem.scrollLeftMax, Math.max(x * stepX, 0)),
            behavior: (smooth?'smooth':'instant')
          });
        //this.elem.scrollLeft = Math.min(this.elem.scrollLeftMax, Math.max(x * stepX, 0));
        //this.elem.scrollTop = Math.min(this.elem.scrollTopMax, Math.max(y * stepY, 0));
    }

    scrollSteps(dx, dy){
        let x = this.scrollStepX + dx;
        let y = this.scrollStepY + dy;
        this.scrollToStep(x,y);
    }
}