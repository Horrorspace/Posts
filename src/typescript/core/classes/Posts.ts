import { IPostInstance, IPosts } from '@core/interfaces/IPost'


export default class Posts implements IPosts {
    private posts: IPostInstance[]

    constructor() {
        this.posts = []
    }

    public checkId(id: number): boolean {
        return this.posts.filter(post => post.getId() === id).length > 0
    }
    public checkUserId(userId: number): boolean {
        return this.posts.filter(post => post.getUserId() === userId).length > 0
    }
    public getAllPosts(): IPostInstance[] {
        return this.posts
    } 
    public getPostById(id: number): IPostInstance {
        if(this.checkId(id)) {
            return this.posts.filter(post => post.getId() === id)[0]
        }
        else {
            throw 'post with this id is not exist'
        }
    } 
    public getPostByNumber(num: number): IPostInstance {
        if(this.posts.length < num + 1) {
            return this.posts[num]
        }
        else {
            throw 'post with this number is not exist'
        }
    }
    public getPostsByUserId(userId: number): IPostInstance[] {
        if(this.checkUserId(userId)) {
            return this.posts.filter(post => post.getUserId() === userId)
        }
        else {
            throw 'user with this id is not exist'
        }
    } 
    public addPost(Post: IPostInstance): void {
        if(!this.checkId(Post.getId())) {
            this.posts = [...this.posts, Post]
        }
        else {
            throw 'post id is not unique'
        }
    } 
    public editPost(Post: IPostInstance): void {
        if(this.checkId(Post.getId())) {
            const i: number = this.posts.indexOf(Post);
            this.posts = [...this.posts.slice(0, i), Post, ...this.posts.slice(i + 1)]
        }
        else {
            throw 'post with this id is not exist'
        }
    } 
    public removePostById(id: number): void {
        if(this.checkId(id)) {
            const Post: IPostInstance = this.getPostById(id);
            const i: number = this.posts.indexOf(Post);
            this.posts = [...this.posts.slice(0, i), ...this.posts.slice(i + 1)]
        }
        else {
            throw 'post with this id is not exist'
        }
    } 
}