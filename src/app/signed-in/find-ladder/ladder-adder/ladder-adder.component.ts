import { Component, Input, OnInit } from '@angular/core';
import { LadderHandlerService } from 'src/app/SDK/ladders/ladder-handler.service';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';

@Component({
  selector: 'app-ladder-adder',
  templateUrl: './ladder-adder.component.html',
  styleUrls: ['./ladder-adder.component.css'],
  providers: [LadderHandlerService]
})
export class LadderAdderComponent implements OnInit {

  constructor(private ladderHandler: LadderHandlerService,
    private mainUserService: MainUserService,
    private appState: AppStateService) { }

  @Input()
  public ladder: Ladder

  ngOnInit(): void {
  }

  public Add()
    {
      this.appState.startLoading()

          //data = [toUserID: String, ladderID: String, fromUser: String, message: String, type: string, title: string]
          var data = JSON.stringify({"userID": this.mainUserService.user.userID,
            "ladderID": this.ladder.reference.id,
          })

          //invite user to ladder
          this.ladderHandler.RequestToJoinLadder(JSON.parse(data)).then((result) => {
                this.mainUserService.refresh().subscribe({
                  complete: () => {
                    this.appState.stopLoading()
                  },
                  error: () => {
                    this.appState.stopLoading()
                  }
                })
                  this.appState.openSnackBar(result, "close")
          })
    }


}
