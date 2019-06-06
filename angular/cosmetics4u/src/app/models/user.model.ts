export interface Auth {
    email: string;
    password: string;
}

export class User implements Auth{
    public email: string;
    public password: string;
    public fullName: string;
    public dob: string;
    public gender: string;
    public phoneNo: number;
    public userRole: string;
}

export class Product {
    public id: string;
    public name: string;
    public price: number;
    public description: string;
}

