import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  constructor() { }

  @ViewChild('permissionsForm')
  permissionsForm!: NgForm;

  permissions: string[] = [
    "Open",
    "Public, with Requests",
    "Invitation",
    "Invitation by Admins Only"
  ];
  
  ngOnInit(): void {
  }

}
