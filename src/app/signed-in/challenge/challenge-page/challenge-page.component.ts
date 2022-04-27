import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Challenge } from 'src/app/SDK/challenge/challenge.model';
import { ChallengeService } from 'src/app/SDK/challenge/challenge.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { CurrentChallengeService } from '../current-challenge-service';
import { FivePlayOutComponent } from './actions/five-play-out/five-play-out.component';
import { FourMainUserToAcceptComponent } from './actions/four-main-user-to-accept/four-main-user-to-accept.component';
import { OneOtherUserToComfirmComponent } from './actions/one-other-user-to-comfirm/one-other-user-to-comfirm.component';
import { ThreeAwaitingAcceptionComponent } from './actions/three-awaiting-acception/three-awaiting-acception.component';
import { TwoMainUserToConfirmComponent } from './actions/two-main-user-to-confirm/two-main-user-to-confirm.component';

@Component({
    selector: 'app-challenge-page',
    templateUrl: './challenge-page.component.html',
    styleUrls: ['./challenge-page.component.css']
})
export class ChallengePageComponent implements OnInit, AfterViewInit {
    
    @ViewChild('dynamicAction', { read: ViewContainerRef }) challengeFunction: ViewContainerRef 

    constructor(private appStateService: AppStateService,
        public currentChallengeService: CurrentChallengeService,
        private challengeService: ChallengeService,
        private mainUserService: MainUserService,
        public afs: AngularFirestore,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }


    ngOnInit(): void {
        console.log("ngOnInit!")
    }

    ngAfterViewInit(): void
    {
        console.log("ngAfterViewInit!")
        console.log(this.challengeFunction)
        this.appStateService.startLoading()
        this.Setup()
    }

    Setup()
    {
        //app state must be loading when called
        if (this.currentChallengeService.challenge == null)
        {
            var challengeID = this.router.url.split('/').pop()

            //load challenge
            var ref = this.afs.doc(`challenge/${challengeID}`).ref
            this.challengeService.GetChallengeByReference(ref, this.mainUserService.user.userID)
            .then((result) => {
                this.currentChallengeService.challenge = result
                this.showChallengeFunction()
                this.appStateService.stopLoading()
            })
            .catch((error) => { 
                this.appStateService.stopLoading()
                this.appStateService.openSnackBar(error, "Close")
            })
        }
        else
        {
            //refresh challenge
            this.currentChallengeService.RefreshChallenge().subscribe({
                complete: () =>
                {
                    this.showChallengeFunction()
                    this.appStateService.stopLoading()
                },
                error: (error) =>
                {
                    this.appStateService.stopLoading()
                    this.appStateService.openSnackBar(error, "Close")
                }
            })
        }
    }

    RefreshUser()
    {
        this.mainUserService.refresh().subscribe({
            complete: () => 
            { 
                this.currentChallengeService.RefreshChallenge().subscribe({
                    complete: () =>
                    {
                        this.Setup()
                    },
                    error: (error) =>
                    {
                    this.appStateService.stopLoading()
                    this.appStateService.openSnackBar(error, "Close")
                    }
                })
            },
            error: (error) => 
            { 
                this.appStateService.stopLoading()
                this.appStateService.openSnackBar(error, "Close")
            },
        });
    }

    ngOnDestroy() {
        this.currentChallengeService.challenge = null
    }

    private showChallengeFunction()
    {
        console.log(this.currentChallengeService.challenge)
        console.log(this.challengeFunction)
        this.challengeFunction.clear()
        if (this.currentChallengeService.challenge.status == "ongoing" && this.currentChallengeService.challenge.winnerSelectedBy == this.mainUserService.user.userID){
            const ref = this.challengeFunction.createComponent(ThreeAwaitingAcceptionComponent);
            ref.changeDetectorRef.detectChanges();
        }
        else if (this.currentChallengeService.challenge.status == "ongoing" 
        && this.currentChallengeService.challenge.winnerSelectedBy != this.mainUserService.user.userID
        && this.currentChallengeService.challenge.winnerSelectedBy != "")
        {
            const ref = this.challengeFunction.createComponent(FourMainUserToAcceptComponent);
            ref.changeDetectorRef.detectChanges();

            ref.instance.refreshRequired.subscribe(() => {
                this.RefreshUser();
            })
        }
        else if (this.currentChallengeService.challenge.status == "Awaiting Response" && this.currentChallengeService.challenge.user1 == this.mainUserService.user.userID)
        {
            const ref = this.challengeFunction.createComponent(TwoMainUserToConfirmComponent);
            ref.changeDetectorRef.detectChanges();

            ref.instance.refreshRequired.subscribe(() => {
                this.RefreshUser();
            })
        }
        else if (this.currentChallengeService.challenge.status == "Awaiting Response" && this.currentChallengeService.challenge.user2 == this.mainUserService.user.userID)
        {
            const ref = this.challengeFunction.createComponent(OneOtherUserToComfirmComponent);
            ref.changeDetectorRef.detectChanges();
            
        }
        else{
            const ref = this.challengeFunction.createComponent(FivePlayOutComponent);
            ref.changeDetectorRef.detectChanges();

            ref.instance.refreshRequired.subscribe(() => {
                this.RefreshUser();
            })
        }


    }
   
}
