
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateMessageInput {
    content: string;
    authorId: number;
}

export class UpdateMessageInput {
    id: string;
    content: string;
}

export class CreateUserInput {
    email: string;
    name?: Nullable<string>;
}

export class UpdateUserInput {
    id: number;
    email: string;
    name?: Nullable<string>;
}

export class Message {
    id: string;
    authorId: number;
    content?: Nullable<string>;
    user: User;
}

export abstract class IQuery {
    abstract messages(): Message[] | Promise<Message[]>;

    abstract message(user_id: string): Message[] | Promise<Message[]>;

    abstract user(id: number): User | Promise<User>;

    abstract users(): User[] | Promise<User[]>;

    abstract userMessages(id: number): Nullable<Message>[] | Promise<Nullable<Message>[]>;
}

export abstract class IMutation {
    abstract createMessage(input?: Nullable<CreateMessageInput>): Message | Promise<Message>;

    abstract updateMessage(input?: Nullable<UpdateMessageInput>): Nullable<Message> | Promise<Nullable<Message>>;

    abstract removeMessage(id: string): Nullable<Message> | Promise<Nullable<Message>>;

    abstract createUser(input?: Nullable<CreateUserInput>): User | Promise<User>;

    abstract updateUser(input?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: number;
    email: string;
    name?: Nullable<string>;
    posts: Message[];
}

type Nullable<T> = T | null;
