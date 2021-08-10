import userData from '@core/classes/userData'
import { IPost, IPostInstance, IPostData } from '@core/interfaces/IPost'


export default class Post extends userData implements IPostInstance {
    private title: string;
    private body: string;

    constructor({id, title, body, userId}: IPostData) {
        super({id, userId});
        this.title = title;
        this.body = body;
    }

    public getTitle(): string {
        return this.title
    }
    public getBody(): string {
        return this.body
    }

    public setTitle(title: string): void {
        this.title = title
    }
    public setBody(body: string): void {
        this.body = body
    }
} 