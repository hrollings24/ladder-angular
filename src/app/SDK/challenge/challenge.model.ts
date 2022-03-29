import { DocumentReference } from "@angular/fire/compat/firestore"
import { LadderUser } from "../users/ladder-user.model"

export class Challenge{
    reference: DocumentReference
    ladderID: string
    ladderName: string
    status: string
    user1: string
    user2: string
    winner: string
    winnerSelectedBy: string
    otherUser: LadderUser

    constructor(
        reference: DocumentReference,
        ladderID: string,
        ladderName: string,
        status: string,
        user1: string,
        user2: string,
        winner: string,
        winnerSelectedBy: string,
        otherUser: LadderUser
    )
    {
        this.reference = reference
        this.ladderID = ladderID
        this.ladderName = ladderName
        this.status = status
        this.user1 = user1
        this.user2 = user2
        this.winner = winner
        this.winnerSelectedBy = winnerSelectedBy
        this.otherUser = otherUser
    }
}