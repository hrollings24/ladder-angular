import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { AccountHandlerService } from 'src/app/SDK/account/account-handler';
import { MainUserService } from 'src/app/SDK/users/main-user.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { LadderModalComponent } from '../ladder/ladder-modal/ladder-modal.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [ AccountHandlerService ]
})
export class AccountComponent implements OnInit {

    @ViewChild(LadderModalComponent, { read: LadderModalComponent }) 
    public modalReference: LadderModalComponent;
    
    public picture: any
    public username: string

    fb;
    downloadURL: Observable<string>;

    constructor(public mainUserService: MainUserService,
        private appState: AppStateService,
        private accountHandler: AccountHandlerService,
        private storage: AngularFireStorage
    ) { }

    ngOnInit(): void {
        this.picture = this.mainUserService.user.picture
        this.username = this.mainUserService.user.username
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
        var data = ""
        this.openModal("username", data)
    }

    actionPicture()
    {
        var data = ""

        this.openModal("picture", data)
    }
    
    pictureChanged(picture: any)
    {   
        this.picture = picture
        console.log(this.picture)
    }

    usernameChanged(newUsername: any)
    {
        this.appState.startLoading()
        this.accountHandler.CheckUsername(newUsername).then((result) => {
            if (result["result"])
            {
                this.username = newUsername
                this.appState.stopLoading()
            }
            else
            {
                this.appState.stopLoading()
                this.appState.openSnackBar("ERROR: Username already exists", "close")
            }
        })
    }

    saveChanges()
    {
        console.log("dsd")
        var n = Date.now();

        console.log(this.picture);

        const filePath = `profileimages/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`profileimages/${n}`, this.picture);
        task
        .snapshotChanges()
        .pipe(
            finalize(() => {
                this.downloadURL = fileRef.getDownloadURL();
                this.downloadURL.subscribe(url => {
                    if (url) {
                        this.fb = url;
                    }
                    console.log(this.fb);
                });
            })
        )
        .subscribe(url => {
            if (url) {
                console.log(url);
            }
        });
    }
}
