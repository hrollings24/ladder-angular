import { Component, Input, OnInit } from '@angular/core';
import { CurrentLadderService } from '../../../current-ladder.service';
import { LadderModalComponent } from '../../../ladder-modal/ladder-modal.component';
import { BaseTab } from '../base-tab';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent extends BaseTab implements OnInit {
  
  constructor(currentLadderService: CurrentLadderService) {
    super(currentLadderService);
  }

  ngOnInit(): void {
  }

}
