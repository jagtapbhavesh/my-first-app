import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";


export interface AuthResponseData {
    idtoken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}


    signup(email: string, password: string,) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyCO2REIvZbnCQBSsf-vW6eNQ1WqVUMSAYs',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCO2REIvZbnCQBSsf-vW6eNQ1WqVUMSAYs',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An Unknown Error has Occurred!!";
            if (!errorRes.error || !errorRes.error.error) {
               return throwError(errorMessage); 
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                   errorMessage = 'This email already exists'; 
                   break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email is does not exist';
                    break; 
                case 'INVALID_PASSWORD':
                    errorMessage = 'Incorrect Password';
                    break;

            }
            return throwError(errorMessage);
        }
}

