import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Challenge } from 'src/app/SDK/challenge/challenge.model';
import { ChallengeService } from 'src/app/SDK/challenge/challenge.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { CurrentChallengeService } from '../current-challenge-service';

@Component({
    selector: 'app-challenge-page',
    templateUrl: './challenge-page.component.html',
    styleUrls: ['./challenge-page.component.css']
})
export class ChallengePageComponent implements OnInit {
    
    constructor(private appStateService: AppStateService,
        public currentChallengeService: CurrentChallengeService,
        private challengeService: ChallengeService,
        private mainUserService: MainUserService,
        public afs: AngularFirestore,
        private router: Router
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

    ngOnDestroy() {
        this.currentChallengeService.challenge = null
    }
   
}
