import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Console } from "console";
import { catchError, Observable } from "rxjs";
import { throwError } from "rxjs";
import { onErrorResumeNext, tap } from "rxjs/operators";
import { MainUser } from "../SDK/users/main-user.model";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MainUserService } from "../SDK/users/main-user.service";
import { AppStateService } from "../shared/app-state.service";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public ngZone: NgZone, // NgZone service to remove outside scope warning
        public mainUserService: MainUserService,
        public appState: AppStateService,
        private router: Router 
    ) {}

    // Sign in with email/password
    SignIn(email: string, password: string) {
        return new Observable(observer => {
            this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                if (result != null) 
                {
                    this.mainUserService.SetUserData(result!.user!.uid, true).subscribe({
                        complete: () => 
                        { 
                            observer.complete()
                        },
                        error: (error) => 
                        { 
                            throwError(() => new Error(error))
                        },
                    });
                }
                else
                {
                    throwError(() => new Error('Response was null from SignIn'))
                }
            }).catch((error) => {
                observer.error(error)
            })
        }) 
    }

    SignOut() {
        this.appState.startLoading()
        this.afAuth.signOut().then(() => {
            //set main user to null
            this.mainUserService.user = null
            this.router.navigate(['home']);
            this.appState.stopLoading()
        });
    }

    ForgotPassword(email: string){
        this.appState.startLoading()
        this.afAuth.sendPasswordResetEmail(email).then(
            () => {
              this.appState.openSnackBar("Password reset email sent", "Close")
              this.appState.stopLoading()
            },
            error => {
                if (error == "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).")
                {
                    this.appState.openSnackBar("Invalid email", "Close")
                }
                else
                {
                    this.appState.openSnackBar("An unknown error occured", "Close")
                }
                this.appState.stopLoading()
            }
        );
    }

}