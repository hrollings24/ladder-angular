import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationHandlerService } from 'src/app/SDK/notifications/notification-handler';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';

@Component({
    selector: 'app-notification-main-page',
    templateUrl: './notification-main-page.component.html',
    styleUrls: ['./notification-main-page.component.css'],
    providers: [NotificationHandlerService]
})
export class NotificationMainPageComponent implements OnInit {

    constructor(
        public mainUserService: MainUserService,
        private router: Router,
        private appStateService: AppStateService,
        private notificationHandlerService: NotificationHandlerService
    ) { }

    ngOnInit(): void {
    }

    //button functions

    public ViewChallenge(notification)
    {
        this.router.navigate(['main', 'challenge', notification.id]);
    }

    DeclineAdminInvite(notification)
    {
        var data = JSON.stringify({"oldNoteID": notification.id,
            "oldnoteToUser": this.mainUserService.user.userID,
            "oldNoteFromUser": notification.fromUser.id,
            "fromUser": this.mainUserService.user.userID,
            "ladderRef": notification.ladderRef,
            "username": this.mainUserService.user.username
        })

        //invite user to ladder
        this.notificationHandlerService.DeclineAdminInvite(JSON.parse(data)).then((result) => {
            if (result.length == 0)
            {
                console.log("emittinig...")
                //this.refreshNeeded.emit(true);
            }
            else
            {
                this.appStateService.openSnackBar(result, "close")
                this.appStateService.stopLoading()
            }
        })
    }

    DeclineNormalInvite(notification)
    {
        //data = [oldNoteID: String, oldnoteToUser: String, oldNoteFromUser: String, ladderRef: String, username: String]
        var data = JSON.stringify({"oldNoteID": notification.id,
            "oldnoteToUser": this.mainUserService.user.userID,
            "oldNoteFromUser": notification.fromUser.id,
            "fromUser": this.mainUserService.user.userID,
            "ladderRef": notification.ladderRef,
            "username": this.mainUserService.user.username
        })

        //invite user to ladder
        this.notificationHandlerService.DeclineNormalInvite(JSON.parse(data)).then((result) => {
            if (result.length == 0)
            {
                console.log("emittinig...")
                //this.refreshNeeded.emit(true);
            }
            else
            {
                this.appStateService.openSnackBar(result, "close")
                this.appStateService.stopLoading()
            }
        })
    }

}
