export abstract class User{
    userID: string
    firstName: string
    surname: string
    username: string
    picture: string


    constructor(userID: string, firstName: string, surname: string, username: string, picture: string){
        this.userID = userID
        this.firstName = firstName
        this.surname = surname
        this.username = username
        this.picture = picture
    }

    public GetFullName(): string{
        return this.firstName + " " + this.surname
    }
    
}