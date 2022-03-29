import { Injectable } from "@angular/core";
import { Ladder } from "src/app/SDK/ladders/ladder.model";
import { LadderUser } from "src/app/SDK/users/ladder-user.model";
import { FindUserModalComponent } from "src/app/shared/find-user-modal/find-user-modal.component";
import { LadderModalComponent } from "./ladder-modal/ladder-modal.component";

@Injectable()
export class CurrentLadderService{

    public ladder: Ladder
    public loadedAdmins: Array<LadderUser>
    public loadedRequests: Array<LadderUser>
    public loadedInvites: Array<LadderUser>

    constructor(){
        this.loadedAdmins = new Array<LadderUser>()
        this.loadedRequests = new Array<LadderUser>()
        this.loadedInvites = new Array<LadderUser>()
    }

    openSettingModal(name: string, modalReference: LadderModalComponent, data: string)
    {
        console.log(modalReference)
        modalReference.openSettingChange(name, data)
    }

    openFindUserModal(operation: string, modalReference: FindUserModalComponent)
    {
        modalReference.openFindModal(operation)
    }

}