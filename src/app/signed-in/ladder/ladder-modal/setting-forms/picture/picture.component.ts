import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

    @ViewChild('pictureForm')
    pictureForm!: NgForm;

    url: any;

    constructor() { }

    ngOnInit(): void {
    }

    selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			//this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			//this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			//this.msg = "";
			this.url = reader.result; 
		}
	}

}
