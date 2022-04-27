import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { catchError, Observable, tap, throwError } from "rxjs";
import { ChallengeService } from "../challenge/challenge.service";
import { LadderService } from "../ladders/ladder.service";
import { SystemNotificationService } from "../notifications/system-notification-service";
import { MainUser } from "./main-user.model";
import { User } from "./user.model";

@Injectable()
export class MainUserService{

    public user: MainUser

    constructor(
        public afs: AngularFirestore,
        private systemNotificationService: SystemNotificationService,
        private ladderService: LadderService,
        private challengeService: ChallengeService
    )
    { }

    public SetUserData(id: string, requiresLaddes: boolean) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${id}`);
        const userRefSearch: AngularFirestoreCollection<any> = this.afs.collection('notifications', ref => ref.where('toUser', '==', userRef.ref))

        return new Observable(observer => {
            userRef.ref.get()
            .then((result) => {
                try
                {
                    if (result != null) 
                    {
                        userRefSearch.get().subscribe(resultData => {
                            var notificationList = this.systemNotificationService.ConvertQuerySnapshotToModel(resultData)
                            //TODO: put all these values in a try catch
                            this.user = new MainUser(id, result.data().firstName, result.data().surname, result.data().username, result.data().picture, result.data().challenges, result.data().ladders, notificationList)
                            if (requiresLaddes)
                            {
                                var isComplete = 0
                                //load ladders
                                this.ladderService.GetLaddersByReferences(result.data().ladders).subscribe({
                                    next: (ladder) => 
                                    {                                 
                                        this.user.AddLoadedLadder(ladder)
                                    },
                                    complete: () => 
                                    { 
                                        isComplete++
                                        console.log(isComplete)
                                        if (isComplete == 2)
                                        {
                                            observer.complete()
                                        }
                                    },
                                    error: (error) => 
                                    { 
                                        console.log(error)
                                    },
                                });

                                this.challengeService.GetChallengesByReferences(result.data().challenges, id).subscribe({
                                    next: (challege) => 
                                    {
                                        this.user.AddLoadedChallenge(challege)
                                    },
                                    complete: () => 
                                    { 
                                        isComplete++
                                        console.log(isComplete)
                                        if (isComplete == 2)
                                        {
                                            observer.complete()
                                        }
                                    },
                                    error: (error) => 
                                    { 
                                        console.log(error)
                                    },
                                });

                            }
                            else{
                                observer.complete()
                            } 
                        })
                    }
                    else
                    {
                        throwError(() => new Error('Could not get user data'))
                    }
                }
                catch (error)
                {
                    throwError(() => new Error("Could not load user data"))
                }
            }).catch((error) => {
                throwError(() => new Error(error))
            })
        })
    }

    public GetUserData(): MainUser{
        return this.user
    }

    public refresh()
    {
        return new Observable(observer => {
            this.SetUserData(this.user.userID, true).subscribe({
                complete: () => 
                { 
                    observer.complete()
                },
                error: (error) => 
                { 
                    throwError(() => new Error(error))
                },
            });
        })
    }
}