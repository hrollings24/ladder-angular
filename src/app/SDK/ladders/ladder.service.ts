//get a single ladder by documentreference

import { Injectable } from "@angular/core";
import { DocumentReference } from "@angular/fire/compat/firestore";
import { mixinTabIndex } from "@angular/material/core";
import { Observable, throwError } from "rxjs";
import { MainUser } from "../users/main-user.model";
import { Ladder } from "./ladder.model";

@Injectable()
export class LadderService{

    public GetLadderByReference(reference: DocumentReference): Promise<Ladder>
    {
        return new Promise<Ladder>((resolve) => {
            reference.get()
            .then((result) => {
                if (result != null) 
                {
                    try{
                        resolve(new Ladder(
                            result.ref, 
                            result.data()!["name"],
                            result.data()!["jump"],
                            result.data()!["description"],
                            result.data()!["permission"],
                            result.data()!["requests"],
                            result.data()!["admins"],
                            result.data()!["positions"],
                            result.data()!["url"]
                        ))
                    }
                    catch{
                        throwError(() => new Error('Ladder data is invalid'))
                    }  
                }
                throwError(() => new Error('Could not get ladder data'))
            }).catch((error) => {
                throwError(() => new Error(error))
            })
        })
    }

    public GetLaddersByReferences(references: Array<DocumentReference>): Observable<Ladder>
    {
        return new Observable<Ladder>((observer) => {
            var amountResolved = 0
            references.forEach(ref => {
                this.GetLadderByReference(ref)
                .then((result) => {
                    amountResolved++
                    observer.next(result)
                    if (amountResolved == references.length)
                    {
                        observer.complete()
                    }
                })
                .catch((error) => { 
                    amountResolved++
                    observer.error(() => new Error(error))
                })
            })
        })
    }

    public SetMainUserPosition(ladder: Ladder, mainUser: MainUser)
    {
        ladder.positions.forEach((player, index) => {
            console.log(index)
            if (player == mainUser.userID)
            {
                ladder.myPosition = index
            }
        });
    }
}