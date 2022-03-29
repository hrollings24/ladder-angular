import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { throwError } from "rxjs";
import { Ladder } from "../ladders/ladder.model";
import { LadderUser } from "./ladder-user.model";
import { MainUser } from "./main-user.model";

@Injectable()
export class LadderUserService{

    constructor(
        public afs: AngularFirestore
    )
    { }

    public GetLadderUserByReference(reference: DocumentReference, mainUserId: string, position: number): Promise<LadderUser>
    {
        return new Promise<LadderUser>((resolve) => {
            reference.get()
            .then((result) => {
                if (result != null) 
                {
                    const isMyself = reference.id == mainUserId
                    try{
                        resolve(new LadderUser(
                            reference.id, 
                            result.data()!["firstName"], 
                            result.data()!["surname"], 
                            result.data()!["username"], 
                            result.data()!["picture"], 
                            position, 
                            isMyself
                            )
                        )
                    }
                    catch{
                        throwError(() => new Error('User data is invalid'))
                    }  
                }
                throwError(() => new Error('Could not get user data'))
            }).catch((error) => {
                throwError(() => new Error(error))
            })
        })
    }
}