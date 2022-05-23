import { DataSource } from '@angular/cdk/collections';
import { Component, ContentChild, ElementRef, EventEmitter, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LadderHandlerService } from 'src/app/SDK/ladders/ladder-handler.service';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { LadderUser } from 'src/app/SDK/users/ladder-user.model';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { CurrentLadderService } from '../current-ladder.service';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { PermissionComponent } from './setting-forms/permission/permission.component';

@Component({
    selector: 'app-ladder-modal',
    templateUrl: './ladder-modal.component.html',
    styleUrls: ['./ladder-modal.component.css'],
    providers: [ LadderHandlerService ]
})
export class LadderModalComponent {

    @Output() refreshRequired: EventEmitter<boolean> = new EventEmitter();
    @Output() newUsernameEmit: EventEmitter<any> = new EventEmitter();
    @Output() newPictureEmit: EventEmitter<any> = new EventEmitter();


    @ViewChild('content') 
    private modal: ElementRef;

    @ViewChild('modalContent', { static: true }) inner: ModalContentComponent;

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
        console.log(this.modal)
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
        else if (setting == "delete")
        {
            this.modalInfomation = {
                'title': 'Delete Ladder', 
                'message': 'Please confirm you wish to delete this ladder',
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

    openAccountChange(setting: string, data: string) {
        if (setting == "username")
        {
            this.modalInfomation = {
                'title': 'Change Username', 
                'message': '',
                'showConfirm': true,
                'data': data
            }
        }
        else if (setting == "picture")
        {
            this.modalInfomation = {
                'title': 'Change Picture', 
                'message': '',
                'showConfirm': true,
                'data': data
            }
        } 

        this.modalService.open(this.modal);

    }

    refreshPage(boolValue: any)
    {
        console.log("whppppss")
        this.refreshRequired.emit(boolValue)
    }

    confirmChange(title: string, data: string, ref: ModalContentComponent)
    {
        ref.confirmChange(title, data)
    }

    sendUsername(newUsername: any)
    {
        console.log(newUsername)
        this.newUsernameEmit.emit(newUsername);
    }

    sendPicture(newPicture: any)
    {
        this.newPictureEmit.emit(newPicture);

    }
}
