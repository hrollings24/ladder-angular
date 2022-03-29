import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InviteHandlerService } from 'src/app/SDK/invites/invites-handler.service';
import { LadderUser } from 'src/app/SDK/users/ladder-user.model';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { CurrentLadderService } from 'src/app/signed-in/ladder/current-ladder.service';
import { AppStateService } from '../../app-state.service';

@Component({
    selector: 'app-user-adder',
    templateUrl: './user-adder.component.html',
    styleUrls: ['./user-adder.component.css'],
    providers: [ InviteHandlerService ]
})
export class UserAdderComponent implements OnInit {

    @Input()
    public user: LadderUser

    @Input()
    public action: string

    @Output('refreshNeeded') refreshNeeded: EventEmitter<boolean> = new EventEmitter();

    constructor(private inviteHandler: InviteHandlerService,
        private currentLadderService : CurrentLadderService,
        private mainUserService: MainUserService,
        private appState: AppStateService) { }

    ngOnInit(): void {
    }

    public Add()
    {
        this.appState.startLoading()
        if (this.action == "inviteUser")
        {
            //data = [toUserID: String, ladderID: String, fromUser: String, message: String, type: string, title: string]
            var data = JSON.stringify({"toUserID": this.user.userID,
              "ladderID": this.currentLadderService.ladder.reference.id,
              "message": this.mainUserService.user.username + " has invited you to join " + this.currentLadderService.ladder.name,
              "fromUser": this.mainUserService.user.userID,
              "type": "invite",
              "title": "Invitation Recieved",
              "username": this.user.username
            })

            //invite user to ladder
            this.inviteHandler.InviteUser(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    console.log("emittinig...")
                    this.refreshNeeded.emit(true);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (this.action == "addAdmin")
        {
            //data = [toUserID: String, ladderID: String, fromUser: String, message: String, type: string, title: string]
            var data = JSON.stringify({"toUserID": this.user.userID,
              "ladderID": this.currentLadderService.ladder.reference.id,
              "message": this.mainUserService.user.username + " has invited you to become an admin of " + this.currentLadderService.ladder.name,
              "fromUser": this.mainUserService.user.userID,
              "type": "admin",
              "title": "Admin Request Recieved",
              "username": this.user.username
            })

            //invite user to ladder
            this.inviteHandler.AddAdmin(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    console.log("emittinig...")
                    this.refreshNeeded.emit(true);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
    }

}
