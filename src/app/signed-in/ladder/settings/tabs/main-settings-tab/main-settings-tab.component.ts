import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CurrentLadderService } from '../../../current-ladder.service';
import { LadderModalComponent } from '../../../ladder-modal/ladder-modal.component';
import { BaseTab } from '../base-tab';

@Component({
    selector: 'app-main-settings-tab',
    templateUrl: './main-settings-tab.component.html',
    styleUrls: ['./main-settings-tab.component.css']
})
export class MainSettingsTabComponent extends BaseTab{
  
    constructor(currentLadderService: CurrentLadderService) {
      super(currentLadderService);
    }

}
