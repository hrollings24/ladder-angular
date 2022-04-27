import { Component, OnInit } from '@angular/core';
import { ChallengeHandlerService } from 'src/app/SDK/challenge/challenge-handler';
import { NotificationHandlerService } from 'src/app/SDK/notifications/notification-handler';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { CurrentChallengeService } from '../../../current-challenge-service';

@Component({
  selector: 'app-four-main-user-to-accept',
  templateUrl: './four-main-user-to-accept.component.html',
  styleUrls: ['./four-main-user-to-accept.component.css'],
  providers: [ChallengeHandlerService]
})
export class FourMainUserToAcceptComponent implements OnInit {

  constructor(public currentChallengeService: CurrentChallengeService,
    private challengeHandlerService: ChallengeHandlerService,
    private appStateService: AppStateService,
    private mainUserService: MainUserService) { }

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

  AcceptWinner()
  {
      this.appStateService.startLoading()

      //invite user to ladder
      this.challengeHandlerService.ConfirmWinner(this.currentChallengeService.challenge.reference.id).then((result) => {
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

  DeclineWinner()
  {
      this.appStateService.startLoading()

      //invite user to ladder
      this.challengeHandlerService.DeclineWinner(this.currentChallengeService.challenge.reference.id).then((result) => {
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