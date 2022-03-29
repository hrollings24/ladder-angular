import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LadderService } from 'src/app/SDK/ladders/ladder.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    dataLoading: Boolean

    constructor(
        public mainUserService: MainUserService, 
        private afAuth: AngularFireAuth,
        private appStateService: AppStateService
    ) 
    { }

    ngOnInit(): void {
        this.dataLoading = true
        this.afAuth.onAuthStateChanged((user) => {
            if (user) {          
                this.mainUserService.SetUserData(user!.uid, true).subscribe({
                    complete: () => 
                    { 
                        this.dataLoading = false
                    },
                    error: (error) => 
                    { 
                        this.dataLoading = false
                        this.appStateService.openSnackBar("Error getting user data", "Close")
                        this.afAuth.signOut()
                    },
                });
            } else {
                // No user is signed in.
                this.dataLoading = false
                console.log('signed out')
            }
        });
    }
}
