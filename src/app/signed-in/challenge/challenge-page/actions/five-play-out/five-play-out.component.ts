import { Component, OnInit } from '@angular/core';
import { ChallengeHandlerService } from 'src/app/SDK/challenge/challenge-handler';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { CurrentChallengeService } from '../../../current-challenge-service';

@Component({
  selector: 'app-five-play-out',
  templateUrl: './five-play-out.component.html',
  styleUrls: ['./five-play-out.component.css'],
  providers: [ChallengeHandlerService]
})
export class FivePlayOutComponent implements OnInit {

  constructor(public currentChallengeService: CurrentChallengeService,
    private challengeHandlerService: ChallengeHandlerService,
    private appStateService: AppStateService,
    public mainUserService: MainUserService) { }

  ngOnInit(): void {
  }

  RefreshUser()
  {
      this.mainUserService.refresh().subscribe({
          complete: () => 
          { 
              this.appStateService.stopLoading()
          },
          error: (error) => 
          { 
              this.appStateService.stopLoading()
              this.appStateService.openSnackBar(error, "Close")
          },
      });
  }

  AddWinner(winnerUserId: String)
  {
      this.appStateService.startLoading()

      var data = JSON.stringify({"challengeId": this.currentChallengeService.challenge.reference.id,
      "winnerId": winnerUserId})
      
      //invite user to ladder
      this.challengeHandlerService.AddWinner(JSON.parse(data)).then((result) => {
          if (result.length == 0)
          {
              this.RefreshUser()
          }
          else
          {
              this.appStateService.openSnackBar("ERROR: " + result, "close")
              this.appStateService.stopLoading()
          }
      })
  }


}
