import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    @ViewChild('form')
    loginForm!: NgForm;

    isLoading: Boolean = false
    errorString: string = ""

    constructor(
        private authService: AuthService
    )
    {}

    ngOnInit(): void {
        
    }

    onSignupSubmitted(){
        if (!this.loginForm.valid){
            return
        }
        console.log(this.loginForm.value)

        this.isLoading = true
        var result = this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
        result.subscribe({
            complete: () => 
            { 
                console.log('complete')
                this.isLoading = false 
            },
            error: (error) => 
            { 
                this.errorString = error
                console.log(error)
                this.isLoading = false
            },
        });

        this.loginForm.reset()
    }

}
