import { DocumentReference, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "@angular/fire/compat/firestore";
import { Challenge } from "../challenge/challenge.model";
import { Ladder } from "../ladders/ladder.model";
import { SystemNotification } from "../notifications/system-notification.model";
import { User } from "./user.model";

export class MainUser extends User{
    challengeRefs: Array<DocumentReference>
    challenges: Array<string>
    ladderRefs: Array<DocumentReference>
    ladders: Array<string>
    notifications: Array<SystemNotification>
    loadedLadders: Array<Ladder>
    loadedChallenges: Array<Challenge>

    constructor(
        userID: string, 
        firstName: string, 
        surname: string, 
        username: string, 
        picture: string, 
        challengeRefList: Array<DocumentReference>,
        ladderRefs: Array<DocumentReference>,
        notifications: Array<SystemNotification>
    )
    {
        super(userID, firstName, surname, username, picture)
        this.challengeRefs = challengeRefList
        this.ladderRefs = ladderRefs
        this.notifications = notifications
        this.loadedLadders = new Array<Ladder>()
        this.loadedChallenges = new Array<Challenge>()
    }

    public AddLoadedLadder(ladder: Ladder)
    {
        this.loadedLadders.push(ladder)
    }

    public AddLoadedChallenge(challenge: Challenge)
    {
        this.loadedChallenges.push(challenge)
    }
}