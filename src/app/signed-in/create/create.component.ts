import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    permissions: string[] = [
        "Open",
        "Public, with Requests",
        "Invitation",
        "Invitation by Admins Only"
    ];

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
    }

    createLadder()
    {

    }

}
