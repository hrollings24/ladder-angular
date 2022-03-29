import { Component, Input, OnInit } from '@angular/core';
import { CurrentLadderService } from '../../../current-ladder.service';
import { LadderModalComponent } from '../../../ladder-modal/ladder-modal.component';
import { BaseTab } from '../base-tab';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css']
})
export class AdminTabComponent extends BaseTab{
  
  constructor(currentLadderService: CurrentLadderService) {
      super(currentLadderService);
  }

  actionAddAdmin()
  {
      //Check ladder permissions
      this.openFindUserModal("addAdmin")
  }

}