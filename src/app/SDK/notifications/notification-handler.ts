import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { AppStateService } from "src/app/shared/app-state.service";

@Injectable()
export class NotificationHandlerService{

    constructor(
        private fns: AngularFireFunctions,
        private appState: AppStateService
        ) {}

    //data = [oldNoteID: String, oldnoteToUser: String, oldNoteFromUser: String, ladderRef: String, username: String]
    public DeclineAdminInvite(data: {oldNoteID: string, oldnoteToUser: string, oldNoteFromUser: string, ladderRef: string, username: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('rejectAdminInvite'); 
            requestCall(data).subscribe({
                complete: () => 
                { 
                    resolve("")
                },
                error: (error) => 
                { 
                    resolve(error.message)
                },
            });
        })
    }

    //data = [oldNoteID: String, oldnoteToUser: String, oldNoteFromUser: String, ladderRef: String, username: String]
    public DeclineNormalInvite(data: {oldNoteID: string, oldnoteToUser: string, oldNoteFromUser: string, ladderRef: string, username: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('rejectNormalInvite'); 
            requestCall(data).subscribe({
                complete: () => 
                { 
                    resolve("")
                },
                error: (error) => 
                { 
                    resolve(error.message)
                },
            });
        })
    }

    //data = [fromUserID: String, ladderID: String, notificationID: String, username: String, toUserID: String]
    public AcceptAdminInvite(data: {fromUserID: String, ladderID: String, notificationID: String, username: String, toUserID: String}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('acceptAdminInvite'); 
            requestCall(data).subscribe({
                complete: () => 
                { 
                    resolve("")
                },
                error: (error) => 
                { 
                    resolve(error.message)
                },
            });
        })
    }

    //data = [fromUserID: String, ladderID: String, notificationID: String, username: String, toUserID: String]
    public AcceptNormalInvite(data: {fromUserID: String, ladderID: String, notificationID: String, username: String, toUserID: String}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('acceptNormalInvite'); 
            requestCall(data).subscribe({
                complete: () => 
                { 
                    resolve("")
                },
                error: (error) => 
                { 
                    resolve(error.message)
                },
            });
        })
    }

    //data = [toUserID, message, fromUserID, ladderID, challengeID]
    public DeclineChallenge(data: {toUserID: String, fromUserID: String, ladderID: String, challengeID: String}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('declineChallenge'); 
            requestCall(data).subscribe({
                complete: () => 
                { 
                    resolve("")
                },
                error: (error) => 
                { 
                    resolve(error.message)
                },
            });
        })
    }

    //data = [toUserID, message, fromUserID, ladderID, challengeID]
    public AcceptChallenge(data: {toUserID: String, message: string, fromUserID: String, ladderID: String, challengeID: String}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('acceptChallenge'); 
            requestCall(data).subscribe({
                complete: () => 
                { 
                    resolve("")
                },
                error: (error) => 
                { 
                    resolve(error.message)
                },
            });
        })
    }
}
