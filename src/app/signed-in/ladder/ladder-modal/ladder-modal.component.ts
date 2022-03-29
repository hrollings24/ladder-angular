import { DataSource } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LadderHandlerService } from 'src/app/SDK/ladders/ladder-handler.service';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { LadderUser } from 'src/app/SDK/users/ladder-user.model';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { CurrentLadderService } from '../current-ladder.service';

@Component({
    selector: 'app-ladder-modal',
    templateUrl: './ladder-modal.component.html',
    styleUrls: ['./ladder-modal.component.css'],
    providers: [ LadderHandlerService ]
})
export class LadderModalComponent {

    @Output() refreshRequired: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('content') 
    private modal: ElementRef;

    public modalInfomation: {
        title: string, 
        message: string,
        showConfirm: boolean,
        data: string
    }

    permissions: string[] = [
        "Open",
        "Public, with Requests",
        "Invitation",
        "Invitation by Admins Only"
    ];

    constructor(
        private modalService: NgbModal,
        private ladderHandler: LadderHandlerService,
        private appState: AppStateService,
        private mainUserService: MainUserService,
        private currentLadderService: CurrentLadderService
    ) {}

    openLadderRanks(text: string, data: string) {
        if (text == "You cannot challenge this player")
        {
            this.modalInfomation = {
                'title': 'You cannot challenge this player!', 
                'message': 'This ladder has a jump of 2',
                'showConfirm': false,
                'data': data
            }
        }
        else if (text == "Withdraw from Ladder")
        {
            this.modalInfomation = {
                'title': 'Confirm Withdrawal', 
                'message': 'This will remove you from the ladder and delete all challenges. If you are an admin you will remain as so',
                'showConfirm': true,
                'data': data
            }
        }
        else if (text == "Start a Challenge")
        {
            this.modalInfomation = {
                'title': 'Confirm Challenge', 
                'message': 'Please confirm you wish to start a challenge',
                'showConfirm': true,
                'data': data
            }
        }

        this.modalService.open(this.modal);
    }


    openSettingChange(setting: string, data: string) {
        if (setting == "permission")
        {
            this.modalInfomation = {
                'title': 'Change Permissions', 
                'message': '',
                'showConfirm': true,
                'data': data
            }
        }
        else if (setting == "name")
        {
            this.modalInfomation = {
                'title': 'Change Name', 
                'message': '',
                'showConfirm': true,
                'data': data
            }
        }
        else if (setting == "jump")
        {
            this.modalInfomation = {
                'title': 'Change Jump', 
                'message': '',
                'showConfirm': true,
                'data': data
            }
        }
        else if (setting == "Remove User")
        {
            this.modalInfomation = {
                'title': 'Remove User', 
                'message': 'Please confirm you want to remove this user from the ladder',
                'showConfirm': true,
                'data': data
            }
        }
        else if (setting == "Remove Admin")
        {
            this.modalInfomation = {
                'title': 'Remove Admin', 
                'message': 'Please confirm you want to remove this admin from the ladder',
                'showConfirm': true,
                'data': data
            }
        }
        else if (setting == "Remove Invite")
        {
            this.modalInfomation = {
                'title': 'Remove Invite', 
                'message': 'Please confirm you want to remove the invitation for this user',
                'showConfirm': true,
                'data': data
            }
        }
        else if (setting == "Accept Request")
        {
            this.modalInfomation = {
                'title': 'Accept Request', 
                'message': 'Please confirm you want to add this user to the ladder',
                'showConfirm': true,
                'data': data
            }
        }
        else if (setting == "Decline Request")
        {
            this.modalInfomation = {
                'title': 'Decline Request', 
                'message': 'Please confirm you want to deny this user from joining the ladder',
                'showConfirm': true,
                'data': data
            }
        }

        this.modalService.open(this.modal);
    }

    confirmChange(title: string, data: string)
    {
        console.log(title)
        this.appState.startLoading()
        if (title == "Accept Request")
        {
            this.ladderHandler.AcceptRequest(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.refreshRequired.emit(true);
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
            this.ladderHandler.RemoveUserFromLadder(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.refreshRequired.emit(true);
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
            this.ladderHandler.DeclineRequest(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.refreshRequired.emit(true);
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
            this.ladderHandler.DeleteInvite(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.refreshRequired.emit(true);
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
            this.ladderHandler.RemoveAdmin(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.refreshRequired.emit(true);
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
            this.ladderHandler.WithdrawFromLadder(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh
                    if (this.currentLadderService.ladder.adminIDs.includes(this.mainUserService.user.userID))
                    {
                        //refresh data
                        this.refreshRequired.emit(true);
                    }
                    else
                    {
                        //go back to previous page if not admin
                        //NEEDS IMPLEMENTING
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
            this.ladderHandler.CreateChallenge(JSON.parse(data)).then((result) => {
                if (result.length == 0)
                {
                    //refresh data
                    this.refreshRequired.emit(true);
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
            //get reference to form
            
        }
    }
}
