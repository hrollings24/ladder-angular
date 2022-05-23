import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LadderHandlerService } from 'src/app/SDK/ladders/ladder-handler.service';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    providers: [LadderHandlerService]
})
export class CreateComponent implements OnInit {

    permissions: string[] = [
        "Open",
        "Public, with Requests",
        "Invitation",
        "Invitation by Admins Only"
    ];

    constructor(public dialog: MatDialog,
        private mainUserService: MainUserService,
        private ladderHandler: LadderHandlerService,
        private appState: AppStateService,
        private router: Router
    ) {}

    ngOnInit(): void {
    }

    CreateLadder(form: NgForm)
    {
        console.log(form.value)
        this.appState.startLoading()
        //validation has passed as button is disabled until met
        var data = JSON.stringify({"permission": form.value.permission,
            "name": form.value.name,
            "requests": [],
            "jump": form.value.jump,
            "includeMe": form.value.includeyourself,
            "description": form.value.description,
            "currentUserId": this.mainUserService.user.userID})
        this.ladderHandler.CreateLadder(JSON.parse(data)).then((result) => {
            if (result.length == 0)
            {
                //refresh data
                this.mainUserService.refresh().subscribe({
                    complete: () => 
                    {       
                        console.log(this.mainUserService.user)  
                        this.appState.stopLoading()
                        this.router.navigate(['main', 'ladder', form.value.name.replace(/\s/g, "")]);
                    },
                    error: (error) => 
                    { 
                        this.appState.stopLoading()
                        this.appState.openSnackBar("Operation successful but could not refresh date. Please try manual refresh", "Close")
                    },
                });
            }
            else
            {
                this.appState.openSnackBar(result, "close")
                this.appState.stopLoading()
            }
        })
    }

}
