import { Component, ComponentFactoryResolver, ElementRef, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { LadderService } from 'src/app/SDK/ladders/ladder.service';
import { LadderUser } from 'src/app/SDK/users/ladder-user.model';
import { LadderUserService } from 'src/app/SDK/users/ladder-user.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LadderModalComponent } from '../ladder-modal/ladder-modal.component';
import { BaseLadderComponent } from '../base-ladder-component.component';
import { CurrentLadderService } from '../current-ladder.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { basePlacements } from '@popperjs/core';
import { AppStateService } from 'src/app/shared/app-state.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
    selector: 'app-ladder-page',
    templateUrl: './ladder-page.component.html',
    styleUrls: ['./ladder-page.component.css'],
    providers: [NgbModalConfig, NgbModal]
})
export class LadderPageComponent extends BaseLadderComponent implements OnInit {

    constructor(
        route: ActivatedRoute,
        ladderUserService: LadderUserService,
        mainUserService: MainUserService,
        config: NgbModalConfig,
        afs: AngularFirestore,
        currentLadderService: CurrentLadderService,
        appState: AppStateService,
        ladderService: LadderService,
        private router: Router,
    ) { 
        super(ladderService)
        config.backdrop = 'static';
        config.keyboard = false;
        this.ladderUserService = ladderUserService
        this.mainUserService = mainUserService
        this.route = route
        this.afs = afs
        this.currentLadderService = currentLadderService
        this.appState = appState
    }

    ngOnInit() {
        if (this.currentLadderService.ladder == null || this.currentLadderService.ladder.players.length == 0)
        {
            this.loadedCount = 0
            this.targetLoadedCount = 1
            this.appState.startLoading()
            this.setup()
        }
    }

    ngOnDestroy() {
        if (this.routeSub != null)
        {
            this.routeSub.unsubscribe();
        }
        this.currentLadderService.ladder.players = []
    }
    
    mainUserIsAdmin(): boolean{
        return this.currentLadderService.ladder.adminIDs.includes(this.mainUserService.user.userID)
    }


    getRankText(user: LadderUser): string
    {
        var challenge = this.mainUserService.user.loadedChallenges.find(x => x.otherUser.userID == user.userID && x.ladderID == this.currentLadderService.ladder.reference.id)
        if (user.isMyself)
        {
            return "Withdraw from Ladder"
        }
        else if (challenge != null)
        {
            return "View Challenge"
        }
        else if ((user.position < this.currentLadderService.ladder.myPosition) && (user.position >= this.currentLadderService.ladder.myPosition-this.currentLadderService.ladder.jump))
        {
            return "Start a Challenge"
        }
        else
        {
            return "You cannot challenge this player"
        }
    }

    actionRankText(user: LadderUser)
    {
        var text = this.getRankText(user)
        if (text == "View Challenge")
        {
            var challenge = this.mainUserService.user.loadedChallenges.find(x => x.otherUser.userID == user.userID && x.ladderID == this.currentLadderService.ladder.reference.id)
            this.router.navigate(['/main', 'challenge', challenge.reference.id]);
        }
        else if (text == "Withdraw from Ladder")
        {
            var data = JSON.stringify({"userID": user.userID,
            "ladderID": this.currentLadderService.ladder.reference.id,
            "isAdmin": this.currentLadderService.ladder.adminIDs.includes(this.mainUserService.user.userID) })
            this.openModal(text, data)
        }
        else if (text == "Start a Challenge")
        {
            var data = JSON.stringify({"userIdToChallenge": user.userID,
            "ladderId": this.currentLadderService.ladder.reference.id})
            this.openModal(text, data)
        }
    }

    openModal(title: string, data: string)
    {
        this.modalReference.openLadderRanks(title, data)
    }

    openFindUserModal(operation: string)
    {
        console.log(operation)
        this.findUserModalReference.openFindModal(operation)
    }

    actionInvite()
    {
        console.log("yo")
        //Check ladder permissions
        this.openFindUserModal("inviteUser")
    }

    refreshLadder()
    {
        this.ngOnDestroy()
        console.log(this.currentLadderService.ladder)
        this.mainUserService.refresh().subscribe({
            complete: () => 
            { 
                this.targetLoadedCount = 1
                this.loadedCount = 0
        
                this.setup()

                this.appState.openSnackBar("Operation successful", "Close")
            },
            error: (error) => 
            { 
                this.appState.stopLoading()
                this.appState.openSnackBar("Operation successful but could not refresh ladder", "Close")
            },
        });


    }


}
