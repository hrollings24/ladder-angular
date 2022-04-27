import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { AppStateService } from "src/app/shared/app-state.service";

@Injectable()
export class ChallengeHandlerService{

    constructor(
        private fns: AngularFireFunctions,
        private appState: AppStateService
    ) {}

    public ConfirmWinner(challengeID): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('confirmWinner'); 
            requestCall(challengeID).subscribe({
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

    public DeclineWinner(challengeID): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('declineWinner'); 
            requestCall(challengeID).subscribe({
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

    public AddWinner(data: {challengeId: string, winnerId: string}): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('addWinnerToChallenge'); 
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
