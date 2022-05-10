import { Component, Input } from "@angular/core";
import { FindUserModalComponent } from "src/app/shared/find-user-modal/find-user-modal.component";
import { CurrentLadderService } from "../../current-ladder.service";
import { LadderModalComponent } from "../../ladder-modal/ladder-modal.component";

@Component({
    template: ''
  })
export abstract class BaseTab{

    @Input()
    public modal: LadderModalComponent;

    @Input()
    public findUserModal: FindUserModalComponent;
  
    constructor(public currentLadderService: CurrentLadderService) { }

    actionSettingChange(setting: string)
    {
        console.log(setting)
        var data = ""

        //send data as json string
        if (setting == "delete")
        {
            data = JSON.stringify({"ladderID": this.currentLadderService.ladder.reference.id})
        }
        this.currentLadderService.openSettingModal(setting, this.modal, data)
    }

    openFindUserModal(operation: string)
    {
        this.currentLadderService.openFindUserModal(operation, this.findUserModal)
    }


}