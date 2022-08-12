class FieldOrganizer extends Organizer{
    constructor(){
        super();
    }

    new(){
        let fc = new FieldController();
        this.register(fc);
        return fc;
    }
}