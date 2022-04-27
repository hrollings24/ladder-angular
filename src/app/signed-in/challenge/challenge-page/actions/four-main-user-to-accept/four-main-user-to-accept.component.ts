import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

    @Output() refreshRequired: EventEmitter<boolean> = new EventEmitter();


  ngOnInit(): void {
  }

  RefreshUser()
  {
      this.mainUserService.refresh().subscribe({
          complete: () => 
          { 
              this.currentChallengeService.RefreshChallenge().subscribe({
                  complete: () =>
                  {
                    this.refreshRequired.emit(true);
                  },
                  error: (error) =>
                  {
                    this.appStateService.stopLoading()
                    this.appStateService.openSnackBar(error, "Close")
                  }
              })
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
          console.log(result)
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

  GetWinnerName(): string
  {
      if (this.currentChallengeService.challenge.winner == this.currentChallengeService.challenge.otherUser.userID)
      {
        return this.currentChallengeService.challenge.otherUser.GetFullName()
      }
      else
      {
          return this.mainUserService.user.GetFullName()
      }
  }


}