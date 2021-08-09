export default abstract class userData {
    protected id: number
    
    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id
    }
}