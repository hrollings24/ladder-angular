import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { LadderUser } from 'src/app/SDK/users/ladder-user.model';
import { LadderUserService } from 'src/app/SDK/users/ladder-user.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';

@Component({
    selector: 'app-find-user-modal',
    templateUrl: './find-user-modal.component.html',
    styleUrls: ['./find-user-modal.component.css']
})
export class FindUserModalComponent implements OnInit {

    constructor(
        private modalService: NgbModal, 
        private afs: AngularFirestore,
        private ladderUserService: LadderUserService,
        private mainUserService: MainUserService) 
    {
        this.foundUsers = new Array<LadderUser>()
    }

    public modalInfomation: {
        message: string,
        showConfirm: boolean,
        action: string
    }

    public foundUsers: Array<LadderUser>

    @Output() refreshRequired: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('content') 
    private modal: ElementRef;

    searchForUsername: string = '';

    ngOnInit(): void {
    }

    openFindModal(action: string) {
        //action = inviteAdmiin, inviteUser etc
        if (action == "Permission Denied")
        {
            this.modalInfomation = {
                'message': 'Only admins can invite players to join this ladder',
                'showConfirm': false,
                'action': action
            }
        }
        else
        {
            this.modalInfomation = {
                'message': '',
                'showConfirm': false,
                'action': action
            }
        }

        this.modalService.open(this.modal);
    }

    onSubmit()
    {
        console.log(this.searchForUsername)
        this.findUsers()
    }


    findUsers()
    {
        var users = this.afs.collection('users', ref => ref.where('username', '==', this.searchForUsername))
        users.get().subscribe(resultData => {
            resultData.forEach(element => {
                const userRef: DocumentReference<any> = this.afs.doc(`users/${element.id}`).ref
                this.ladderUserService.GetLadderUserByReference(userRef, this.mainUserService.user.userID, -1)
                .then((ladderUser) => {
                    try{
                        //come up with a display card for this user and add to view
                        this.foundUsers.push(ladderUser)
                        console.log(this.foundUsers)
                    }
                    catch{
                        throwError(() => new Error('Challenge data is invalid'))
                    }  
                })
                .catch((error) => { 
                    throwError(() => new Error(error))
                })
            });
        })
    }

    refresh()
    {
        this.refreshRequired.emit(true);
    }

}
