export interface IPostBody {
    title: string;
    body: string;
}

export interface IPostId {
    id: number;
}

export interface IPostUserId {
    userId: number;
}

export interface IPost extends IPostId, IPostBody {}
export interface IPostData extends IPost, IPostUserId {}
export interface INewPost extends IPostBody, IPostUserId {}
export interface IId extends IPostId, IPostUserId {}

export interface IPostInstance {
    getId(): number;
    getTitle(): string;
    getBody(): string;
    getUserId(): number;
    setTitle(title: string): void;
    setBody(body: string): void;
}

export interface IPosts {
    checkId(id: number): boolean;
    checkUserId(userId: number): boolean;
    getAllPosts(): IPostInstance[];
    getPostById(id: number): IPostInstance;
    getPostByNumber(num: number): IPostInstance;
    getPostsByUserId(userId: number): IPostInstance[];
    addPost(Post: IPostInstance): void;
    editPost(Post: IPostInstance): void;
    removePostById(id: number): void;
}