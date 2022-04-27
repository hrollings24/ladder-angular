import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Challenge } from "src/app/SDK/challenge/challenge.model";
import { ChallengeService } from "src/app/SDK/challenge/challenge.service";
import { MainUserService } from "src/app/SDK/users/main-user.service";

@Injectable()
export class CurrentChallengeService{

    public challenge: Challenge

    constructor(
        public challengeService: ChallengeService,
        public mainUserService: MainUserService
    )
    {}

    RefreshChallenge()
    {
        return new Observable(observer => {
            this.challengeService.GetChallengeByReference(this.challenge.reference, this.mainUserService.user.userID)
            .then((result) => {
                this.challenge = result
                observer.complete()
            })
            .catch((error) => { 
                observer.error(() => new Error(error))
            })
        })
    }
}