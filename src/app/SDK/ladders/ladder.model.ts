import { DocumentReference } from "@angular/fire/compat/firestore";
import { LadderUser } from "../users/ladder-user.model";

export class Ladder
{
    reference: DocumentReference
    name: string
    description: string
    jump: number
    permission: string
    requests: Array<string>
    adminIDs: Array<string>
    players: Array<LadderUser>
    myPosition: number
    url: string
    positions: Array<string>

    constructor(
        reference: DocumentReference,
        name: string,
        jump: number,
        description: string,
        permission: string,
        requests: Array<string>,
        adminIDs: Array<string>,
        positions: Array<string>,
        url: string
    )
    {
        this.reference = reference
        this.name = name
        this.jump = jump
        this.permission = permission
        this.requests = requests
        this.adminIDs = adminIDs
        this.positions = positions
        this.description = description
        this.url = url
        this.players = new Array<LadderUser>()
    }
}