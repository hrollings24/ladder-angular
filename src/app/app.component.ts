import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { MainUserService } from './SDK/users/main-user.service';
import { AppStateService } from './shared/app-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loadingSubscription: Subscription;

    constructor(private state: AppStateService, private spinner: NgxSpinnerService) 
    {
    }

    ngOnInit(): void {
        this.state.startLoading()
        this.loadingSubscription = this.state.loading$.pipe().subscribe(
            (status: boolean) => {
                if (status)
                {
                    this.spinner.show()
                }
                else
                {
                    this.spinner.hide()
                }
            }
        );
    }

}
