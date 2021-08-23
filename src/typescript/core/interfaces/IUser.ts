export interface IUser {
    email: string;
    password: string;
}

export interface IUserId {
    userId: number;
}

export interface IToken {
    token: string;
}

export interface ILoginUser extends IUser, IUserId {}

export interface ILoginRes extends IUserId, IToken {}