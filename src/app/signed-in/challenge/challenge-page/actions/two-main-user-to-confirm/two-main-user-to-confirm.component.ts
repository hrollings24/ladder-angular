import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationHandlerService } from 'src/app/SDK/notifications/notification-handler';
import { MainUser } from 'src/app/SDK/users/main-user.model';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { CurrentChallengeService } from '../../../current-challenge-service';

@Component({
  selector: 'app-two-main-user-to-confirm',
  templateUrl: './two-main-user-to-confirm.component.html',
  styleUrls: ['./two-main-user-to-confirm.component.css'],
  providers: [NotificationHandlerService]
})
export class TwoMainUserToConfirmComponent implements OnInit {

  constructor(public currentChallengeService: CurrentChallengeService,
    private notificationHandlerService: NotificationHandlerService,
    private appStateService: AppStateService,
    private mainUserService: MainUserService) { }

    @Output() refreshRequired: EventEmitter<boolean> = new EventEmitter();

    
  ngOnInit(): void {
  }

  AcceptChallenge()
  {
      this.appStateService.startLoading()

      //invite user to ladder
      this.notificationHandlerService.AcceptChallenge(this.currentChallengeService.challenge.reference.id).then((result) => {
          if (result.length == 0)
          {
            this.refreshRequired.emit(true);
        }
          else
          {
              this.appStateService.openSnackBar("ERROR: " + result, "close")
              this.appStateService.stopLoading()
          }
      })
  }

  DeclineChallenge()
  {
      this.appStateService.startLoading()

      //invite user to ladder
      this.notificationHandlerService.DeclineChallenge(this.currentChallengeService.challenge.reference.id).then((result) => {
          if (result.length == 0)
          {
            this.refreshRequired.emit(true);
        }
          else
          {
              this.appStateService.openSnackBar("ERROR: " + result, "close")
              this.appStateService.stopLoading()
          }
      })
  }


}
