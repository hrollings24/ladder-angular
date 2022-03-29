import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ AuthService ],
})
export class LoginComponent implements OnInit {

    @ViewChild('form')
    loginForm!: NgForm;

    isLoading: Boolean = false

    constructor(private authService: AuthService, 
        private userService: MainUserService, 
        private router: Router,
        private appStateService: AppStateService){}

    ngOnInit(): void {
    }

    onLoginSubmitted(){
        if (!this.loginForm.valid){
            return
        }
        console.log(this.loginForm.value)

        this.isLoading = true
        var result = this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
        result.subscribe({
            complete: () => 
            { 
                //go to home page logged in
                console.log(this.userService.GetUserData())
                this.isLoading = false 
                this.router.navigate(['main']);
            },
            error: (error) => 
            { 
                this.isLoading = false
                this.appStateService.openSnackBar(this.convertError(error), "Close")
            },
        });
        this.loginForm.reset()
    }

    public ForgotPassword()
    {
        if (!this.loginForm.value.email)
        {
            this.appStateService.openSnackBar("Email is invalid", "Close")
        }
        else
        {
            this.authService.ForgotPassword(this.loginForm.value.email)
        }
    }

    private convertError(errorMessage: string)
    {
        if (errorMessage == "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).")
        {
            return "The user could not be found"
        }
        if (errorMessage == "FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).")
        {
            return "Incorrect password"
        }
        if (errorMessage == "FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).")
        {
            return "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
        }
        return "An unknown error occured"
    }

}
