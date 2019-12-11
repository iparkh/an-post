import {Injectable} from '@angular/core';
import {User, FbAuthResponse} from '../../../shared/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {tap, catchError} from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthService {

    public error$ : Subject<string> =new Subject<string>()

    constructor(private http:HttpClient)  {}
    
    get token():string{
        const expDate=new Date(localStorage.getItem('fb-token-exp'))

        if (new Date()> expDate){
            this.logout
            return null
        }
        return localStorage.getItem('fb-token')
    }

    login(user:User):Observable<any>{
        user.returnSecureToken=true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
                .pipe(
                    tap(this.setToken),
                    catchError(this.handleError.bind(this))

                )        
    }
    
    logout(){
        this.setToken(null)
    }

    isAutenticated():boolean{
        // console.log('isAutenticated()',!!this.token)
        return !!this.token
    }
    private handleError(error:HttpErrorResponse){
        const {message}=error.error.error

        // console.log(message)
        switch (message){
            case 'INVALID_EMAIL':
            this.error$.next('Не вірний email')
            break
            case 'EMAIL_NOT_FOUND':
            this.error$.next('Відсутній email')
            break
            case 'INVALID_PASSWORD':
            this.error$.next('Не вірний пароль')
            break
        }

        return throwError(error)
    }
    private setToken(response: FbAuthResponse | null){
        // console.log('setToken()')
      if (response) {
        const expDate = new Date(new Date().getTime() + + response.expiresIn*1000)
        localStorage.setItem('fb-token',response.idToken)
        localStorage.setItem('fb-token-exp',expDate.toString())
      } else {
          localStorage.clear()
      }

    }

}


