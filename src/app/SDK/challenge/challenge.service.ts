import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { Observable, throwError } from "rxjs";
import { LadderUserService } from "../users/ladder-user.service";
import { Challenge } from "./challenge.model";

@Injectable()
export class ChallengeService{

    constructor(
        public ladderUserService: LadderUserService,
        public afs: AngularFirestore
    )
    {}

    public GetChallengeByReference(reference: DocumentReference, mainUserId: string): Promise<Challenge>
    {
        return new Promise<Challenge>((resolve) => {
            reference.get()
            .then((result) => {
                if (result != null) 
                {
                    //GET THE LADDERUSER THAT ISN'T ME
                    var otherUserId = ""
                    if (result.data()!["user1"] == mainUserId)
                    {
                        otherUserId = result.data()!["user2"]
                    }
                    else{
                        otherUserId = result.data()!["user1"]
                    }

                    const otherUserRef: DocumentReference<any> = this.afs.doc(`users/${otherUserId}`).ref
                    this.ladderUserService.GetLadderUserByReference(otherUserRef, mainUserId, -1)
                    .then((ladderUser) => {
                        try{
                            resolve(new Challenge(
                                result.ref, 
                                result.data()!["ladder"],
                                result.data()!["ladderName"],
                                result.data()!["status"],
                                result.data()!["user1"],
                                result.data()!["user2"],
                                result.data()!["winner"],
                                result.data()!["winnerSelectedBy"],
                                ladderUser
                            ))
                        }
                        catch{
                            throwError(() => new Error('Challenge data is invalid'))
                        }  
                    })
                    .catch((error) => { 
                        throwError(() => new Error(error))
                    })
                }
                throwError(() => new Error('Could not get challenge data'))
            }).catch((error) => {
                throwError(() => new Error(error))
            })
        })
    }


    public GetChallengesByReferences(references: Array<DocumentReference>, mainUserId: string): Observable<Challenge>
    {
        return new Observable<Challenge>((observer) => {
            var amountResolved = 0
            references.forEach(ref => {
                this.GetChallengeByReference(ref, mainUserId)
                .then((result) => {
                    amountResolved++
                    observer.next(result)
                    console.log(amountResolved)
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
            if (references.length == 0)
            {
                observer.complete()
            }
        })
    }

    public GetUserFriendlyStatusFor(challenge: Challenge, mainUserId: string)
    {
        if (challenge.status == "ongoing" && challenge.winnerSelectedBy == mainUserId){
            return "Awaiting " + challenge.otherUser.GetFullName() + " to confirm the winner."
        }
        else if (challenge.status == "ongoing" && challenge.winnerSelectedBy != mainUserId)
        {
            return challenge.otherUser.GetFullName() + " has selected a winner! You must confirm the winner to complete the challenge."
        }
        else if (challenge.status == "Awaiting Response" && challenge.user1 == mainUserId)
        {
            return "This challenge is waiting for " + challenge.otherUser.GetFullName() + " to respond."
        }
        else if (challenge.status == "Awaiting Response" && challenge.user2 == mainUserId)
        {
            return "You have a new challenge with " + challenge.otherUser.GetFullName() + ". You need to respond to the challenge."
        }
        else{
            return "Play out your challenge to decide a winner."
        }
    }

}