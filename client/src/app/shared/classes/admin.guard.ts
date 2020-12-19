import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
    
    constructor(private auth: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        if (this.auth.isAuthenticated()) {
            const token = this.auth.getToken()
            const tokenData = token.split('.')[1]
            const decodedJsonTokenData = window.atob(tokenData)
            const decodedTokenData = JSON.parse(decodedJsonTokenData)

            const userRole = decodedTokenData.role;
            if (userRole == 2) {
                return of(true)
            }
        } else {
            return of(false);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this.canActivate(route, state)
    }
}