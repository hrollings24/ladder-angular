import { Injectable, resolveForwardRef } from "@angular/core";
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { throwError } from "rxjs";
import { AppStateService } from "src/app/shared/app-state.service";

@Injectable()
export class InviteHandlerService{

    constructor(
        private fns: AngularFireFunctions,
        private appState: AppStateService
        ) {}

    //data = [toUserID: String, ladderID: String, fromUser: String, message: String, type: string, title: string]
    public InviteUser(data: {toUserID: string, ladderID: string, fromUser: string, message: string, type: string, title: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('inviteUser'); 
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

    //data = [toUserID: String, ladderID: String, fromUser: String, message: String, type: string, title: string]
    public AddAdmin(data: {toUserID: string, ladderID: string, fromUser: string, message: string, type: string, title: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const acceptRequestCall = this.fns.httpsCallable('addAdmin'); 
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
}