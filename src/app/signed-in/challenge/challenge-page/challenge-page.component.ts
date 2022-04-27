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
        if (this.currentChallengeService.challenge == null)
        {
            var challengeID = this.router.url.split('/').pop()

            //load challenge
            this.appStateService.startLoading()
            var ref = this.afs.doc(`challenge/${challengeID}`).ref
            this.challengeService.GetChallengeByReference(ref, this.mainUserService.user.userID)
            .then((result) => {
                this.appStateService.stopLoading()
                this.currentChallengeService.challenge = result
            })
            .catch((error) => { 
                this.appStateService.stopLoading()
                this.appStateService.openSnackBar(error, "Close")
            })
        }
    }

    ngAfterViewInit(): void
    {
        console.log(this.challengeFunction)
        this.showChallengeFunction()
    }

    ngOnDestroy() {
        this.currentChallengeService.challenge = null
    }

    private showChallengeFunction()
    {
        console.log(this.challengeFunction)
        const ref = this.challengeFunction.createComponent(FourMainUserToAcceptComponent);

        ref.changeDetectorRef.detectChanges();
    }
   
}
