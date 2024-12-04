import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { AuthUtils } from '../auth/auth.utils';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
        this.loadUserFromToken(); 
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    private loadUserFromToken(): void {
        const token = localStorage.getItem('accessToken'); // Substituído por 'accessToken'
        if (token && !AuthUtils.isTokenExpired(token)) {
            const decodedToken = AuthUtils._decodeToken(token);
            const user: User = {
                nameid: decodedToken.nameId || '',
                email: decodedToken.email || '',
                saller: decodedToken.role || '',
            };
            this._user.next(user);
        } else {
            console.warn('Token inválido ou expirado');
            this._user.next(null);
        }
    }
    
    

    /**
     * Observable for the user
     */
    get user$(): Observable<User | null> {
        return this._user.asObservable();
    }

    /**
     * Get the current logged-in user data (example from API)
     */
    get(): Observable<User> {
        this.loadUserFromToken();

        return this._user.asObservable( );
    }


    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
