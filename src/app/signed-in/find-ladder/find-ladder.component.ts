import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { throwError } from 'rxjs';
import { Ladder } from 'src/app/SDK/ladders/ladder.model';
import { LadderService } from 'src/app/SDK/ladders/ladder.service';

@Component({
    selector: 'app-find-ladder',
    templateUrl: './find-ladder.component.html',
    styleUrls: ['./find-ladder.component.css']
})
export class FindLadderComponent implements OnInit {

    constructor(private afs: AngularFirestore,
        private ladderService: LadderService) {
            this.foundLadders = new Array<Ladder>()

         }

    searchForLadderName: string = '';

    public foundLadders: Array<Ladder>
    public noLaddersFound: boolean


    ngOnInit(): void {
        this.noLaddersFound = false
    }

    onSubmit()
    {
        this.findLadders()
    }

    findLadders()
    {
        console.log("finding ladders")
        var ladders = this.afs.collection('ladders', ref => ref.where('name', '==', this.searchForLadderName.toLowerCase()).where('permission', 'in', ["Open", "Public, with Requests"]))
        ladders.get().subscribe(resultData => {
            resultData.forEach(element => {
                this.noLaddersFound = false
                const userRef: DocumentReference<any> = this.afs.doc(`ladders/${element.id}`).ref

                this.ladderService.GetLadderByReference(userRef)
                .then((ladder) => {
                    try{
                        //come up with a display card for this user and add to view
                        this.foundLadders.push(ladder)
                        console.log(this.foundLadders)
                    }
                    catch{
                        throwError(() => new Error('Challenge data is invalid'))
                    }  
                })
                .catch((error) => { 
                    throwError(() => new Error(error))
                })
            });
            if (resultData.empty)
            {
                this.noLaddersFound = true
            }

            this.foundLadders = []
        })
    }
    

}
