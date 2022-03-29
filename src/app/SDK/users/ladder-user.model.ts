import { User } from "./user.model"

export class LadderUser extends User{

    position: number
    isMyself: boolean

    constructor(
        userID: string, 
        firstName: string, 
        surname: string, 
        username: string, 
        picture: string, 
        position: number,
        isMyself: boolean
    )
    {
        super(userID, firstName, surname, username, picture)
        this.position = position
        this.isMyself = isMyself
    }
    
    
}