import { Component, Input, OnInit } from '@angular/core';
import { FindUserModalComponent } from 'src/app/shared/find-user-modal/find-user-modal.component';
import { CurrentLadderService } from '../../../current-ladder.service';
import { LadderModalComponent } from '../../../ladder-modal/ladder-modal.component';
import { BaseTab } from '../base-tab';

@Component({
    selector: 'app-invites-tab',
    templateUrl: './invites-tab.component.html',
    styleUrls: ['./invites-tab.component.css']
})
export class InvitesTabComponent extends BaseTab{
  
    constructor(currentLadderService: CurrentLadderService) {
      super(currentLadderService);
    }

    actionInvite()
    {
        //Check ladder permissions
        this.openFindUserModal("inviteUser")
    }

}
