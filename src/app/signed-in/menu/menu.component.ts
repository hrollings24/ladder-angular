import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;

    constructor(
        private observer: BreakpointObserver,
        public mainUserService: MainUserService,
        private authService: AuthService
    ) {}

    ngAfterViewInit() {
        this.observer.observe(['(max-width: 1000px)']).subscribe((res) => {
            if (res.matches) {
                this.sidenav.mode = 'over';
                this.sidenav.close();
            } else {
                this.sidenav.mode = 'side';
                this.sidenav.open();
            }
        });
    }

    logout(){
        this.authService.SignOut()
    }
}
