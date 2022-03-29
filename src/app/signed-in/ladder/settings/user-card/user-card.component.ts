import { DataSource } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LadderUser } from 'src/app/SDK/users/ladder-user.model';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { CurrentLadderService } from '../../current-ladder.service';
import { LadderModalComponent } from '../../ladder-modal/ladder-modal.component';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

    @Input()
    public user: LadderUser;

    @Input()
    public acceptMessage: string;

    @Input()
    public declineMessage: string;

    @Input()
    public warnMessage: string;

    @Input()
    public modal: LadderModalComponent;

    constructor(public currentLadderService: CurrentLadderService,
      private mainUserService: MainUserService) { }
    ngOnInit(): void {
    }

    actionWarnChange()
    {
        var data: string = ""
        if (this.warnMessage == "Remove User")
        {
              //create data for remove user call
              //data = [userIDToDelete: String, ladderID: String, message: String, fromUser: String, type: String, isAdmin: Bool]
              data = JSON.stringify({"userIDToDelete": this.user.userID,
              "ladderID": this.currentLadderService.ladder.reference.id,
              "message": "Your have been removed from " + this.currentLadderService.ladder.name + " by an admin",
              "fromUser": this.mainUserService.user.userID,
              "type": "message",
              "isAdmin": this.currentLadderService.ladder.adminIDs.includes(this.mainUserService.user.userID)})
        }
        else if (this.warnMessage == "Remove Invite")
        {
              //create data for remove user call
              //data = [userIdToDelete: String, ladderId: String, message: String, fromUserId: String]
              data = JSON.stringify({"userIdToDelete": this.user.userID,
              "ladderId": this.currentLadderService.ladder.reference.id,
              "message": "Your invite to join" + this.currentLadderService.ladder.name + " was removed by an admin",
              "fromUserId": this.mainUserService.user.userID})
        }
        else if (this.warnMessage == "Remove Admin")
        {
              //create data for remove user call
              //data = [userIdToDelete: String, ladderId: String, message: String, fromUserId: String]
              data = JSON.stringify({"userIdToDelete": this.user.userID,
              "ladderId": this.currentLadderService.ladder.reference.id,
              "message": "Your admin rights to " + this.currentLadderService.ladder.name + " were removed",
              "fromUserId": this.mainUserService.user.userID})
        }
        this.currentLadderService.openSettingModal(this.warnMessage, this.modal, data)
    }


    actionAcceptChange()
    {
      var data: string = ""
      if (this.acceptMessage == "Accept Request")
      {
          //create data for remove user call
          //data = [toUserID: String, ladderID: String, fromUser: String, message: String]
          data = JSON.stringify({"toUserID": this.user.userID,
          "ladderID": this.currentLadderService.ladder.reference.id,
          "fromUser": this.mainUserService.user.userID,
          "message": "Your request to join " + this.currentLadderService.ladder.name + " has been accepted"})
      }
       
      this.currentLadderService.openSettingModal(this.acceptMessage, this.modal, data)
    }


    actionDeclineChange()
    {
      var data: string = ""
      if (this.declineMessage == "Decline Request")
      {
          //create data for remove user call
          //data = [requestUserID: String, ladderID: String, fromUser: String, message: String]
          data = JSON.stringify({"requestUserID": this.user.userID,
          "ladderID": this.currentLadderService.ladder.reference.id,
          "fromUser": this.mainUserService.user.userID,
          "message": "Your request to join " + this.currentLadderService.ladder.name + " has been rejected"})
      }

      console.log(data)
      this.currentLadderService.openSettingModal(this.declineMessage, this.modal, data)
    }

}
