import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(public afAuth: AngularFireAuth,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(!this.afAuth.currentUser)
        if(!this.afAuth.currentUser)
        {
            return true
        }
        else
        {
            console.log('going home')
            this.router.navigate(['/home'])
        }
    }
}