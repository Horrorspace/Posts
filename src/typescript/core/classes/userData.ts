import { IId } from '@core/interfaces/IPost'

export default abstract class userData {
    protected id: number;
    protected userId: number;
    
    constructor({id, userId}: IId) {
        this.id = id;
        this.userId = userId;
    }

    public getId(): number {
        return this.id
    }
    public getUserId(): number {
        return this.userId
    }
}