const url: string = 'https://jsonplaceholder.typicode.com/posts';

export function downloadPosts(): Promise<IPosts> {
    return new Promise(resolve => {
        const posts: IPosts = new Posts();
        const data$ = ajax.getJSON(url).pipe(
            switchMap((val: any) => from(val)),
            filter((val: any) => typeof(val) === 'object'),
            filter((val: any) => postCheck(val)),
            map((val: IPostData): IPostInstance => new Post(val))
        );
        const sub: Subscription = data$.subscribe({
            next: (val: IPostInstance) => {
                posts.addPost(val);
            },
            complete: () => {
                resolve(posts)
            }
        });
    })
}
