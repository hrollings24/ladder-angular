import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {

  @ViewChild('usernameForm')
  usernameForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

}
