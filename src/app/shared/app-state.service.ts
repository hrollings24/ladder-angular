import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class AppStateService{
    
    loading$: Subject<boolean> = new Subject();

    constructor(private snackBar: MatSnackBar) { }

    startLoading() {
        this.loading$.next(true);
    }

    stopLoading() {
        this.loading$.next(false);
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action);
    }

}