import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { AppStateService } from "src/app/shared/app-state.service";

@Injectable()
export class AccountHandlerService{

    constructor(
        private fns: AngularFireFunctions,
        private appState: AppStateService
    ) {}

    public CheckUsername(usernameField): Promise<string>
    {
        return new Promise<string>((resolve) => {
            const requestCall = this.fns.httpsCallable('checkUsername'); 
            requestCall({username: usernameField}).subscribe({
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