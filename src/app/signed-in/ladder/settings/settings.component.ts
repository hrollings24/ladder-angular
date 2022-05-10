import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { LadderService } from 'src/app/SDK/ladders/ladder.service';
import { LadderUser } from 'src/app/SDK/users/ladder-user.model';
import { LadderUserService } from 'src/app/SDK/users/ladder-user.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseLadderComponent } from '../base-ladder-component.component';
import { CurrentLadderService } from '../current-ladder.service';
import { LadderModalComponent } from '../ladder-modal/ladder-modal.component';
import { SystemNotificationService } from 'src/app/SDK/notifications/system-notification-service';
import { AppStateService } from 'src/app/shared/app-state.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [NgbModalConfig, NgbModal]
})
export class SettingsComponent extends BaseLadderComponent implements OnInit{
    
    public tabIndex = 0;


    constructor(
        route: ActivatedRoute,
        ladderUserService: LadderUserService,
        mainUserService: MainUserService,
        config: NgbModalConfig,
        afs: AngularFirestore,
        currentLadderService: CurrentLadderService,
        appState: AppStateService,
        private systemNotificationService: SystemNotificationService,
        ladderService: LadderService,
        router: Router
    ) { 
        super(ladderService, router)
        config.backdrop = 'static';
        config.keyboard = false;
        this.ladderUserService = ladderUserService
        this.mainUserService = mainUserService
        this.route = route
        this.afs = afs
        this.currentLadderService = currentLadderService
        this.appState = appState
    }

    ngOnInit(): void {
        this.targetLoadedCount = 3
        this.loadedCount = 0
        this.appState.startLoading()

        this.setup()
        this.loadAdmins()
        this.loadRequests()
        this.loadInvites()

        this.route.queryParams
            .subscribe(params => {
            console.log(params);
            if (params['tab'] != undefined)
            {
                this.tabIndex = params['tab'];
            }
            console.log(this.tabIndex);
            }
        );
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.currentLadderService.loadedAdmins = []
        this.currentLadderService.loadedRequests = []
        this.currentLadderService.loadedInvites = []
    }


    ngAfterViewInit() {
        console.log(this.modalReference)
    }

    refreshLadder(goHomeParam: boolean)
    {
        console.log(goHomeParam)
        this.goHome = !goHomeParam
        this.ngOnDestroy()
        console.log(this.currentLadderService.ladder)
        this.mainUserService.refresh().subscribe({
            complete: () => 
            { 
                this.targetLoadedCount = 3
                this.loadedCount = 0
        
                this.appState.openSnackBar("Operation successful", "Close")

                this.setup()
                this.loadAdmins()
                this.loadRequests()
                this.loadInvites()
            },
            error: (error) => 
            { 
                this.appState.stopLoading()
                this.appState.openSnackBar("Operation successful but could not refresh ladder", "Close")
            },
        });


    }

    loadAdmins(){
        var loadedUserCount = 0
        this.currentLadderService.ladder.adminIDs.forEach((userId, index) => {
            const userRef: DocumentReference<any> = this.afs.doc(`users/${userId}`).ref
            this.ladderUserService.GetLadderUserByReference(userRef, this.mainUserService.user.userID, index)
            .then((ladderUser) => {
                this.currentLadderService.loadedAdmins.push(ladderUser)
                loadedUserCount++
                if (loadedUserCount == this.currentLadderService.ladder.adminIDs.length)
                {
                    this.loadedCount++
                    if (this.loadedCount == this.targetLoadedCount)
                    {
                        this.finishedLoading()
                    }
                }
            })
            .catch((error) => { 
                throwError(() => new Error(error))
            })
        });
        if (loadedUserCount == this.currentLadderService.ladder.adminIDs.length)
        {
            this.loadedCount++
            if (this.loadedCount == this.targetLoadedCount)
            {
                this.finishedLoading()
            }
        }
    }

    loadRequests(){
        var loadedUserCount = 0
        this.currentLadderService.ladder.requests.forEach((userId, index) => {
            const userRef: DocumentReference<any> = this.afs.doc(`users/${userId}`).ref
            this.ladderUserService.GetLadderUserByReference(userRef, this.mainUserService.user.userID, index)
            .then((ladderUser) => {
                this.currentLadderService.loadedRequests.push(ladderUser)
                loadedUserCount++
                if (loadedUserCount == this.currentLadderService.ladder.requests.length)
                {
                    this.loadedCount++
                    if (this.loadedCount == this.targetLoadedCount)
                    {
                        this.finishedLoading()
                    }    
                }
            })
            .catch((error) => { 
                throwError(() => new Error(error))
            })
        });
        if (loadedUserCount == this.currentLadderService.ladder.requests.length)
        {
            this.loadedCount++
            if (this.loadedCount == this.targetLoadedCount)
            {
                this.finishedLoading()
            } 
        }
    }


    loadInvites(){
        const noteSearch: AngularFirestoreCollection<any> = this.afs.collection('notifications', ref => ref.where('type', '==', "invite").where('ladder', '==', this.currentLadderService.ladder.reference))

        noteSearch.get().subscribe(resultData => {
            var notificationList = this.systemNotificationService.ConvertQuerySnapshotToModel(resultData)
            const invitedUsers = notificationList.map(({ toUser }) => toUser.id);

            console.log(notificationList)
            var loadedUserCount = 0
            invitedUsers.forEach((userId, index) => {
                const userRef: DocumentReference<any> = this.afs.doc(`users/${userId}`).ref
                this.ladderUserService.GetLadderUserByReference(userRef, this.mainUserService.user.userID, index)
                .then((ladderUser) => {
                    this.currentLadderService.loadedInvites.push(ladderUser)
                    loadedUserCount++
                    if (loadedUserCount == invitedUsers.length)
                    {
                        this.loadedCount++
                        if (this.loadedCount == this.targetLoadedCount)
                        {
                            this.finishedLoading()
                        } 
                    }
                })
                .catch((error) => { 
                    throwError(() => new Error(error))
                })
            });
            if (loadedUserCount == invitedUsers.length)
            {
                this.loadedCount++
                if (this.loadedCount == this.targetLoadedCount)
                {
                    this.finishedLoading()
                }
            }
        })
    }
  

   

}
