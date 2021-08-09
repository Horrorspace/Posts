/* declare module '@core/*' {
    export const postKeys: string[];
    export const types: string[];
    export function postCheck(post: Object): boolean;
};
declare module '@react/*';
declare module '@redux/*'; */

declare module '@core' {
    export interface IPost {
        id: number;
        title: string;
        body: string;
    }

    export interface IPostData extends IPost {
        userId: number;
    }

    export interface IPostInstance {
        getId(): number;
        getTitle(): string;
        getBody(): string;
        setTitle(title: string): void;
        setBody(body: string): void;
    }

    export interface IPosts {
        checkId(id: number): boolean;
        getAllPosts(): IPostInstance[];
        getPostById(id: number): IPostInstance;
        getPostByNumber(num: number): IPostInstance;
        addPost(Post: IPostInstance): void;
        editPost(Post: IPostInstance): void;
        removePostById(id: number): void;
    }
};
