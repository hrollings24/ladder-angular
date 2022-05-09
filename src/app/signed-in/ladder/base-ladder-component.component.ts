import { Component, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, Subscription, throwError } from "rxjs";
import { Ladder } from "src/app/SDK/ladders/ladder.model";
import { LadderService } from "src/app/SDK/ladders/ladder.service";
import { LadderUser } from "src/app/SDK/users/ladder-user.model";
import { LadderUserService } from "src/app/SDK/users/ladder-user.service";
import { MainUserService } from "src/app/SDK/users/main-user.service";
import { AppStateService } from "src/app/shared/app-state.service";
import { FindUserModalComponent } from "src/app/shared/find-user-modal/find-user-modal.component";
import { CurrentLadderService } from "./current-ladder.service";
import { LadderModalComponent } from "./ladder-modal/ladder-modal.component";

@Component({
    template: ''
  })
export abstract class BaseLadderComponent{

    goHome: boolean;

    @ViewChild(LadderModalComponent, { read: LadderModalComponent }) 
    public modalReference: LadderModalComponent;

    @ViewChild(FindUserModalComponent, { read: FindUserModalComponent }) 
    public findUserModalReference: FindUserModalComponent;
    
    public ladderUserService: LadderUserService;
    public mainUserService: MainUserService;
    public afs: AngularFirestore;
    public route: ActivatedRoute
    public currentLadderService: CurrentLadderService

    public routeSub: Subscription

    public loadedCount: number
    public targetLoadedCount: number
    public appState: AppStateService

    constructor(private ladderService: LadderService,
        public router: Router) {}

    setup() {
        this.routeSub = this.route.params.subscribe(params => {
            let ladder = this.mainUserService.user.loadedLadders.filter(f => f.url == params['id'])[0]
            if (ladder != null)
            {
                this.currentLadderService.ladder = ladder 
                this.ladderService.SetMainUserPosition(ladder, this.mainUserService.user)

                this.loadUsers()
            }
        });
    }

    loadUsers(){
        var loadedUserCount = 0
        if (this.currentLadderService.ladder.positions.length > 0)
        {
            this.currentLadderService.ladder.positions.forEach((userId, index) => {
                const userRef: DocumentReference<any> = this.afs.doc(`users/${userId}`).ref
                this.ladderUserService.GetLadderUserByReference(userRef, this.mainUserService.user.userID, index)
                .then((ladderUser) => {
                    this.currentLadderService.ladder.players.push(ladderUser)
                    loadedUserCount++
                    if (loadedUserCount == this.currentLadderService.ladder.positions.length)
                    {
                        this.loadedCount++
                        if (this.loadedCount == this.targetLoadedCount)
                        {
                            this.appState.stopLoading();
                        }
                    }
                })
                .catch((error) => { 
                    this.appState.stopLoading();
                    throwError(() => new Error(error))
                })
            });
        }
        else
        {
            this.appState.stopLoading();
        }

    }

    public finishedLoading()
    {
        console.log("in mehtod")
        this.appState.stopLoading();
        console.log(this.goHome)
        if (this.goHome)
        {
            this.router.navigate(['main']);
        }
    }
}
