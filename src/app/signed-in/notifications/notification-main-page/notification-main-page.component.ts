import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NotificationHandlerService } from 'src/app/SDK/notifications/notification-handler';
import { SystemNotification } from 'src/app/SDK/notifications/system-notification.model';
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
        private notificationHandlerService: NotificationHandlerService,
        private afs: AngularFirestore
    ) { }

    ngOnInit(): void {
    }

    //button functions

    public ViewChallenge(notification)
    {
        this.router.navigate(['main', 'challenge', notification.id]);
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

    RemoveNotification(notification: SystemNotification)
    {
        console.log(notification.id)
        this.appStateService.startLoading()
        this.afs.doc(`notifications/${notification.id}`).delete().then
        (result => {
            this.RefreshUser()
        })
        .catch(error => {
            this.appStateService.stopLoading()
            this.appStateService.openSnackBar(error, "Close")
        });
    }

    DeclineAdminInvite(notification: SystemNotification)
    {
        this.appStateService.startLoading()
        var data = JSON.stringify({"oldNoteID": notification.id,
            "oldnoteToUser": this.mainUserService.user.userID,
            "oldNoteFromUser": notification.fromUserRef.id,
            "fromUser": this.mainUserService.user.userID,
            "ladderRef": notification.ladderRef,
            "username": this.mainUserService.user.username
        })

        //invite user to ladder
        this.notificationHandlerService.DeclineAdminInvite(JSON.parse(data)).then((result) => {
            if (result.length == 0)
            {
                this.RefreshUser()
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
        this.appStateService.startLoading()
        //data = [oldNoteID: String, oldnoteToUser: String, oldNoteFromUser: String, ladderRef: String, username: String]
        var data = JSON.stringify({"oldNoteID": notification.id,
            "oldnoteToUser": this.mainUserService.user.userID,
            "oldNoteFromUser": notification.fromUserRef.id,
            "fromUser": this.mainUserService.user.userID,
            "ladderRef": notification.ladderRef,
            "username": this.mainUserService.user.username
        })

        //invite user to ladder
        this.notificationHandlerService.DeclineNormalInvite(JSON.parse(data)).then((result) => {
            if (result.length == 0)
            {
                this.RefreshUser()
            }
            else
            {
                this.appStateService.openSnackBar(result, "close")
                this.appStateService.stopLoading()
            }
        })
    }

    AcceptNormalInvite(notification: SystemNotification)
    {
        this.appStateService.startLoading()
        var data = JSON.stringify({"fromUserID": notification.fromUserRef.id,
            "ladderID": notification.ladderRef.id,
            "notificationID": notification.id,
            "username": this.mainUserService.user.username,
            "toUserID": notification.toUser.id
        })

        //invite user to ladder
        this.notificationHandlerService.AcceptNormalInvite(JSON.parse(data)).then((result) => {
            if (result.length == 0)
            {
                this.RefreshUser()
            }
            else
            {
                this.appStateService.openSnackBar(result, "close")
                this.appStateService.stopLoading()
            }
        })
    }

    AcceptAdminInvite(notification: SystemNotification)
    {
        this.appStateService.startLoading()
        var data = JSON.stringify({"fromUserID": notification.toUser.id,
            "ladderID": notification.ladderRef.id,
            "notificationID": notification.id,
            "username": this.mainUserService.user.username,
            "toUserID": notification.fromUserRef.id
        })

        //invite user to ladder
        this.notificationHandlerService.AcceptAdminInvite(JSON.parse(data)).then((result) => {
            if (result.length == 0)
            {
                this.RefreshUser()
            }
            else
            {
                this.appStateService.openSnackBar(result, "close")
                this.appStateService.stopLoading()
            }
        })
    }


    AcceptChallenge(notification: SystemNotification)
    {
        console.log(notification)
        this.appStateService.startLoading()

        //invite user to ladder
        this.notificationHandlerService.AcceptChallenge(notification.challengeRef.id).then((result) => {
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

    DeclineChallenge(notification: SystemNotification)
    {
        console.log(notification)
        this.appStateService.startLoading()

        //invite user to ladder
        this.notificationHandlerService.DeclineChallenge(notification.challengeRef.id).then((result) => {
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
