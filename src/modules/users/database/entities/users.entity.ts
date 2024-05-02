export class User {
    public _id: string;

    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public country: string;

    public createdAt: Date | number;
    public updatedAt: Date | number;

    constructor(data?: Partial<User>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}