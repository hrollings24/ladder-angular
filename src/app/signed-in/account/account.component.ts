import { Component, OnInit, ViewChild } from '@angular/core';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { LadderModalComponent } from '../ladder/ladder-modal/ladder-modal.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    @ViewChild(LadderModalComponent, { read: LadderModalComponent }) 
    public modalReference: LadderModalComponent;
    
    constructor(public mainUserService: MainUserService,
        private appState: AppStateService
    ) { }

    ngOnInit(): void {
    }

    refresh()
    {
        this.mainUserService.refresh().subscribe({
            complete: () => 
            { 
                this.appState.openSnackBar("Operation successful", "Close")
            },
            error: (error) => 
            { 
                this.appState.stopLoading()
                this.appState.openSnackBar("Operation successful but could not refresh ladder", "Close")
            },
        });
    }

    openModal(operation: string, data: string)
    {
        console.log(operation)
        this.modalReference.openAccountChange(operation, data)
    }

    actionUsername()
    {
        console.log("yo")
        var data = ""

        this.openModal("username", data)
    }
}
