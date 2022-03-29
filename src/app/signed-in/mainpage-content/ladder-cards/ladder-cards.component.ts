import { Component, OnInit } from '@angular/core';
import { Challenge } from 'src/app/SDK/challenge/challenge.model';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { LadderService } from 'src/app/SDK/ladders/ladder.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';

@Component({
    selector: 'app-ladder-cards',
    templateUrl: './ladder-cards.component.html',
    styleUrls: ['./ladder-cards.component.css']
})
export class LadderCardsComponent implements OnInit {

    ladderAndMessage: Map<Ladder, string> 

    constructor(
        public mainUserService: MainUserService
    ) 
    { 
        this.ladderAndMessage = new Map<Ladder, string>() 
    }

    ngOnInit(): void {
        this.CalculateLadderMessages()
    }

    private CalculateLadderMessages()
    {
        var ladders = this.mainUserService.user.loadedLadders
        ladders.forEach(ladder => {
            var amountOfChallenges = 0
            //find out how many challenges reference this ladder
            this.mainUserService.user.loadedChallenges.forEach(challenge => {
                if (challenge.ladderID == ladder.reference.id)
                {
                    amountOfChallenges++
                }
            });
            if (amountOfChallenges == 0)
            {
                this.ladderAndMessage.set(ladder, "You have no challenges in this ladder. Start one today!");
            }
            else if (amountOfChallenges == 1)
            {
                this.ladderAndMessage.set(ladder, "You have a challenge in this ladder.");
            }
            else
            {
                this.ladderAndMessage.set(ladder,`You have ${amountOfChallenges} in this ladder.`);
            }
        });
    }
}
