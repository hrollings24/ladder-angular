import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from 'src/app/SDK/challenge/challenge.model';
import { ChallengeService } from 'src/app/SDK/challenge/challenge.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { CurrentChallengeService } from '../../challenge/current-challenge-service';

@Component({
    selector: 'app-challenge-cards',
    templateUrl: './challenge-cards.component.html',
    styleUrls: ['./challenge-cards.component.css']
})
export class ChallengeCardsComponent implements OnInit {

    constructor(
        public mainUserService: MainUserService,
        private challengeService: ChallengeService,
        private currentChallengeService: CurrentChallengeService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    public GetUserFriendlyStatus(challenge: Challenge)
    {
        return this.challengeService.GetUserFriendlyStatusFor(challenge, this.mainUserService.user.userID)
    }

    public GoToChallenge(challenge: Challenge)
    {
        this.currentChallengeService.challenge = challenge
        this.router.navigate(['/main', 'challenge', challenge.reference.id]);
    }

}
