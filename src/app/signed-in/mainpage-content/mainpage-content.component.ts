import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainUserService } from 'src/app/SDK/users/main-user.service';

@Component({
    selector: 'app-mainpage-content',
    templateUrl: './mainpage-content.component.html',
    styleUrls: ['./mainpage-content.component.css']
})
export class MainpageContentComponent implements OnInit {

    constructor(
        private mainUserService: MainUserService,
        private router: Router
    ) 
    { }

    ngOnInit(): void {
    }

    public GetNotificationsText(): string {
        if (this.mainUserService.user.notifications.length == 0){
            return 'You have no notifications'
        }
        else if (this.mainUserService.user.notifications.length == 1){
            return 'You have 1 notification'
        }
        else{
            return `You have ${this.mainUserService.user.notifications.length} notifications`
        }
    }

    public NotificationsClicked()
    {
        if (this.mainUserService.user.notifications.length != 0){
            this.router.navigate(['main', 'notifications']);
        }
    }

    public NoLadders(): boolean {
        return this.mainUserService.user.ladderRefs.length == 0
    }

    public NoChallenges(): boolean {
        return this.mainUserService.user.challengeRefs.length == 0
    }

}
