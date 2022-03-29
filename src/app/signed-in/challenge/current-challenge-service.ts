import { Injectable } from "@angular/core";
import { Challenge } from "src/app/SDK/challenge/challenge.model";

@Injectable()
export class CurrentChallengeService{

    public challenge: Challenge
    
}