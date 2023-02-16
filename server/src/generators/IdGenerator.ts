export class IdGenerator {

    private currentId = 0;

    getNext() {
        this.currentId++;
        return this.currentId;
    }

}