import { Injectable, resolveForwardRef } from "@angular/core";
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { throwError } from "rxjs";
import { AppStateService } from "src/app/shared/app-state.service";

@Injectable()
export class LadderHandlerService{

    constructor(
        private fns: AngularFireFunctions,
        private appState: AppStateService
        ) {}

    //data = [toUserID: String, ladderID: String, fromUser: String, message: String]
    public AcceptRequest(data: {toUserID: string, ladderID: string, fromUser: string, message: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('acceptRequest'); 
            acceptRequestCall(data).subscribe({
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


    //data = [userIDToDelete: String, ladderID: String, message: String, fromUser: String, type: String, isAdmin: Bool]
    public RemoveUserFromLadder(data: {userIDToDelete: string, ladderID: string, message: string, fromUser: string, type: string, isAdmin: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('deleteUserFromAdmin'); 
            acceptRequestCall(data).subscribe({
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

    //data = [requestUserID: String, ladderID: String, message: String, fromUser: String]
    public DeclineRequest(data: {requestUserID: string, ladderID: string, fromUser: string, message: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('rejectRequest'); 
            acceptRequestCall(data).subscribe({
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

    //data = [userIdToDelete: String, ladderId: String, message: String, fromUserId: String]
    public DeleteInvite(data: {userIdToDelete: string, ladderId: string, message: string, fromUserId: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('removeInvites'); 
            acceptRequestCall(data).subscribe({
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

    //data = [userIdToDelete: String, ladderId: String, message: String, fromUserId: String]
    public RemoveAdmin(data: {userIdToDelete: string, ladderId: string, message: string, fromUserId: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('removeAdmin'); 
            acceptRequestCall(data).subscribe({
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

    //let withdrawData = ["ladderID": ladder.id!, "userID": userID!, "isAdmin": ladder.adminIDs.contains(userID)] as [String : Any]
    public WithdrawFromLadder(data: {userID: string, ladderId: string, isAdmin: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('withdrawUserFromLadder'); 
            acceptRequestCall(data).subscribe({
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

    //data = [toUser, fromUser, ladderID, message, ladderName]
    public CreateChallenge(data: {userIDToChallenge: string, ladderId: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('createChallenge'); 
            acceptRequestCall(data).subscribe({
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


    public RequestToJoinLadder(data: {userID: string, ladderID: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            var resultReturn = ""
            const acceptRequestCall = this.fns.httpsCallable('requestToJoinALadder'); 
            acceptRequestCall(data).subscribe({
                next: (result) => 
                    {                                 
                        resultReturn = result.message
                    },
                complete: () => 
                { 
                    resolve(resultReturn)
                },
                error: (error) => 
                { 
                    resolve(error.message)
                },
            });
        })
    }

}