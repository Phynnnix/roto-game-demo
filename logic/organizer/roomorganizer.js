class RoomOrganizer extends Organizer{
    constructor(){
        super();
    }

    new(){
        let fc = new RoomController();
        this.register(fc);
        return fc;
    }
}