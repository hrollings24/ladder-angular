import { DocumentReference } from "@angular/fire/compat/firestore"

export class SystemNotification{

    fromUserRef: DocumentReference
    message: string
    type: SystemNotificationType
    title: string
    ladderRef: DocumentReference
    id: string
    challengeRef?: DocumentReference
    toUser: DocumentReference

    constructor(
        fromUserRef: DocumentReference,
        message: string,
        type: SystemNotificationType,
        title: string,
        ladderRef: DocumentReference,
        id: string,
        toUser: DocumentReference,
        challengeRef?: DocumentReference
    )
    {
        this.fromUserRef = fromUserRef
        this.message = message
        this.type = type
        this.title = title
        this.ladderRef = ladderRef
        this.id = id
        this.challengeRef = challengeRef
        this.toUser = toUser
    }

}

export enum SystemNotificationType {
    message,
    invite
  }