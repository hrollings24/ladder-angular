import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LadderHandlerService } from 'src/app/SDK/ladders/ladder-handler.service';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { LadderUser } from 'src/app/SDK/users/ladder-user.model';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { CurrentLadderService } from '../../current-ladder.service';
import { JumpComponent } from '../setting-forms/jump/jump.component';
import { NameComponent } from '../setting-forms/name/name.component';
import { PermissionComponent } from '../setting-forms/permission/permission.component';
import { PictureComponent } from '../setting-forms/picture/picture.component';
import { UsernameComponent } from '../setting-forms/username/username.component';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit, AfterViewInit {

  @Output('shouldRefresh') shouldRefresh: EventEmitter<any> = new EventEmitter();
  @Output('emitUsername') emitUsername: EventEmitter<any> = new EventEmitter();
  @Output('emitPicture') emitPicture: EventEmitter<any> = new EventEmitter();

  @Input() message: string
  @Input() title: string

  setting: ComponentRef<any>

  @ViewChild('dynamicAction', { read: ViewContainerRef }) challengeFunction: ViewContainerRef 

  public modalInfomation: {
      title: string, 
      message: string,
      showConfirm: boolean,
      data: string
  }

  constructor(
      private modalService: NgbModal,
      private ladderHandler: LadderHandlerService,
      private appState: AppStateService,
      private mainUserService: MainUserService,
      private currentLadderService: CurrentLadderService
  ) {}

  ngAfterViewInit(): void {
    this.showChallengeFunction()
  }

  ngOnInit(): void {
  }

  confirmChange(title: string, data: string)
    {
        console.log(title)
        if (title == "Accept Request")
        {
            this.appState.startLoading()
            this.ladderHandler.AcceptRequest(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.shouldRefresh.emit(true);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (title == "Remove User")
        {
            this.appState.startLoading()
            this.ladderHandler.RemoveUserFromLadder(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.shouldRefresh.emit(true);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (title == "Decline Request")
        {
            this.appState.startLoading()
            this.ladderHandler.DeclineRequest(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.shouldRefresh.emit(true);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (title == "Remove Invite")
        {
            this.appState.startLoading()
            this.ladderHandler.DeleteInvite(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.shouldRefresh.emit(true);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (title == "Remove Admin")
        {
            this.appState.startLoading()
            this.ladderHandler.RemoveAdmin(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.shouldRefresh.emit(true);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (title == "Confirm Withdrawal")
        {
            this.appState.startLoading()
            this.ladderHandler.WithdrawFromLadder(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh
                    if (this.currentLadderService.ladder.adminIDs.includes(this.mainUserService.user.userID))
                    {
                        //refresh data
                        this.shouldRefresh.emit(true);
                    }
                    else
                    {
                        //go back to previous page if not admin
                        this.shouldRefresh.emit(false);
                    }
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (title == "Confirm Challenge")
        {
            this.appState.startLoading()
            this.ladderHandler.CreateChallenge(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.shouldRefresh.emit(true);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (title == "Change Permissions")
        {
            this.appState.startLoading()
            //get reference to form
            console.log(this.setting.instance.value)

            //get new valie
        }
        else if (title == "Delete Ladder")
        {
            this.appState.startLoading()
            this.ladderHandler.DeleteLadder(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    console.log("should emiit")
                    //refresh data
                    this.shouldRefresh.emit(false);
                    this.emitUsername.emit(false);
                }
                else
                {
                    this.appState.openSnackBar(result, "close")
                    this.appState.stopLoading()
                }
            })
        }
        else if (title == "Change Username")
        {
            this.emitUsername.emit(this.setting.instance.usernameForm.value.username)
        }
        else if (title == "Change Picture")
        {
            this.emitPicture.emit(this.setting.instance.url)
        }
    }

    private showChallengeFunction()
    {
        this.challengeFunction.clear()
        if (this.title == "Change Permissions")
        {
          this.setting = this.challengeFunction.createComponent(PermissionComponent);
          this.setting.changeDetectorRef.detectChanges();
        }
        if (this.title == "Change Jump")
        {
          this.setting = this.challengeFunction.createComponent(JumpComponent);
          this.setting.changeDetectorRef.detectChanges();
        }
        if (this.title == "Change Name")
        {
          this.setting = this.challengeFunction.createComponent(NameComponent);
          this.setting.changeDetectorRef.detectChanges();
        }
        if (this.title == "Change Username")
        {
            this.setting = this.challengeFunction.createComponent(UsernameComponent);
            this.setting.changeDetectorRef.detectChanges();
        }
        if (this.title == "Change Picture")
        {
            this.setting = this.challengeFunction.createComponent(PictureComponent);
            this.setting.changeDetectorRef.detectChanges();
        }
        
    }

}
