import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, AfterViewChecked {

    dataLoading: Boolean

    constructor(
        public mainUserService: MainUserService, 
        private afAuth: AngularFireAuth,
        private changeDetector : ChangeDetectorRef,
        private appState: AppStateService
    ) 
    { 
        this.dataLoading = true
    }

    ngOnInit(): void {
        if (this.dataLoading)
        {
            this.appState.startLoading()
            this.afAuth.onAuthStateChanged((user) => {
                if (user) {   
                    console.log("loading user: " + user)       
                    this.mainUserService.SetUserData(user!.uid, true).subscribe({
                        complete: () => 
                        { 
                            this.dataLoading = false
                            this.appState.stopLoading()
                            console.log('signed in successfully')
                        },
                        error: (error) => 
                        { 
                            this.dataLoading = false
                            console.log('error getting user data')
                        },
                    });
                } else {
                  // No user is signed in.
                    this.dataLoading = false
                    this.appState.stopLoading()
                    console.log('signed out')
                    
                }
            });
        }      
    }

    ngAfterViewChecked(){ this.changeDetector.detectChanges(); }

}
